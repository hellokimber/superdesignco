import { PROJECTS } from './projects.js'
import { ARTICLES } from './articles.js'

export { SITE_URL } from './site.js'

// Only finished pages belong in the sitemap. Keep draft routes available for review.
export const PAGES = [
  {
    path: '/',
    title: 'Startup Branding | The Super Design Company',
    description:
      'Branding for pre-launch and early-stage startups. Explore brand kits, logos, typography, imagery, and voice guidance from The Super Design Company.',
    indexable: true,
    // Update only when the homepage content changes, not for routine builds.
    dateModified: '2026-10-21',
  },
  {
    path: '/work/',
    title: 'Work | The Super Design Company',
    description: 'Project previews from The Super Design Company. Full case studies are in preparation.',
    indexable: false,
  },
  {
    path: '/explorations/',
    title: 'AI Explorations | The Super Design Company',
    description: 'AI explorations from The Super Design Company. This gallery is in preparation.',
    indexable: false,
  },
  {
    path: '/blog/',
    title: 'Blog | The Super Design Company',
    description: 'Practical branding articles for startup founders. Compare brand kits, agencies, studios, and AI tools, and learn how to explain and use your brand.',
    indexable: true,
    dateModified: '2026-10-24',
  },
  ...ARTICLES.map((article) => ({
    path: article.path,
    title: `${article.title} | The Super Design Company`,
    description: article.description,
    indexable: true,
    dateModified: article.dateModified,
    datePublished: article.datePublished,
    article,
    shareImage: article.shareImage,
  })),
  ...PROJECTS.map(({ slug, title }) => ({
    path: `/work/${slug}/`,
    title: `${title} | The Super Design Company`,
    description: `${title} at The Super Design Company. This case study is in preparation.`,
    indexable: false,
  })),
]

export function pageForPath(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  return PAGES.find((page) => (page.path.replace(/\/+$/, '') || '/') === normalized)
}
