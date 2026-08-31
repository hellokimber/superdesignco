const INCLUSIONS = [
  { label: 'Price', value: '$1,000 USD' },
  { label: 'One concept', value: 'High-level strategy' },
  { label: '3 generative AI images', value: '3 taglines' },
  { label: 'Logo files', value: 'SVG & PNG' },
  { label: 'Motion', value: 'Base animation' },
]

// Drop logos at src/assets/imgs/brooks/ then import here:
// import brooksLogoBefore from '../assets/imgs/brooks/brooks-logo-before.webp'
// import brooksLogoAfter from '../assets/imgs/brooks/brooks-logo-after.webp'
const brooksLogoBefore = null
const brooksLogoAfter = null

const inquireHref = () => {
  const email = import.meta.env.VITE_CONTACT_EMAIL?.trim()
  const subject = 'Brand Kit'
  if (email) {
    const q = new URLSearchParams({ subject })
    return `mailto:${email}?${q}`
  }
  return `mailto:hello@superdesigncompany.com?subject=${encodeURIComponent(subject)}`
}

function InquireArrow() {
  return (
    <svg
      className="h-3 w-3"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.5 9.5 9.5 2.5M3.75 2.5h5.75v5.75"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
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

export default function BrandKitsSection() {
  return (
    <section aria-labelledby="services-heading" className="mt-12 md:mt-16">
      <h2
        id="services-heading"
        className="m-0 font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.08] tracking-tight text-brand-ink"
      >
        Services
      </h2>
      <div className="mt-6 flex flex-col rounded-[2rem] bg-brand-iris p-6 text-white md:mt-8 md:p-8 lg:p-10">
        <div className="flex items-start justify-between gap-4">
          <h3
            id="brand-kits-heading"
            className="m-0 font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.08] tracking-tight"
          >
            Brand Kits
          </h3>
          <a
            href={inquireHref()}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-white pl-4 pr-1.5 text-xs font-medium tracking-wide text-brand-ink no-underline transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-11 md:pl-5 md:text-sm"
          >
            Inquire
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-iris text-white md:h-8 md:w-8">
              <InquireArrow />
            </span>
          </a>
        </div>

        <ul className="mt-16 grid list-none grid-cols-1 gap-x-6 gap-y-8 p-0 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5 lg:gap-x-8">
          {INCLUSIONS.map((item) => (
            <li key={item.label} className="min-w-0">
              <p className="m-0 text-sm text-white/50">{item.label}</p>
              <p className="m-0 mt-1 text-sm font-medium md:text-base">
                {item.value}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <KitShowcase />
    </section>
  )
}
