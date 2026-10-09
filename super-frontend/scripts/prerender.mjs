import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { render } from '../dist-ssr/entry-server.js'
import { PAGES, SITE_URL } from '../src/data/pages.js'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const template = await readFile(join(dist, 'index.html'), 'utf8')
const rootMarker = '<div id="root"></div>'
if (!template.includes(rootMarker) || !template.includes('</head>')) {
  throw new Error('The HTML template must contain </head> and an empty #root.')
}

async function writePage(pathname, filename) {
  const rendered = await render(pathname)
  const rootStart = rendered.indexOf('<div id="root">')
  if (rootStart < 0) throw new Error(`Missing rendered root for ${pathname}`)

  // React hoists metadata and image preloads before #root. Keep them in <head>.
  const head = rendered.slice(0, rootStart)
  const body = rendered.slice(rootStart)
  const html = template
    .replace('</head>', () => `${head}\n  </head>`)
    .replace(rootMarker, () => body)
  const target = join(dist, filename)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, html)
}

for (const page of PAGES) {
  const filename = page.path === '/' ? 'index.html' : `${page.path.slice(1)}index.html`
  await writePage(page.path, filename)
}
await writePage('/__not-found/', '404.html')

// Derive the sitemap from the same route registry as metadata and static HTML.
const urls = PAGES.filter((page) => page.indexable)
  .map((page) => `  <url><loc>${SITE_URL}${page.path}</loc></url>`)
  .join('\n')
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
console.log(`Generated readable HTML for ${PAGES.length} routes and a 404 page.`)
