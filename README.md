# ContentAIHub frontend

React + TypeScript, built with Create React App and deployed to Apache.

## Folder structure

- `src/App.tsx`: page routes and compatibility aliases.
- `src/pages/`: page components.
- `src/components/`: shared UI and canonical URL updates during navigation.
- `src/auth/`: session handling and protected routes.
- `src/config/`: API, company, and canonical site configuration.
- `src/data/`: course and live class content.
- `public/`: static files, robots.txt, and Apache `.htaccess`.
- `scripts/`: production canonical HTML/sitemap generation and validation.
- `build/`: generated deployment files (ignored by Git).

## Development and validation

```sh
npm install
npm start
npm test -- --watchAll=false --runInBand
npm run build
npm run verify:seo
```

On Windows PowerShell, use `npm.cmd` if the system `npm.ps1` wrapper fails.

## Canonical URLs and deployment

Page URLs use HTTPS, the non-www host, and a trailing slash, for example
`https://contentaihub.net/pricing/`. API endpoints, signed asset URLs, and static
files retain their path formats.

`src/config/site.json` lists page paths and public sitemap entries. The postbuild
script generates a separate `index.html` with the correct canonical for each
page, plus `sitemap.xml` and `404.html`. Account, checkout, logout, and protected
library pages are excluded from the sitemap. The React canonical component
updates the canonical on client navigation and omits query strings and fragments.

Upload the **entire contents of `build/`**, including hidden `.htaccess`, page
folders, and `404.html`, to the Apache document root. Keep the existing backend
application in place. Do not deploy just the homepage and static assets.

Apache must permit these `.htaccess` directives and load `mod_rewrite`. The rules
permanently redirect HTTP, www, repeated slashes, slashless page URLs, explicit
page index files, and legacy aliases. Unknown paths retain HTTP 404 responses.
The rewrite syntax follows the [Apache mod_rewrite documentation](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html).

If a proxy/CDN terminates TLS, configure the origin's HTTPS detection with the
hosting provider before enabling redirects; these rules use Apache's HTTPS
variable. Both domain names must resolve to the host and have valid certificates
so HTTPS requests to www can reach the redirect.

After deploying, check response headers without following redirects:

```sh
curl -I http://contentaihub.net/
curl -I https://www.contentaihub.net/pricing
curl --path-as-is -I https://www.contentaihub.net//
curl -I https://contentaihub.net/pricing
curl -I https://contentaihub.net/pricing/
```

The first four must return 301 with canonical Location destinations; the final
URL must return 200. Also check the page source canonical, `/sitemap.xml`, a static
asset, backend endpoints, and an unknown URL returning 404.
