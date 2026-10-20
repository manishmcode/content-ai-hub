const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const site = require('../src/config/site.json');
const buildDir = path.resolve(__dirname, '../build');

for (const pagePath of site.pagePaths) {
  const html = fs.readFileSync(path.join(buildDir, pagePath.slice(1), 'index.html'), 'utf8');
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, pagePath);
  assert.ok(html.includes(`href="${site.origin}${pagePath}"`), pagePath);
}
const sitemap = fs.readFileSync(path.join(buildDir, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.deepEqual(urls, site.sitemapPaths.map(pagePath => `${site.origin}${pagePath}`));
assert.ok(site.sitemapPaths.every(pagePath => site.pagePaths.includes(pagePath)));
assert.ok(!fs.readFileSync(path.join(buildDir, '404.html'), 'utf8').includes('rel="canonical"'));
assert.ok(fs.readFileSync(path.join(buildDir, 'robots.txt'), 'utf8').includes(`Sitemap: ${site.origin}/sitemap.xml`));
assert.equal(fs.readFileSync(path.join(buildDir, '.htaccess'), 'utf8'), fs.readFileSync(path.resolve(__dirname, '../public/.htaccess'), 'utf8'));
console.log(`Verified ${site.pagePaths.length} page canonicals, sitemap, robots.txt, 404 HTML, and deployed Apache configuration.`);
