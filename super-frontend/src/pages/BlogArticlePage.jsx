import { useParams } from 'react-router-dom'
import { articleForSlug, formatArticleDate } from '../data/articles.js'
import { BLOG_IMAGES } from '../data/blogImages.js'
import BlogImage from '../components/BlogImage.jsx'
import NotFoundPage from './NotFoundPage.jsx'

function ArticleSection({ section, number }) {
  return (
    <section aria-labelledby={section.id} className="blog-rule grid gap-6 py-10 md:grid-cols-12 md:gap-12 md:py-14">
      <div className="md:col-span-4">
        <p className="mt-0 mb-4 text-xs tracking-[0.12em]">{String(number).padStart(2, '0')}</p>
        <h2 id={section.id} className="m-0 max-w-xs font-serif text-3xl font-normal leading-[1.15] tracking-tight md:text-4xl">{section.title}</h2>
      </div>
      <div className="blog-prose md:col-span-8">
        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.reference && (
          <p className="text-base text-brand-ink/70">
            {section.reference.before}
            <a className="blog-text-link" href={section.reference.href}>{section.reference.label}</a>
            {section.reference.after}
          </p>
        )}
      </div>
    </section>
  )
}

export default function BlogArticlePage() {
  const { slug } = useParams()
  const article = articleForSlug(slug)
  if (!article) return <NotFoundPage />

  return (
    <article className="blog-shell">
      <nav aria-label="Breadcrumb" className="blog-rule flex flex-wrap items-center justify-between gap-4 py-4 text-xs tracking-[0.12em]">
        <a className="blog-text-link" href="/blog/">← All articles</a>
        <span>{article.category}</span>
      </nav>
      <header className="pb-10 pt-12 md:pb-16 md:pt-16">
        <h1 className="blog-display m-0 max-w-6xl">{article.title}</h1>
      </header>
      <BlogImage image={BLOG_IMAGES.editorial} eager />
      <div className="grid gap-8 pb-12 pt-8 md:grid-cols-12 md:gap-12 md:pb-20 md:pt-12">
        <aside className="text-sm leading-relaxed md:col-span-4" aria-label="Article details">
          <p className="mt-0 mb-5"><time dateTime={article.datePublished}>{formatArticleDate(article.datePublished)}</time></p>
          <p className="m-0">Words by {article.author}</p>
          <p className="mt-1 mb-0 text-brand-ink/60">{article.authorRole}</p>
          <p className="mt-5 mb-0 text-brand-ink/60">Images by The Super Design Company<br />AI-generated imagery</p>
        </aside>
        <div className="md:col-span-8">
          <p className="mt-0 mb-8 max-w-[42rem] font-serif text-2xl leading-relaxed md:text-3xl">{article.introduction}</p>
          <aside className="max-w-[42rem] border-l border-brand-ink/25 pl-6 font-serif text-xl leading-relaxed md:text-2xl" aria-label="Our art direction principle">
            {article.principle}
          </aside>
        </div>
      </div>
      {article.sections.map((section, index) => (
        <div key={section.id}>
          <ArticleSection section={section} number={index + 1} />
          {index === 1 && (
            <div className="grid items-start gap-8 pb-12 pt-2 md:grid-cols-12 md:gap-5 md:pb-20">
              <BlogImage image={BLOG_IMAGES.product} className="md:col-span-5 md:mt-16" />
              <BlogImage image={BLOG_IMAGES.portrait} className="md:col-span-7" />
            </div>
          )}
        </div>
      ))}
      <div className="blog-rule grid gap-6 pb-16 pt-8 md:grid-cols-12 md:pb-24 md:pt-12">
        <p className="m-0 text-sm tracking-[0.12em] md:col-span-4">Explore the studio</p>
        <div className="md:col-span-8">
          <p className="m-0 max-w-xl font-serif text-2xl leading-relaxed md:text-3xl">See examples of our AI editorial, product, portrait, and character imagery.</p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
            <a className="blog-text-link inline-flex min-h-11 items-center" href="/#ai-gallery-heading">AI imagery gallery ↗</a>
            <a className="blog-text-link inline-flex min-h-11 items-center" href="/#services-heading">Brand kits and pricing ↗</a>
            <a className="blog-text-link inline-flex min-h-11 items-center" href="/blog/">All blog articles ↗</a>
          </div>
        </div>
      </div>
    </article>
  )
}
