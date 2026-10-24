import { SITE, SITE_URL } from './site.js'

export function structuredDataForPage(page, email) {
  // Only finished, indexable pages publish structured data.
  if (!page?.indexable) return null

  const organizationId = `${SITE_URL}/#organization`
  const websiteId = `${SITE_URL}/#website`
  const pageUrl = `${SITE_URL}${page.path}`
  const articleId = `${pageUrl}#article`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: SITE.name,
        url: `${SITE_URL}/`,
        description: SITE.description,
        logo: `${SITE_URL}${SITE.logoPath}`,
        email,
        sameAs: SITE.socialProfiles,
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: SITE.name,
        url: `${SITE_URL}/`,
        inLanguage: 'en',
        publisher: { '@id': organizationId },
      },
      {
        '@type': page.path === '/blog/' ? 'CollectionPage' : 'WebPage',
        '@id': `${pageUrl}#webpage`,
        name: page.title,
        description: page.description,
        dateModified: page.dateModified,
        url: pageUrl,
        inLanguage: 'en',
        ...(page.article ? { mainEntity: { '@id': articleId } } : {}),
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
      },
      ...(page.article ? [{
        '@type': 'BlogPosting',
        '@id': articleId,
        headline: page.article.title,
        description: page.description,
        url: pageUrl,
        image: `${SITE_URL}${page.article.shareImage.path}`,
        datePublished: page.datePublished,
        dateModified: page.dateModified,
        inLanguage: 'en',
        articleSection: page.article.category,
        author: { '@type': 'Person', name: page.article.author },
        publisher: { '@id': organizationId },
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
      }] : []),
    ],
  }
}

export function serializeStructuredData(data) {
  // Keep text containing HTML from terminating the inline JSON-LD script.
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
