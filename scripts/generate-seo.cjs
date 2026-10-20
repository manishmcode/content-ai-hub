const fs = require('node:fs');
const path = require('node:path');
const site = require('../src/config/site.json');
const metadata = require('../src/config/seo.json');
const structuredData = require('../src/config/structured-data.json');
const headings = require('../src/config/headings.json');

// Emit a separate HTML entry for each page so its canonical is present even
// before JavaScript runs. Apache's DirectoryIndex serves these route folders.
const buildDir = path.resolve(__dirname, '../build');
const template = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');
const imageUrl = `${site.origin}/logo.webp`;
const jsonLdTag = schema => `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
const headingHtml = pagePath => {
  const outline = headings[pagePath];
  if (!outline) return '';
  return `<main data-prerendered-outline="true">${['h1', 'h2', 'h3']
    .flatMap(level => (outline[level] || []).map(text => `<${level}>${escapeHtml(text)}</${level}>`))
    .join('')}</main>`;
};

const escapeHtml = value => String(value)
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const renderPage = (pagePath, page = metadata[pagePath], includeCanonical = true, includeSchema = true) => {
  const title = page?.title || 'Content AI Hub';
  const description = page?.description || 'Content AI Hub';
  const socialDescription = page?.ogDescription || description;
  const imageAlt = page?.imageAlt || 'Content AI Hub';
  const canonical = `${site.origin}${pagePath}`;
  const schemas = includeSchema ? [structuredData.pages[pagePath]].filter(Boolean) : [];
  const tags = [
    includeCanonical && `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(socialDescription)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Content AI Hub" />',
    `<meta property="og:image" content="${imageUrl}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(socialDescription)}" />`,
    `<meta name="twitter:image" content="${imageUrl}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />`,
    ...schemas.map(jsonLdTag)
  ].filter(Boolean).join('\n    ');

  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace('<div id="root"></div>', `<div id="root">${headingHtml(pagePath)}</div>`)
    .replace('</head>', `    ${tags}\n  </head>`);
};

// Missing URLs must not advertise the homepage as their canonical.
fs.writeFileSync(path.join(buildDir, '404.html'), renderPage('/', {
  title: 'Page Not Found | Content AI Hub',
  description: 'The requested page could not be found.',
  imageAlt: 'Content AI Hub'
}, false, false).replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>'));
for (const pagePath of site.pagePaths) {
  const directory = path.join(buildDir, pagePath.slice(1));
  fs.mkdirSync(directory, { recursive: true });
  const html = renderPage(pagePath);
  fs.writeFileSync(path.join(directory, 'index.html'), html);
}

fs.writeFileSync(path.join(buildDir, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  site.sitemapPaths.map(pagePath => `  <url><loc>${site.origin}${pagePath}</loc></url>`).join('\n') +
  '\n</urlset>\n');
