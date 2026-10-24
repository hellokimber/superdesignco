import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { PAGES, SITE_URL } from '../src/data/pages.js'
import { SITE } from '../src/data/site.js'
import { serializeStructuredData } from '../src/data/structuredData.js'
import { BRAND_KIT_FAQ } from '../src/data/brandKitFaq.js'
import { ARTICLES } from '../src/data/articles.js'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const escapeHtml = (text) => text.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
})[character])


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

    const levels = [...body.matchAll(/<h([1-6])(?:\s|>)/g)].map((match) => Number(match[1]))
    assert.equal(levels[0], 1, 'the content outline starts with H1')
    for (let i = 1; i < levels.length; i++) {
      assert.ok(levels[i] <= levels[i - 1] + 1, 'heading hierarchy does not skip levels')
    }
    const og = [...head.matchAll(/<meta property="(og:[^"]+)" content="([^"]*)"/g)]
    assert.equal(new Set(og.map((match) => match[1])).size, og.length, 'Open Graph properties are unique')
    const properties = Object.fromEntries(og.map((match) => [match[1], match[2]]))
    assert.equal(properties['og:title'], page.title)
    assert.equal(properties['og:description'], page.description)
    assert.equal(properties['og:url'], `${SITE_URL}${page.path}`)
    assert.equal(properties['og:type'], page.article ? 'article' : 'website')
    const shareImage = page.shareImage ?? SITE.shareImage
    assert.equal(properties['og:image'], `${SITE_URL}${shareImage.path}`)
    await access(join(dist, shareImage.path.slice(1)))
    assert.equal(properties['og:image:type'], shareImage.mimeType ?? 'image/png')
    assert.equal(properties['og:image:width'], String(shareImage.width))
    assert.equal(properties['og:image:height'], String(shareImage.height))
    assert.ok(properties['og:image:alt'])


    // SSR and client builds must agree on asset hashes and production URLs.
    for (const [, url] of html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) {
      await access(join(dist, url.slice(1)))
    }
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    if (page.path === '/') {
      const h1 = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g, '').trim()
      assert.equal(h1, 'Branding for pre-launch and early-stage startups.')
      assert.ok(body.includes('<h2 id="selected-works-heading"'))
      assert.equal(schemas.length, 1, 'one homepage JSON-LD graph')
      const schema = JSON.parse(schemas[0][1])
      assert.equal(schema['@context'], 'https://schema.org')
      const organization = schema['@graph'].find((node) => node['@type'] === 'Organization')
      const website = schema['@graph'].find((node) => node['@type'] === 'WebSite')
      const webpage = schema['@graph'].find((node) => node['@type'] === 'WebPage')
      assert.equal(organization.name, SITE.name)
      assert.equal(organization.url, `${SITE_URL}/`)
      assert.ok(body.includes(`mailto:${organization.email}?`), 'schema email matches visible contact links')
      assert.ok(body.includes('independent brand studio'))
      for (const profile of organization.sameAs) assert.ok(body.includes(profile))
      await access(join(dist, new URL(organization.logo).pathname.slice(1)))
      assert.equal(website.publisher['@id'], organization['@id'])
      assert.equal(webpage.isPartOf['@id'], website['@id'])
      assert.equal(webpage.about['@id'], organization['@id'])
      assert.equal(webpage.url, properties['og:url'])
      assert.equal(webpage.dateModified, page.dateModified)
      assert.match(page.dateModified, /^\d{4}-\d{2}-\d{2}$/)
      assert.equal(new Date(`${page.dateModified}T00:00:00Z`).toISOString().slice(0, 10), page.dateModified)
      assert.ok(body.includes(`<time dateTime="${page.dateModified}">`))
      const faq = body.match(/<section id="brand-kit-faq"[^>]*>([\s\S]*?)<\/section>/)?.[1]
      assert.ok(faq, 'FAQ content is present in the initial HTML')
      assert.equal((faq.match(/<h3(?:\s|>)/g) ?? []).length, BRAND_KIT_FAQ.length)
      for (const item of BRAND_KIT_FAQ) {
        assert.ok(item.question.endsWith('?'), 'FAQ headings are questions')
        assert.ok(faq.includes(escapeHtml(item.question)))
        for (const paragraph of item.answer.split(/\n\s*\n/)) {
          assert.ok(faq.includes(escapeHtml(paragraph)), 'complete FAQ answer paragraphs are available in HTML without JavaScript')
        }
      }
      const contextualLinks = [...faq.matchAll(/<a href="(#[^"]+)"/g)]
      assert.ok(contextualLinks.length >= 3, 'FAQ includes contextual section links')
      for (const [, href] of contextualLinks) {
        const targetId = href.slice(1)
        assert.equal(body.split(`id="${targetId}"`).length - 1, 1, 'each section link has exactly one destination')
      }
      for (const text of ['Stand out.', 'Branding for pre-launch', 'Base brand kit', 'Full brand kit', '1k USD', '5k USD']) {
        assert.ok(body.includes(text), `homepage contains ${text}`)
      }
    } else if (page.indexable) {
      assert.equal(schemas.length, 1, 'finished blog pages have one JSON-LD graph')
      const graph = JSON.parse(schemas[0][1])['@graph']
      const webpage = graph.find((node) => ['WebPage', 'CollectionPage'].includes(node['@type']))
      assert.equal(webpage.url, `${SITE_URL}${page.path}`)
      assert.equal(webpage.dateModified, page.dateModified)
      assert.ok(body.includes('href="/blog/"'))
      if (page.article) {
        const article = graph.find((node) => node['@type'] === 'BlogPosting')
        assert.equal(article.headline, page.article.title)
        assert.equal(article.author.name, page.article.author)
        assert.equal(article.datePublished, page.datePublished)
        assert.equal(article.dateModified, page.dateModified)
        assert.equal(article.mainEntityOfPage['@id'], webpage['@id'])
        for (const paragraph of page.article.introduction) assert.ok(body.includes(escapeHtml(paragraph)))
        let expectedTables = 0
        for (const section of page.article.sections) {
          assert.ok(body.includes(`id="${section.id}"`))
          for (const block of section.blocks) {
            if (block.type === 'paragraph') {
              assert.ok(body.includes(escapeHtml(block.text)), 'complete article prose is present without JavaScript')
            } else if (block.type === 'table') {
              expectedTables += 1
              for (const header of block.headers) assert.ok(body.includes(`<th scope="col">${escapeHtml(header)}</th>`))
              for (const row of block.rows) {
                assert.ok(body.includes(`<th scope="row">${escapeHtml(row[0])}</th>`))
                for (const cell of row.slice(1)) assert.ok(body.includes(`<td>${escapeHtml(cell)}</td>`))
              }
            }
          }
        }
        assert.equal((body.match(/<table(?:\s|>)/g) ?? []).length, expectedTables)
        assert.equal((body.match(/<caption(?:\s|>)/g) ?? []).length, expectedTables)
        assert.equal((body.match(/<h2(?:\s|>)/g) ?? []).length, page.article.sections.length)
        for (const fragment of ['ai-gallery-heading', 'services-heading']) assert.ok(body.includes(`href="/#${fragment}"`))
      }
    } else {
      assert.equal(schemas.length, 0, 'drafts do not publish unsupported structured data')
    }
  })
}

test('404 HTML has useful content, no canonical, and noindex', async () => {
  const html = await readFile(join(dist, '404.html'), 'utf8')
  assert.ok(html.includes('Page not found'))
  assert.ok(html.includes('content="noindex, follow"'))
  assert.ok(!html.includes('rel="canonical"'))
  assert.ok(!html.includes('property="og:url"'))
  assert.ok(!html.includes('application/ld+json'))
  assert.ok(!html.includes('BlogPosting'))
  const redirects = await readFile(join(dist, '_redirects'), 'utf8')
  assert.ok(redirects.includes('/*    /404.html   404'))
})

test('sitemap includes finished pages only', async () => {
  const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8')
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  const indexablePages = PAGES.filter((page) => page.indexable)
  assert.deepEqual(urls, indexablePages.map((page) => `${SITE_URL}${page.path}`))
  const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)]
  for (const [index, entry] of entries.entries()) {
    const dateModified = indexablePages[index].dateModified
    if (dateModified) assert.ok(entry[1].includes(`<lastmod>${dateModified}</lastmod>`))
    else assert.ok(!entry[1].includes('<lastmod>'), 'no invented dates for undated pages')
  }
})


test('sharing image is a real PNG with matching dimensions', async () => {
  const png = await readFile(join(dist, SITE.shareImage.path.slice(1)))
  assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a')
  assert.equal(png.subarray(12, 16).toString('ascii'), 'IHDR')
  assert.equal(png.readUInt32BE(16), SITE.shareImage.width)
  assert.equal(png.readUInt32BE(20), SITE.shareImage.height)
})

test('JSON-LD serialization cannot close its script element', () => {
  const data = { description: '</script><script>alert("test")</script>' }
  const json = serializeStructuredData(data)
  assert.ok(!json.includes('<'))
  assert.deepEqual(JSON.parse(json), data)
})


test('blog lists exactly the five selected articles', async () => {
  assert.equal(ARTICLES.length, 5)
  assert.equal(new Set(ARTICLES.map((article) => article.slug)).size, 5)
  const html = await readFile(join(dist, 'blog/index.html'), 'utf8')
  assert.equal((html.match(/<article(?:\s|>)/g) ?? []).length, 5)
  for (const article of ARTICLES) {
    assert.ok(html.includes(`href="${article.path}"`))
    assert.ok(html.includes(escapeHtml(article.title)))
  }
  for (const excluded of ['Invest in branding when you can name the job it must do', 'Art direction before image generation']) {
    assert.ok(!html.includes(excluded), 'excluded articles are absent from the index')
  }
  const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8')
  assert.ok(!sitemap.includes('/art-direction-before-image-generation/'))
  const redirects = await readFile(join(dist, '_redirects'), 'utf8')
  assert.match(redirects, /art-direction-before-image-generation\/\s+\/blog\/choose-ai-brand-imagery\/\s+301/)
})
