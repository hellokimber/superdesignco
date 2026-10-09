import { BRAND_KIT_FAQ } from '../data/brandKitFaq.js'

const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
})

export default function BrandKitFaq({ dateModified }) {
  return (
    <section id="brand-kit-faq" aria-labelledby="brand-kit-faq-heading" className="pt-16 md:pt-24">
      <div className="mx-auto max-w-3xl">
        <h2
          id="brand-kit-faq-heading"
          className="m-0 font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.08] tracking-tight text-brand-ink"
        >
          FAQs
        </h2>
        {dateModified && (
          <p className="mt-3 mb-0 text-sm text-brand-ink/60">
            Updated <time dateTime={dateModified}>{dateFormat.format(new Date(`${dateModified}T00:00:00Z`))}</time>
          </p>
        )}
      </div>
      <div className="mx-auto mt-8 max-w-3xl md:mt-10">
        {BRAND_KIT_FAQ.map(({ id, question, answer }) => (
          <details key={id} className="group border-t border-brand-ink/20 last:border-b">
            <summary
              className="mx-auto flex max-w-3xl min-h-16 cursor-pointer list-none items-center gap-6 py-5 text-brand-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-ink [&::-webkit-details-marker]:hidden"
            >
              <h3 id={id} className="m-0 flex-1 text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                {question}
              </h3>
              <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center text-2xl font-normal leading-none">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">×</span>
              </span>
            </summary>
            <div className="mx-auto max-w-3xl space-y-4 pb-6 pr-12 text-base leading-relaxed text-brand-ink/80 md:text-lg">
              {answer.split(/\n\s*\n/).map((paragraph) => (
                <p key={paragraph} className="m-0">{paragraph}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
