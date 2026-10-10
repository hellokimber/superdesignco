import { useLocation } from 'react-router-dom'
import { pageForPath, SITE_URL } from '../data/pages.js'
import { SITE } from '../data/site.js'
import { structuredDataForPage, serializeStructuredData } from '../data/structuredData.js'

export default function PageMetadata() {
  const { pathname } = useLocation()
  const page = pageForPath(pathname)
  const shareImage = page?.shareImage ?? SITE.shareImage
  const email = import.meta.env.VITE_CONTACT_EMAIL?.trim() || 'hello@superdesigncompany.com'
  const structuredData = structuredDataForPage(page, email)

  // React 19 places title, meta, and link elements in <head> during rendering.
  return (
    <>
      <title>{page?.title ?? 'Page Not Found | The Super Design Company'}</title>
      <meta
        name="description"
        content={page?.description ?? 'The requested page could not be found.'}
      />
      <meta name="robots" content={page?.indexable ? 'index, follow' : 'noindex, follow'} />
      {page && (
        <>
          <link rel="canonical" href={`${SITE_URL}${page.path}`} />
          <meta property="og:type" content={page.article ? 'article' : 'website'} />
          {page.article && (
            <>
              <meta property="article:published_time" content={page.datePublished} />
              <meta property="article:modified_time" content={page.dateModified} />
            </>
          )}
          <meta property="og:site_name" content={SITE.name} />
          <meta property="og:title" content={page.title} />
          <meta property="og:description" content={page.description} />
          <meta property="og:url" content={`${SITE_URL}${page.path}`} />
          <meta property="og:image" content={`${SITE_URL}${shareImage.path}`} />
          <meta property="og:image:type" content={shareImage.mimeType ?? 'image/png'} />
          <meta property="og:image:width" content={String(shareImage.width)} />
          <meta property="og:image:height" content={String(shareImage.height)} />
          <meta property="og:image:alt" content={shareImage.alt} />
        </>
      )}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }}
        />
      )}
    </>
  )
}
