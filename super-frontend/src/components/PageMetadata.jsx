import { useLocation } from 'react-router-dom'
import { pageForPath, SITE_URL } from '../data/pages.js'

export default function PageMetadata() {
  const { pathname } = useLocation()
  const page = pageForPath(pathname)

  // React 19 places these elements in <head> during rendering and hydration.
  return (
    <>
      <title>{page?.title ?? 'Page Not Found | The Super Design Company'}</title>
      <meta
        name="description"
        content={page?.description ?? 'The requested page could not be found.'}
      />
      <meta name="robots" content={page?.indexable ? 'index, follow' : 'noindex, follow'} />
      {page && <link rel="canonical" href={`${SITE_URL}${page.path}`} />}
    </>
  )
}
