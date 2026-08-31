import { useCallback, useEffect, useRef, useState } from 'react'
import brooksColorLogo from '../assets/imgs/brooks/Brooks_Full_Colour_Blue-Forest.svg'
import brooksLandscape from '../assets/imgs/brooks/mountain-ridges-through-vertical-light.webp'
import brooksLandingBefore from '../assets/imgs/brooks/brooks-landing-before.png'
import brooksLandingAfter from '../assets/imgs/brooks/brooks-landing-after.jpg'

const BASE_KIT = {
  id: 'base-brand-kit-heading',
  title: 'Base brand kit',
  inquireSubject: 'Base brand kit',
  priceKicker: 'Starting at',
  priceAmount: '1k USD',
  inclusions: [
    'One logo',
    'Color palette',
    'Typography',
    'Three images',
    'Base components',
    'Base voice rules',
    'HTML brand kit with assets and instructions for you + your agent',
  ],
}

const FULL_KIT = {
  id: 'full-brand-kit-heading',
  title: 'Full brand kit',
  inquireSubject: 'Full brand kit',
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
    'Logo + UI animations',
    'HTML brand kit with assets and instructions for you + your agent',
  ],
}

const ADD_ONS = {
  id: 'add-ons-heading',
  title: 'Add-ons',
  inquireSubject: 'Brand kit add-ons',
  priceKicker: 'Contact for',
  priceAmount: 'pricing',
  inclusions: [
    'Landing page',
    'Slide decks (pitching, presentations, launch)',
    'Custom AI brand avatar',
    'Product pages',
    'Additional brand imagery',
    'Custom UGC AI characters',
    'Social templates',
    'Digital ads',
    'AI product photography',
  ],
}

const BROOKS_TAGLINES = [
  'Bring clarity to your sales systems.',
  'Build the system before you scale the team.',
  'Installing sales systems for early-stage startups.',
]

const BROOKS_PRIMARY_PALETTE = [
  '#0e2420',
  '#f1ebdd',
  '#c9cec4',
  '#64b6d2',
  '#d68a34',
]

const EMBLEM_SILHOUETTE =
  'M7.64,16.31c-.58,0-1.17-.06-1.74-.19-.67-.15-1.26-.54-1.62-1.08-1.12-1.68.58-3.32,1.13-3.79,1.74-1.46,4.25-2.38,6.68-3.26,2.28-.83,4.64-1.69,6.41-3.01.42-.31.76-.67,1.02-1.09.12-.29.22-.62.06-1.04-.38-.63-1.23-.76-1.88-.76-.23,0-.46.02-.67.04-.97.12-1.93.39-3.04.84-3.22,1.31-6.22,3.33-8.73,5.12-.7.5-1.38.95-2.12,1.39-.46.27-1.14.62-1.78.62-.21,0-.41-.04-.59-.12-.52-.23-.75-.75-.58-1.28.27-.87,1.34-1.47,2.17-1.73l2.23-.69c1.63-.5,3.19-1.16,4.77-2.01l2.39-1.28c.88-.47,1.76-.88,2.78-1.3,2.41-.99,4.89-1.51,7.19-1.51.56,0,1.12.03,1.67.1,1.14.14,2.53.55,2.7,1.26.09.37-.17.72-.33.9-1.03,1.11-3.19,2.37-6.24,3.63l-5.37,2.02c-1.65.6-3.2,1.18-4.56,2.36-.95.82-1.69,2.13-1.07,3.05.31.46.92.7,1.82.7,1.31,0,3.06-.51,4.26-.99l4.44-1.77c2.39-.96,5.37-2.15,8.06-2.32.12,0,.24-.01.36-.01.9,0,1.61.22,2,.62.25.26.38.6.37,1.01-.01.52-.17,1.01-.47,1.49-.82,1.3-3.74,2.73-5.58,2.73-.13,0-.25,0-.36-.02.41-.32,1.02-.73,1.31-1.09.32-.39.58-.77.43-1.46-.08-.4-.37-.53-.53-.57-.33-.08-.71-.12-1.14-.12-1.64,0-4.06.64-7.01,1.85l-3.58,1.47c-1.04.43-2.04.76-3.07,1.02-.76.19-1.49.29-2.21.29Z'

const EMBLEM_BRUSH_PATH =
  'M1.25 8.78 C4.25 7.96 7.32 5.41 10.58 3.64 C14.12 1.72 19.47 .36 24.56 1.63 C23.84 3.28 20.38 4.97 15.59 6.73 C10.64 8.54 6.49 10.13 6.15 12.38 C5.91 14.02 7.18 15.13 9.11 15.04 C12.68 14.88 17.74 12.06 22.21 10.77 C25.33 9.87 28.14 9.62 28.82 10.53 C29.24 11.44 27.84 13.41 24.58 14.10'

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
        <figcaption className="absolute bottom-3 left-3 z-10 inline-flex items-center rounded-full bg-white px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-brand-ink">
          → {label}
        </figcaption>
      ) : null}
    </figure>
  )
}

function BrooksEmblemDraw() {
  const rootRef = useRef(null)
  const pathRef = useRef(null)
  const iconRef = useRef(null)
  const animRef = useRef(null)

  const play = useCallback(() => {
    const path = pathRef.current
    const icon = iconRef.current
    if (!path || !icon) return

    animRef.current?.cancel()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || typeof path.animate !== 'function') {
      path.style.strokeDashoffset = '0'
      icon.style.opacity = '1'
      if (reduced && typeof icon.animate === 'function') {
        animRef.current = icon.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 200,
          easing: 'ease',
          fill: 'both',
        })
      }
      return
    }

    path.style.strokeDashoffset = '1'
    icon.style.opacity = '1'
    animRef.current = path.animate(
      [{ strokeDashoffset: '1' }, { strokeDashoffset: '0' }],
      {
        duration: 1900,
        easing: 'cubic-bezier(0.77, 0, 0.175, 1)',
        fill: 'both',
      },
    )
  }, [])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return undefined

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play()
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [play])

  return (
    <div
      ref={rootRef}
      className="relative flex h-full min-h-[12rem] w-full items-center justify-center bg-[#64b6d2] p-8 text-white"
    >
      <svg
        ref={iconRef}
        className="w-[min(86%,18rem)] overflow-visible"
        viewBox="0 0 30.03 16.45"
        role="img"
        aria-hidden="true"
      >
        <mask
          id="brooks-kit-icon-brush-mask"
          maskUnits="userSpaceOnUse"
          x="-1"
          y="-1"
          width="32.03"
          height="18.45"
          style={{ maskType: 'luminance' }}
        >
          <rect x="-1" y="-1" width="32.03" height="18.45" fill="black" />
          <path
            ref={pathRef}
            pathLength="1"
            d={EMBLEM_BRUSH_PATH}
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: '1 2',
              strokeDashoffset: 1,
            }}
          />
        </mask>
        <path
          mask="url(#brooks-kit-icon-brush-mask)"
          fill="currentColor"
          d={EMBLEM_SILHOUETTE}
        />
      </svg>
      <button
        type="button"
        onClick={play}
        className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-brand-ink transition-colors hover:bg-[#0e2420] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg
          className="h-3 w-3"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M13 3.2A6.5 6.5 0 1 0 14.5 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M13 1.5v3.2h-3.2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Replay
      </button>
    </div>
  )
}

function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt, afterAlt }) {
  const [pos, setPos] = useState(50)
  const rootRef = useRef(null)

  const setFromClientX = useCallback((clientX) => {
    const el = rootRef.current
    if (!el) return
    const { left, width } = el.getBoundingClientRect()
    if (width <= 0) return
    setPos(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)))
  }, [])

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setFromClientX(e.clientX)
  }

  const onPointerMove = (e) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
    setFromClientX(e.clientX)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setPos((p) => Math.max(0, p - 2))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setPos((p) => Math.min(100, p + 2))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setPos(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setPos(100)
    }
  }

  return (
    <figure
      ref={rootRef}
      role="slider"
      aria-label="Compare Brooks landing page before and after"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onKeyDown={onKeyDown}
      className="relative m-0 aspect-[3448/1852] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-iris"
    >
      <img
        src={afterSrc}
        alt={afterAlt}
        width={3448}
        height={1852}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <img
        src={beforeSrc}
        alt={beforeAlt}
        width={3454}
        height={1850}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-top"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        aria-hidden
      >
        <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white text-brand-ink shadow-sm">
          <svg
            viewBox="0 0 20 12"
            className="h-3 w-4"
            fill="none"
            aria-hidden
          >
            <path
              d="M7 1 1 6l6 5M13 1l6 5-6 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <span className="pointer-events-none absolute bottom-3 left-3 z-10 inline-flex items-center rounded-full bg-white px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-brand-ink">
        → Before
      </span>
      <span className="pointer-events-none absolute bottom-3 right-3 z-10 inline-flex items-center rounded-full bg-white px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-brand-ink">
        → After
      </span>
    </figure>
  )
}

function BrooksButton({ children, variant = 'primary', arrow = false }) {
  const variants = {
    primary:
      'border-[#f1ebdd] bg-[#f1ebdd] text-[#0e2420] hover:border-[#c9cec4] hover:bg-[#c9cec4]',
    signal:
      'border-[#64b6d2] bg-[#64b6d2] text-[#0e2420] hover:border-[#285c73] hover:bg-[#285c73] hover:text-[#f1ebdd]',
    amber:
      'border-transparent bg-[#d68a34] text-[#0e2420] hover:bg-[#b8772c]',
    outline:
      'border-[#f1ebdd] bg-transparent text-[#f1ebdd] hover:bg-[#f1ebdd] hover:text-[#0e2420]',
    'signal-outline':
      'border-[#64b6d2] bg-transparent text-[#64b6d2] hover:bg-[#64b6d2] hover:text-[#0e2420]',
    text: 'min-h-11 border-0 bg-transparent px-0 text-[#f1ebdd] hover:text-[#a9c4a5]',
  }

  return (
    <button
      type="button"
      className={`inline-flex min-h-12 w-full max-w-[14.5rem] items-center justify-center gap-[0.42em] rounded-[2px] border-2 px-5 text-center text-[clamp(1rem,0.923rem+0.328vw,1.25rem)] font-bold leading-[1.1] tracking-normal transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#a9c4a5] ${variants[variant]}`}
      style={{ fontFamily: '"Rethink Sans", sans-serif' }}
    >
      {children}
      {arrow ? (
        <span
          aria-hidden
          className="inline-block h-[0.52em] w-[0.52em] shrink-0 border-t-[0.12em] border-r-[0.12em] border-current"
          style={{ transform: 'rotate(45deg) translateY(-0.02em)' }}
        />
      ) : null}
    </button>
  )
}

function BrooksButtonStack() {
  return (
    <div className="flex h-full min-h-[16rem] flex-col items-center justify-center gap-3 p-6 pb-12">
      <BrooksButton>Book a call</BrooksButton>
      <BrooksButton variant="signal">Free trial</BrooksButton>
      <BrooksButton variant="amber">Talk to us</BrooksButton>
      <BrooksButton variant="signal-outline">Book intro call</BrooksButton>
      <BrooksButton variant="outline">Send your funnel</BrooksButton>
      <BrooksButton variant="text" arrow>
        What we build
      </BrooksButton>
    </div>
  )
}

function KitShowcase() {
  return (
    <div className="mt-8 md:mt-12">
      <h3
        id="selected-works-heading"
        className="m-0 font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.08] tracking-tight text-brand-ink"
      >
        Selected works
      </h3>
      <p className="mt-2 m-0 font-serif text-xl font-normal italic tracking-tight text-brand-ink md:text-2xl">
        Brooks full brand kit, selected highlights
      </p>

      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-[minmax(14rem,auto)_minmax(14rem,auto)_minmax(12rem,auto)] lg:gap-3">
        <KitTile
          label="Logo"
          className="min-h-[16rem] bg-[#f1ebdd] text-[#0e2420] sm:col-span-2 lg:col-span-4 lg:row-span-2 lg:min-h-[28rem]"
        >
          <div className="flex h-full min-h-[16rem] items-center justify-center p-8 md:p-10">
            <img
              src={brooksColorLogo}
              alt="Brooks colour logo, blue emblem and forest ink wordmark"
              className="h-auto w-[68%] object-contain lg:w-[70%]"
            />
          </div>
        </KitTile>

        <KitTile label="Typefaces" className="bg-[#c9cec4] text-[#0e2420] lg:col-span-2">
          <div className="flex h-full min-h-[12rem] flex-col justify-center gap-5 p-6 pb-12 md:p-8">
            <div>
              <p
                className="m-0 text-[clamp(1.75rem,4vw,2.25rem)] font-bold leading-none tracking-tight"
                style={{ fontFamily: '"Rethink Sans", sans-serif' }}
              >
                Evidence moves.
              </p>
              <p
                className="mt-1 m-0 text-xs tracking-wide text-[#285c73]"
                style={{ fontFamily: '"Rethink Sans", sans-serif' }}
              >
                Functional
              </p>
            </div>
            <div>
              <p
                className="m-0 text-[clamp(1.5rem,3.5vw,2rem)] font-normal leading-[1.05] tracking-tight"
                style={{
                  fontFamily: '"Libertinus Serif", serif',
                  letterSpacing: '-0.05em',
                }}
              >
                Bring clarity to your sales systems.
              </p>
              <p
                className="mt-1 m-0 text-xs tracking-wide text-[#285c73]"
                style={{ fontFamily: '"Rethink Sans", sans-serif' }}
              >
                Editorial
              </p>
            </div>
          </div>
        </KitTile>

        <KitTile
          label="Taglines"
          className="bg-[#0e2420] text-[#f1ebdd] lg:col-span-2"
        >
          <div className="flex h-full flex-col justify-center gap-3 p-6 pb-12 md:p-8">
            {BROOKS_TAGLINES.map((line) => (
              <p
                key={line}
                className="m-0 text-lg italic leading-snug md:text-xl"
                style={{
                  fontFamily: '"Libertinus Serif", serif',
                  letterSpacing: '-0.05em',
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </KitTile>

        <KitTile label="AI imagery" className="bg-[#0e2420] sm:col-span-1 lg:col-span-2">
          <div className="relative h-full min-h-[12rem]">
            <img
              src={brooksLandscape}
              alt="Mountain ridges through vertical light"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </KitTile>

        <KitTile label="Palette" className="lg:col-span-2">
          <div className="grid h-full min-h-[12rem] grid-cols-5">
            {BROOKS_PRIMARY_PALETTE.map((hex) => (
              <div
                key={hex}
                className="h-full min-h-[12rem]"
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        </KitTile>

        <KitTile label="Animation" className="lg:col-span-2">
          <BrooksEmblemDraw />
        </KitTile>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-2 lg:mt-3 lg:grid-cols-3 lg:items-stretch lg:gap-3">
        <KitTile
          label="Components"
          className="h-full min-h-[16rem] bg-[#0e2420] text-[#f1ebdd]"
        >
          <BrooksButtonStack />
        </KitTile>
        <div className="lg:col-span-2">
          <BeforeAfterSlider
            beforeSrc={brooksLandingBefore}
            afterSrc={brooksLandingAfter}
            beforeAlt="Brooks Advising website before the rebrand"
            afterAlt="Brooks website after the rebrand"
          />
        </div>
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
  dotSeparators = true,
}) {
  const bodySize = 'text-[clamp(1.125rem,1.2vw+0.7rem,1.25rem)] font-medium'

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
          className="inline-flex h-14 shrink-0 items-center justify-center rounded-full bg-brand-lavender px-5 py-1 text-[clamp(1.125rem,1.2vw+0.7rem,1.25rem)] font-medium text-brand-ink no-underline transition-colors hover:bg-brand-iris hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-lavender md:px-6"
        >
          Inquire
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
          className={`m-0 flex min-w-0 flex-1 list-none flex-wrap items-center p-0 leading-[1.1375] ${bodySize} ${
            dotSeparators
              ? 'justify-start gap-x-3 gap-y-2'
              : 'justify-between gap-x-4 gap-y-1'
          }`}
        >
          {inclusions.map((item, i) => (
            <li
              key={item}
              className={`min-w-0 ${dotSeparators ? 'inline-flex items-center gap-3' : ''}`}
            >
              {dotSeparators && i > 0 ? (
                <span
                  aria-hidden
                  className="inline-block h-[0.22em] w-[0.22em] shrink-0 rounded-full bg-brand-lavender"
                />
              ) : null}
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
        Open to equity as part of project compensation for qualified startups.
      </p>

      <KitShowcase />
    </section>
  )
}
