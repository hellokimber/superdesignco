import { useParams } from 'react-router-dom'
import { articleForSlug, formatArticleDate } from '../data/articles.js'
import BlogImage from '../components/BlogImage.jsx'
import NotFoundPage from './NotFoundPage.jsx'

function ArticleBlock({ block, sectionTitle }) {
  if (block.type === 'paragraph') return <p>{block.text}</p>

  if (block.type === 'table') {
    return (
      <div className="blog-table-scroll" role="region" aria-label={`${sectionTitle} comparison table`} tabIndex={0}>
        <table className="blog-table">
          <caption className="sr-only">{sectionTitle}</caption>
          <thead>
            <tr>{block.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) => index === 0
                  ? <th key={index} scope="row">{cell}</th>
                  : <td key={index}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return null
}

function ArticleSection({ section, number }) {
  return (
    <section aria-labelledby={section.id} className="blog-rule grid gap-6 py-10 md:grid-cols-12 md:gap-12 md:py-14">
      <div className="md:col-span-4">
        <p className="mt-0 mb-4 text-xs tracking-[0.12em]">{String(number).padStart(2, '0')}</p>
        <h2 id={section.id} className="m-0 max-w-xs font-serif text-3xl font-normal leading-[1.15] tracking-tight md:text-4xl">{section.title}</h2>
      </div>
      <div className="blog-prose min-w-0 md:col-span-8">
        {section.blocks.map((block, index) => (
          <ArticleBlock key={index} block={block} sectionTitle={section.title} />
        ))}
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
      {article.heroImage && <BlogImage image={article.heroImage} eager />}
      <div className="grid gap-8 pb-12 pt-8 md:grid-cols-12 md:gap-12 md:pb-20 md:pt-12">
        <aside className="text-sm leading-relaxed md:col-span-4" aria-label="Article details">
          <p className="mt-0 mb-5"><time dateTime={article.datePublished}>{formatArticleDate(article.datePublished)}</time></p>
          <p className="m-0">Words by {article.author}</p>
          <p className="mt-1 mb-0 text-brand-ink/60">{article.authorRole}</p>
          {article.heroImage && <p className="mt-5 mb-0 text-brand-ink/60">Images by The Super Design Company<br />AI-generated imagery</p>}
        </aside>
        <div className="blog-prose min-w-0 md:col-span-8">
          {article.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
      {article.sections.map((section, index) => (
        <ArticleSection key={section.id} section={section} number={index + 1} />
      ))}
      <div className="blog-rule grid gap-6 pb-16 pt-8 md:grid-cols-12 md:pb-24 md:pt-12">
        <p className="m-0 text-sm tracking-[0.12em] md:col-span-4">Explore the studio</p>
        <div className="md:col-span-8">
          <p className="m-0 max-w-xl font-serif text-2xl leading-relaxed md:text-3xl">Explore our brand kits, selected work, and AI imagery.</p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
            <a className="blog-text-link inline-flex min-h-11 items-center" href="/#services-heading">Brand kits and pricing ↗</a>
            <a className="blog-text-link inline-flex min-h-11 items-center" href="/#ai-gallery-heading">AI imagery gallery ↗</a>
            <a className="blog-text-link inline-flex min-h-11 items-center" href="/blog/">All blog articles ↗</a>
          </div>
        </div>
      </div>
    </article>
  )
}
