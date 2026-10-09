# The Super Design Company frontend

React 19, React Router, and Vite. Production is hosted on Netlify.

## Development

From the repository root, run `npm run dev`. Development uses client rendering.

## Production build

From the repository root, run `npm run build`. The build:

1. Builds browser JavaScript, styles, and assets into `super-frontend/dist`.
2. Builds a temporary renderer into `super-frontend/dist-ssr`.
3. Renders the existing React pages to complete HTML, including metadata.
4. Generates a sitemap containing finished pages only.
5. Runs HTML checks. A failure stops the build.

Only `dist` is deployed. React hydrates its HTML to attach interactions. The gallery starts from the same markup in the browser and build renderer, then adjusts to the viewport.

## Page metadata and indexing

`src/data/pages.js` defines known paths, titles, descriptions, and indexing status. `PageMetadata` uses those definitions for the initial HTML and browser navigation. Canonicals point to `https://superdesigncompany.com`, use trailing slashes, and omit tracking parameters and fragments.

The homepage is indexable. Work, project, and exploration routes remain available with `noindex, follow` until their placeholder content is replaced. After finishing a page, update its metadata and set `indexable: true` to include it in the generated sitemap. Register new routes in both `App.jsx` and `pages.js`.

Unknown URLs use the generated `404.html`. `public/_redirects` configures Netlify to return HTTP 404 while existing static files take precedence. Error pages have no canonical URL.

## Verification

After a build, rerun HTML checks with `npm run test:html` from this directory. Run `npm run lint` from the repository root for source checks.

Verify a Netlify preview before merging changes to routing. Local Vite preview does not emulate Netlify redirect rules.
