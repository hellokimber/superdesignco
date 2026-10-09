import { SITE, SITE_URL } from './site.js'

export function structuredDataForPage(page, email) {
  // The other routes are drafts, so only describe the published homepage.
  if (page?.path !== '/') return null

  const organizationId = `${SITE_URL}/#organization`
  const websiteId = `${SITE_URL}/#website`
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
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        name: page.title,
        description: page.description,
        url: `${SITE_URL}/`,
        inLanguage: 'en',
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
      },
    ],
  }
}

export function serializeStructuredData(data) {
  // Keep text containing HTML from terminating the inline JSON-LD script.
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
