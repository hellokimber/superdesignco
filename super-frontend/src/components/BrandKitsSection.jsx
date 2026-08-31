const BASE_KIT = {
  id: 'base-brand-kit-heading',
  title: 'Base Brand Kit',
  inquireSubject: 'Base Brand Kit',
  priceKicker: 'Starting at',
  priceAmount: '1k USD',
  inclusions: [
    'One logo',
    'Color palette',
    'Typography',
    'Three images',
    'Base components',
    'Base voice rules',
  ],
}

const FULL_KIT = {
  id: 'full-brand-kit-heading',
  title: 'Full Brand Kit',
  inquireSubject: 'Full Brand Kit',
  inverted: true,
  priceKicker: 'Starting at',
  priceAmount: '5k USD',
  inclusions: [
    '1–2 logo concepts',
    'Brand value props + positioning',
    'Color palette',
    'Typography',
    '6–9 images',
    'Components',
    'Voice and copy',
    '3–5 taglines',
    'Base logo animation',
  ],
}

const ADD_ONS = {
  id: 'add-ons-heading',
  title: 'Add-ons',
  inquireSubject: 'Brand Kit add-ons',
  priceKicker: 'Contact for',
  priceAmount: 'pricing',
  inclusions: [
    'Landing page',
    'Slide decks (pitching, presentations, launch)',
    'Custom AI brand avatar',
    'Product pages',
    'Additional brand imagery',
    'Custom UGC AI characters',
  ],
}

// Drop logos at src/assets/imgs/brooks/ then import here:
// import brooksLogoBefore from '../assets/imgs/brooks/brooks-logo-before.webp'
// import brooksLogoAfter from '../assets/imgs/brooks/brooks-logo-after.webp'
const brooksLogoBefore = null
const brooksLogoAfter = null

const inquireHref = (subject) => {
  const email = import.meta.env.VITE_CONTACT_EMAIL?.trim()
  if (email) {
    const q = new URLSearchParams({ subject })
    return `mailto:${email}?${q}`
  }
  return `mailto:hello@superdesigncompany.com?subject=${encodeURIComponent(subject)}`
}

function KitTile({ label, className, children }) {
  return (
    <figure
      className={`relative m-0 min-h-[12rem] overflow-hidden rounded-2xl ${className}`}
    >
      {children}
      {label ? (
        <figcaption className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-white px-2.5 py-1 text-[0.65rem] font-medium tracking-widest text-brand-ink">
          → {label}
        </figcaption>
      ) : null}
    </figure>
  )
}

function LogoLockup({ src, alt, fallback }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain p-8 md:p-10"
      />
    )
  }
  return (
    <div className="flex h-full min-h-[12rem] items-center justify-center p-8">
      {fallback}
    </div>
  )
}

function KitShowcase() {
  return (
    <div className="mt-8 md:mt-12">
      <h3
        id="kit-heading"
        className="m-0 font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.08] tracking-tight text-brand-ink"
      >
        what’s in your kit
      </h3>
      <p className="mt-2 m-0 font-serif text-xl font-normal italic tracking-tight text-brand-ink md:text-2xl">
        Brooks
      </p>

      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-[minmax(14rem,auto)_minmax(14rem,auto)_minmax(12rem,auto)] lg:gap-3">
        <KitTile
          label="LOGO"
          className="bg-brand-lavender text-brand-ink sm:col-span-2 lg:col-span-4 lg:row-span-2 lg:min-h-[28rem]"
        >
          <LogoLockup
            src={brooksLogoAfter}
            alt="Brooks logo after rebrand"
            fallback={
              <span className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] italic leading-none">
                Brooks
              </span>
            }
          />
        </KitTile>

        <KitTile
          label="BEFORE"
          className="bg-neutral-100 text-neutral-400 lg:col-span-2"
        >
          <LogoLockup
            src={brooksLogoBefore}
            alt="Brooks logo before rebrand"
            fallback={
              <span className="text-sm font-medium tracking-wide">Before</span>
            }
          />
        </KitTile>

        <KitTile
          label="TAGLINES"
          className="bg-brand-ink text-white lg:col-span-2"
        >
          <div className="flex h-full flex-col justify-center gap-3 p-6 md:p-8">
            <p className="m-0 font-serif text-lg italic leading-snug md:text-xl">
              Lead with conviction.
            </p>
            <p className="m-0 font-serif text-lg italic leading-snug md:text-xl">
              Built to be seen.
            </p>
            <p className="m-0 font-serif text-lg italic leading-snug md:text-xl">
              Ready at launch.
            </p>
          </div>
        </KitTile>

        <KitTile
          label="AI IMAGERY"
          className="bg-neutral-200 sm:col-span-1 lg:col-span-2"
        >
          <div className="grid h-full min-h-[12rem] grid-cols-3">
            <div className="bg-neutral-300" />
            <div className="bg-brand-lavender/70" />
            <div className="bg-neutral-400/80" />
          </div>
        </KitTile>

        <KitTile
          label="ANIMATION"
          className="bg-brand-iris text-white lg:col-span-2"
        >
          <div className="flex h-full min-h-[12rem] items-center justify-center">
            <span className="h-20 w-20 rounded-full bg-brand-lavender motion-safe:animate-pulse" />
          </div>
        </KitTile>

        <KitTile
          label="LOGO FILES"
          className="bg-neutral-100 text-brand-ink lg:col-span-2"
        >
          <div className="flex h-full min-h-[12rem] items-center justify-center gap-6 p-6">
            <span className="font-sans text-2xl font-bold tracking-tight md:text-3xl">
              SVG
            </span>
            <span className="text-neutral-300" aria-hidden>
              /
            </span>
            <span className="font-sans text-2xl font-bold tracking-tight md:text-3xl">
              PNG
            </span>
          </div>
        </KitTile>
      </div>
    </div>
  )
}

function OfferingCard({
  id,
  title,
  inquireSubject,
  inclusions,
  priceKicker,
  priceAmount,
  inverted = false,
}) {
  const bodySize =
    'text-[clamp(1.125rem,1.2vw+0.7rem,1.25rem)] font-medium'

  return (
    <div
      className={`flex flex-col rounded-[2rem] border-[6px] border-solid border-black p-[1.5rem] md:px-[2.4rem] md:py-[1.8rem] ${
        inverted ? 'bg-black text-white' : 'bg-transparent text-brand-ink'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3
          id={id}
          className="m-0 font-sans text-[clamp(3.5rem,8vw,5rem)] font-bold leading-[1.08] tracking-tight"
        >
          {title}
        </h3>
        <a
          href={inquireHref(inquireSubject)}
          className={`inline-flex h-10 shrink-0 items-center rounded-full px-5 text-xs font-medium tracking-wide no-underline transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:h-11 md:px-6 md:text-sm ${
            inverted
              ? 'bg-white text-black focus-visible:outline-white'
              : 'bg-brand-iris text-white focus-visible:outline-brand-iris'
          }`}
        >
          book now
        </a>
      </div>

      <div className="mt-[6.25rem] flex items-start gap-x-8 gap-y-3">
        <p
          className={`m-0 shrink-0 whitespace-nowrap leading-[1.1375] ${
            inverted ? 'text-white/50' : 'text-brand-ink/50'
          } ${bodySize}`}
        >
          {priceKicker} {priceAmount}
        </p>
        <ul
          className={`m-0 flex min-w-0 flex-1 list-none flex-wrap items-center justify-between gap-x-4 gap-y-1 p-0 leading-[1.1375] ${bodySize}`}
        >
          {inclusions.map((item) => (
            <li key={item} className="min-w-0">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function BrandKitsSection() {
  return (
    <section aria-labelledby="services-heading" className="mt-12 md:mt-16">
      <h2
        id="services-heading"
        className="m-0 pl-[1%] font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.08] tracking-tight text-brand-ink"
      >
        Services
      </h2>
      <div className="mt-6 flex flex-col gap-4 md:mt-8">
        <OfferingCard {...BASE_KIT} />
        <OfferingCard {...FULL_KIT} />
        <OfferingCard {...ADD_ONS} />
      </div>
      <p className="mt-6 m-0 text-center text-[clamp(1.125rem,1.2vw+0.7rem,1.25rem)] leading-relaxed text-brand-ink/50 md:mt-8">
        Open to taking part of project compensation in equity for qualified
        startups.
      </p>

      <KitShowcase />
    </section>
  )
}
