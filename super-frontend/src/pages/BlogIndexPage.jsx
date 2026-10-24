import { ARTICLES, formatArticleDate } from '../data/articles.js'
import BlogImage from '../components/BlogImage.jsx'

export default function BlogIndexPage() {
  return (
    <div className="blog-shell">
      <div className="blog-rule flex items-center justify-between py-4 text-xs tracking-[0.12em]">
        <span>The Super Design Company</span>
        <span>Studio blog</span>
      </div>
      <header className="pb-12 pt-12 md:pb-20 md:pt-16">
        <h1 className="blog-display m-0">Branding for<br />startup founders</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-12 md:mt-12">
          <p className="m-0 text-sm tracking-[0.12em] md:col-span-4">The blog</p>
          <p className="m-0 max-w-xl font-serif text-xl leading-relaxed md:col-span-8 md:text-2xl">
            Practical guidance on positioning, brand kits, choosing design support, and creating imagery for your startup.
          </p>
        </div>
      </header>
      {ARTICLES.map((article) => (
        <article key={article.slug} className="blog-rule pb-16 pt-5 md:pb-24">
          <div className="mb-5 flex justify-between text-xs tracking-[0.12em]">
            <span>{article.category}</span>
            <time dateTime={article.datePublished}>{formatArticleDate(article.datePublished)}</time>
          </div>
          <a href={article.path} className="group block text-inherit no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-brand-ink">
            {article.heroImage && <BlogImage image={article.heroImage} />}
            <div className={`${article.heroImage ? 'mt-8 ' : ''}grid gap-5 md:grid-cols-12`}>
              <h2 className="m-0 max-w-3xl font-serif text-[clamp(2rem,4.5vw,4.5rem)] font-normal leading-[1.08] tracking-tight md:col-span-8 group-hover:underline group-hover:underline-offset-8">
                {article.title}
              </h2>
              <div className="md:col-span-4 md:pt-2">
                <p className="m-0 text-lg leading-relaxed">{article.excerpt}</p>
                <p className="mt-5 mb-0 text-sm underline underline-offset-4">Read article <span aria-hidden="true">↗</span></p>
              </div>
            </div>
          </a>
        </article>
      ))}
      <div className="blog-rule grid gap-5 pb-16 pt-8 md:grid-cols-12 md:pb-24">
        <p className="m-0 text-sm tracking-[0.12em] md:col-span-4">Brand kits</p>
        <div className="md:col-span-8">
          <p className="m-0 max-w-xl font-serif text-2xl leading-relaxed">Our brand kits include logos, color palettes, typography, imagery, and voice guidance.</p>
          <a href="/#services-heading" className="blog-text-link mt-5 inline-flex min-h-11 items-center">Brand kits and pricing <span className="ml-2" aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div>
  )
}
