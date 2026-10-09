import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { PAGES, SITE_URL } from '../src/data/pages.js'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))

for (const page of PAGES) {
  test(`published HTML: ${page.path}`, async () => {
    const filename = page.path === '/' ? 'index.html' : `${page.path.slice(1)}index.html`
    const html = await readFile(join(dist, filename), 'utf8')
    const head = html.slice(html.indexOf('<head>'), html.indexOf('</head>'))
    const body = html.slice(html.indexOf('<body>'), html.indexOf('</body>'))
    const canonicals = [...head.matchAll(/<link rel="canonical" href="([^"]+)"/g)]

    assert.equal(canonicals.length, 1, 'exactly one canonical in the initial head')
    assert.equal(canonicals[0][1], `${SITE_URL}${page.path}`)
    assert.ok(head.includes(`<title>${page.title}</title>`))
    assert.ok(head.includes(`content="${page.indexable ? 'index, follow' : 'noindex, follow'}"`))
    assert.equal((head.match(/name="description"/g) ?? []).length, 1)
    assert.equal((body.match(/<h1(?:\s|>)/g) ?? []).length, 1)
    assert.ok(body.includes('<main'), 'actual page content is present without JavaScript')
    assert.ok(!body.includes('Loading…'), 'no lazy-loading fallback is published')
    assert.ok(!body.includes('<!--$?-->'), 'no pending Suspense boundary is published')
    assert.ok(!body.includes('<div hidden id="S:'), 'content is visible without streaming scripts')
    assert.ok(!body.includes('<div id="root"></div>'))

    // SSR and client builds must agree on asset hashes and production URLs.
    for (const [, url] of html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) {
      await access(join(dist, url.slice(1)))
    }
    if (page.path === '/') {
      for (const text of ['Stand out.', 'Branding for pre-launch', 'Base brand kit', 'Full brand kit', '1k USD', '5k USD']) {
        assert.ok(body.includes(text), `homepage contains ${text}`)
      }
    }
  })
}

test('404 HTML has useful content, no canonical, and noindex', async () => {
  const html = await readFile(join(dist, '404.html'), 'utf8')
  assert.ok(html.includes('Page not found'))
  assert.ok(html.includes('content="noindex, follow"'))
  assert.ok(!html.includes('rel="canonical"'))
  const redirects = await readFile(join(dist, '_redirects'), 'utf8')
  assert.ok(redirects.includes('/*    /404.html   404'))
})

test('sitemap includes finished pages only', async () => {
  const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8')
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  assert.deepEqual(urls, PAGES.filter((page) => page.indexable).map((page) => `${SITE_URL}${page.path}`))
})
