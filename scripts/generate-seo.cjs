const fs = require('node:fs');
const path = require('node:path');
const site = require('../src/config/site.json');

// Emit a separate HTML entry for each page so its canonical is present even
// before JavaScript runs. Apache's DirectoryIndex serves these route folders.
const buildDir = path.resolve(__dirname, '../build');
const template = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');
// Missing URLs must not advertise the homepage as their canonical.
fs.writeFileSync(path.join(buildDir, '404.html'), template);
for (const pagePath of site.pagePaths) {
  const directory = path.join(buildDir, pagePath.slice(1));
  fs.mkdirSync(directory, { recursive: true });
  const html = template.replace('</head>', `<link rel="canonical" href="${site.origin}${pagePath}" /></head>`);
  fs.writeFileSync(path.join(directory, 'index.html'), html);
}

fs.writeFileSync(path.join(buildDir, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  site.sitemapPaths.map(pagePath => `  <url><loc>${site.origin}${pagePath}</loc></url>`).join('\n') +
  '\n</urlset>\n');
