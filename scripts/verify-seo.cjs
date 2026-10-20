const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const site = require('../src/config/site.json');
const metadata = require('../src/config/seo.json');
const structuredData = require('../src/config/structured-data.json');
const headings = require('../src/config/headings.json');
const buildDir = path.resolve(__dirname, '../build');
const escapeHtml = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const socialImage = `${site.origin}/logo.webp`;

for (const pagePath of site.pagePaths) {
  const html = fs.readFileSync(path.join(buildDir, pagePath.slice(1), 'index.html'), 'utf8');
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, pagePath);
  assert.ok(html.includes(`href="${site.origin}${pagePath}"`), pagePath);
  assert.ok(html.includes(`property="og:image" content="${socialImage}"`), pagePath);
  assert.ok(html.includes(`name="twitter:image" content="${socialImage}"`), pagePath);
}
const sitemap = fs.readFileSync(path.join(buildDir, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.deepEqual(urls, site.sitemapPaths.map(pagePath => `${site.origin}${pagePath}`));
assert.ok(site.sitemapPaths.every(pagePath => site.pagePaths.includes(pagePath)));
assert.ok(!fs.readFileSync(path.join(buildDir, '404.html'), 'utf8').includes('rel="canonical"'));
assert.ok(fs.readFileSync(path.join(buildDir, '404.html'), 'utf8').includes('name="robots" content="noindex"'));
assert.ok(fs.readFileSync(path.join(buildDir, 'robots.txt'), 'utf8').includes(`Sitemap: ${site.origin}/sitemap.xml`));
assert.equal(fs.readFileSync(path.join(buildDir, '.htaccess'), 'utf8'), fs.readFileSync(path.resolve(__dirname, '../public/.htaccess'), 'utf8'));
const htaccess = fs.readFileSync(path.resolve(__dirname, '../public/.htaccess'), 'utf8');
assert.ok(htaccess.includes('contentaihub_access=1'), 'missing library access-cookie redirect');
assert.ok(htaccess.indexOf('contentaihub_access=1') < htaccess.indexOf('Let Apache serve real files'), 'library redirect must run before static files');
for (const header of ['Strict-Transport-Security', 'Content-Security-Policy', 'X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy', 'X-Frame-Options']) {
  assert.ok(htaccess.includes(`Header always set ${header}`), `missing security header: ${header}`);
}
for (const [pagePath, page] of Object.entries(metadata)) {
  const html = fs.readFileSync(path.join(buildDir, pagePath.slice(1), 'index.html'), 'utf8');
  assert.ok(html.includes(`<title>${escapeHtml(page.title)}</title>`), pagePath);
  assert.ok(html.includes(`name="description" content="${escapeHtml(page.description)}"`), pagePath);
  assert.ok(html.includes('property="og:title"'), pagePath);
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'), pagePath);
  assert.ok(html.includes('type="application/ld+json"'), pagePath);
  if (page.robots) assert.ok(html.includes(`name="robots" content="${page.robots}"`), `${pagePath}: robots directive missing`);
}
for (const pagePath of Object.keys(structuredData.pages)) {
  const html = fs.readFileSync(path.join(buildDir, pagePath.slice(1), 'index.html'), 'utf8');
  assert.ok(html.includes('"@type":"WebPage"'), `page schema missing: ${pagePath}`);
  assert.ok(html.includes('"publisher":{"@type":"Organization"'), `nested organization missing: ${pagePath}`);
  assert.equal((html.match(/type="application\/ld\+json"/g) || []).length, 1, `expected one schema item: ${pagePath}`);
  assert.equal((html.match(/data-content-aihub-schema="true"/g) || []).length, 1, `expected one reusable schema node: ${pagePath}`);
}
const pricingHtml = fs.readFileSync(path.join(buildDir, 'pricing/index.html'), 'utf8');
assert.ok(pricingHtml.includes('"mainEntity":{"@type":"OfferCatalog"'), 'pricing offer catalog must be nested in WebPage');
assert.ok(pricingHtml.includes('"breadcrumb":{"@type":"BreadcrumbList"'), 'pricing breadcrumb must be nested in WebPage');
for (const image of ['basic.webp', 'classic.webp', 'premium.webp']) {
  assert.ok(pricingHtml.includes(`"image":"${site.origin}/${image}"`), `pricing plan image missing: ${image}`);
}
for (const [pagePath, outline] of Object.entries(headings)) {
  const html = fs.readFileSync(path.join(buildDir, pagePath.slice(1), 'index.html'), 'utf8');
  for (const level of ['h1', 'h2', 'h3']) {
    for (const heading of outline[level] || []) {
      assert.ok(html.includes(`<${level}>${escapeHtml(heading)}</${level}>`), `${pagePath}: ${heading}`);
    }
  }
}
console.log(`Verified ${site.pagePaths.length} page canonicals plus metadata for ${Object.keys(metadata).length} public pages.`);
