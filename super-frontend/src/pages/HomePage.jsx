import { useLayoutEffect, useRef, useState } from 'react'
import BrandKitsSection from '../components/BrandKitsSection.jsx'
import heroLandscape from '../assets/imgs/SuperDesign_about-streaks.jpg'
import midpageLandscape from '../assets/imgs/SuperDesign_about-horizon.jpg'
import footerLandscape from '../assets/imgs/SuperDesign_hero-hills.jpg'
import emblemWhite from '../assets/super-logo/Super-Emblem-white.svg'
import { HOME_GRID } from '../data/homeGrid.js'

const HOME_MOSAIC_HERO_AREA = 't2'
const HOME_MOSAIC_CHARACTERS_AREA = 't20'

/** 4 visual lanes at lg+ (12-col system: each lane = 3 tracks). */
function columnCountForWidth(widthPx) {
  if (widthPx < 768) return 1
  if (widthPx < 1024) return 2
  return 4
}

function pinSpanTwo(cols, item, startCol, colWidth, gapPx) {
  const endCol = startCol + 1
  const aspect = item.height / item.width
  const visibleHeight = (colWidth * 2 + gapPx) * aspect
  const tileH = visibleHeight + gapPx
  const y = Math.max(cols[startCol].height, cols[endCol].height)

  for (const c of [startCol, endCol]) {
    const delta = y - cols[c].height
    const spacerHeight = delta - gapPx
    // Zero-height spacers still consume a flex-gap, doubling the gutter.
    if (spacerHeight > 1) {
      cols[c].list.push({
        area: `${item.area}__align-${c}`,
        isSpacer: true,
        spacerHeight,
      })
      cols[c].height = y
    }
  }

  cols[startCol].list.push({ ...item, isSpanTwo: true })
  cols[startCol].height += tileH
  cols[endCol].list.push({
    area: `${item.area}__spacer`,
    isSpacer: true,
    spacerHeight: visibleHeight,
  })
  cols[endCol].height += tileH
}

function packItem(cols, item, colWidth, gapPx) {
  let shortest = cols[0]
  for (let i = 1; i < cols.length; i++) {
    if (cols[i].height < shortest.height) shortest = cols[i]
  }
  const aspect = item.height / item.width
  const tileH = colWidth * aspect + gapPx
  shortest.list.push(item)
  shortest.height += tileH
}

function packMasonry(items, containerWidthPx, gapPx, colCount) {
  const n = Math.max(1, colCount)
  if (!items.length) {
    return Array.from({ length: n }, () => [])
  }
  if (containerWidthPx <= 0) {
    return [[...items], ...Array.from({ length: n - 1 }, () => [])]
  }
  const totalGap = gapPx * (n - 1)
  const colWidth = Math.max(0, (containerWidthPx - totalGap) / n)
  const cols = Array.from({ length: n }, () => ({ list: [], height: 0 }))
  let pendingItems = items

  // Cairn landscape top-left (2 lanes). Fill the two right lanes with one
  // image each, then pin the character lineup across those lanes underneath.
  if (n >= 4) {
    const hero = items.find((item) => item.area === HOME_MOSAIC_HERO_AREA)
    if (hero) {
      pinSpanTwo(cols, hero, 0, colWidth, gapPx)
      pendingItems = pendingItems.filter(
        (item) => item.area !== HOME_MOSAIC_HERO_AREA,
      )
    }
  }

  const characters = pendingItems.find(
    (item) => item.area === HOME_MOSAIC_CHARACTERS_AREA,
  )
  const rest = pendingItems.filter(
    (item) => item.area !== HOME_MOSAIC_CHARACTERS_AREA,
  )

  const packUntilColsFilled = (colIndexes) => {
    let i = 0
    while (
      i < rest.length &&
      colIndexes.some((c) => cols[c].list.length === 0)
    ) {
      packItem(cols, rest[i], colWidth, gapPx)
      i += 1
    }
    return i
  }

  if (characters && n >= 4) {
    let i = packUntilColsFilled([2, 3])
    pinSpanTwo(cols, characters, 2, colWidth, gapPx)
    for (; i < rest.length; i++) {
      packItem(cols, rest[i], colWidth, gapPx)
    }
  } else if (characters && n === 2) {
    let i = packUntilColsFilled([0, 1])
    pinSpanTwo(cols, characters, 0, colWidth, gapPx)
    for (; i < rest.length; i++) {
      packItem(cols, rest[i], colWidth, gapPx)
    }
  } else {
    rest.forEach((item) => packItem(cols, item, colWidth, gapPx))
    if (characters) packItem(cols, characters, colWidth, gapPx)
  }

  return cols.map((c) => c.list)
}

function initialPackedColumns() {
  if (typeof window === 'undefined') {
    return { columns: [HOME_GRID], colCount: 1 }
  }
  const w = Math.max(320, window.innerWidth)
  const n = columnCountForWidth(w)
  const gapPx = w >= 768 ? 16 : 12
  const pad = w >= 768 ? 64 : 40
  const contentW = Math.max(200, w - pad)
  return {
    columns: packMasonry(HOME_GRID, contentW, gapPx, n),
    colCount: n,
  }
}

function sizesForColumnCount(colCount) {
  if (colCount <= 1) {
    return '(max-width: 767px) calc(100vw - 2.5rem), calc(100vw - 2.5rem)'
  }
  if (colCount === 2) {
    return '(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1023px) calc(50vw - 2.5rem), calc(50vw - 2.5rem)'
  }
  return '(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1023px) calc(50vw - 2.5rem), calc((100vw - 4rem - 3rem) / 4)'
}

function sizesForHero(colCount) {
  if (colCount <= 1) {
    return '(max-width: 767px) calc(100vw - 2.5rem), calc(100vw - 2.5rem)'
  }
  if (colCount === 2) {
    return '(max-width: 767px) calc(100vw - 2.5rem), calc(100vw - 2.5rem)'
  }
  return '(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1023px) calc(100vw - 2.5rem), calc(50vw - 3.5rem)'
}

function inquireNowHref(subject = 'Inquire now') {
  const email = import.meta.env.VITE_CONTACT_EMAIL?.trim()
  if (email) {
    const q = new URLSearchParams({ subject })
    return `mailto:${email}?${q}`
  }
  return `mailto:hello@superdesigncompany.com?subject=${encodeURIComponent(subject)}`
}

const STUDIO_CTA_CLASS =
  'mt-8 inline-flex h-12 items-center justify-center rounded-full px-5 text-[clamp(1.125rem,1.2vw+0.7rem,1.25rem)] font-medium no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:mt-10 md:px-6'

const WHITE_OUTLINE_CTA_CLASS =
  'border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-ink focus-visible:outline-white'

function StudioBand({
  headingId,
  eager = false,
  src,
  alt,
  width,
  height,
  objectClass = 'object-[center_20%]',
  copy,
  copyClassName = 'text-[clamp(1.35rem,3.4vw,2.15rem)] leading-[1.4]',
  copyMaxClassName = 'max-w-[min(100%,48rem)]',
  emblemSrc,
  ctaLabel,
  ctaSubject = 'Inquire now',
  ctaClassName = 'bg-brand-lavender text-brand-ink hover:bg-brand-iris hover:text-white focus-visible:outline-brand-lavender',
  pill = false,
}) {
  const inner = (
    <>
      {emblemSrc ? (
        <img
          src={emblemSrc}
          alt=""
          width={70}
          height={70}
          aria-hidden
          className="mx-auto mb-6 h-14 w-14 md:mb-8 md:h-16 md:w-16"
        />
      ) : null}
      <p
        id={headingId}
        className={`m-0 font-serif font-normal tracking-tight ${copyClassName}`}
      >
        {copy}
      </p>
      {ctaLabel ? (
        <a
          href={inquireNowHref(ctaSubject)}
          className={`${STUDIO_CTA_CLASS} ${ctaClassName}`}
        >
          {ctaLabel}
        </a>
      ) : null}
    </>
  )

  if (pill) {
    return (
      <section
        aria-labelledby={headingId}
        className="px-[clamp(1.25rem,5vw,4rem)] py-8 md:py-12"
      >
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-full px-10 py-12 text-center text-white md:px-16 md:py-16">
          {src ? (
            <>
              <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes="100vw"
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
                className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${objectClass}`}
                {...(eager ? { fetchPriority: 'high' } : {})}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-brand-lavender/70 mix-blend-multiply"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-brand-ink/25"
              />
            </>
          ) : null}
          <div className="relative z-10 flex flex-col items-center">
            {inner}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      aria-labelledby={headingId}
      className="relative h-[34.375rem] w-full overflow-hidden"
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="100vw"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover ${objectClass}`}
        {...(eager ? { fetchPriority: 'high' } : {})}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 px-5 md:px-8">
        <div className={`${copyMaxClassName} text-center text-white`}>
          {inner}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const rootRef = useRef(null)
  const [{ columns, colCount }, setLayout] = useState(initialPackedColumns)

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return undefined

    const update = () => {
      const width = el.getBoundingClientRect().width
      const styles = getComputedStyle(el)
      const gapRaw = styles.gap || styles.columnGap || '12px'
      const gapPx = parseFloat(gapRaw) || 12
      const n = columnCountForWidth(window.innerWidth)
      setLayout({
        columns: packMasonry(HOME_GRID, width, gapPx, n),
        colCount: n,
      })
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  const sizes = sizesForColumnCount(colCount)
  const sizesHero = sizesForHero(colCount)

  return (
    <>
      <div className="px-[clamp(1.25rem,5vw,4rem)] pb-16 pt-[clamp(5rem,14vw,12.5rem)] md:pb-24">
        <section
          aria-labelledby="hero-heading"
          className="max-w-[min(100%,72rem)]"
        >
          <h1
            id="hero-heading"
            className="m-0 font-sans text-[clamp(5.25rem,15vw,9.75rem)] font-bold leading-[0.95] tracking-tight text-brand-ink"
          >
            Stand out.
            <br />
            Launch fast.
          </h1>
          <p className="mt-4 m-0 font-sans text-[clamp(1.3125rem,3.75vw,2.4375rem)] font-normal leading-[1.2] tracking-tight text-brand-ink md:mt-5">
            Branding for pre-launch and early stage startups.
          </p>
        </section>
      </div>

      <StudioBand
        headingId="studio-heading"
        eager
        src={heroLandscape}
        alt="Dark mountain ridge with vertical purple and blue light streaks"
        width={1024}
        height={573}
        copy="We build you a brand that stands out but is light enough to keep up with the speed you ship."
        copyClassName="text-[clamp(2.16rem,5.44vw,3.44rem)] leading-[1.12]"
        copyMaxClassName="max-w-[min(100%,72.8rem)]"
        ctaLabel="Work with us"
        ctaSubject="Work with us"
        ctaClassName={WHITE_OUTLINE_CTA_CLASS}
      />

      <div className="px-[clamp(1.25rem,5vw,4rem)] pb-16 md:pb-24">
        <BrandKitsSection />
      </div>

      <StudioBand
        headingId="studio-heading-midpage"
        pill
        src={midpageLandscape}
        alt="Grainy twilight ridge with a glowing peach and lavender horizon"
        width={1024}
        height={438}
        objectClass="object-center"
        copy={
          <>
            Your startup isn&apos;t generic.
            <br />
            Your branding shouldn&apos;t be either.
          </>
        }
        copyClassName="text-[clamp(2.16rem,5.44vw,3.44rem)] leading-[1.12]"
        ctaLabel="Reserve your spot"
        ctaSubject="Reserve your spot"
        ctaClassName={WHITE_OUTLINE_CTA_CLASS}
      />

      <div className="px-5 pb-16 md:px-8 md:pb-20">
        <h2
          id="ai-gallery-heading"
          className="mt-12 mb-0 font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.08] tracking-tight text-brand-ink md:mt-16"
        >
          AI gallery
        </h2>
        <p className="mt-2 m-0 font-serif text-xl font-normal italic tracking-tight text-brand-ink md:text-2xl">
          Editorial + product photography, characters and avatars
        </p>
        <section
          ref={rootRef}
          className="home-mosaic mt-5 md:mt-6"
          aria-labelledby="ai-gallery-heading"
        >
        {columns.map((colItems, colIndex) => (
          <div
            key={colIndex}
            className="home-mosaic__col min-w-0 flex-1"
            data-col={colIndex + 1}
          >
            {colItems.map((item) => {
              if (item.isSpacer) {
                return (
                  <figure
                    key={item.area}
                    aria-hidden="true"
                    className="home-mosaic__figure home-mosaic__spacer"
                    style={{ height: `${item.spacerHeight}px` }}
                  />
                )
              }

              const { area, src, alt, width, height, isSpanTwo } = item
              const globalIndex = HOME_GRID.findIndex((g) => g.area === area) + 1
              const isHero = area === HOME_MOSAIC_HERO_AREA
              return (
                <figure
                  key={area}
                  data-area={area}
                  className={`home-mosaic__figure${isSpanTwo ? ' home-mosaic__figure--span-2' : ''}`}
                >
                  <img
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    sizes={isSpanTwo ? sizesHero : sizes}
                    loading={isHero ? 'eager' : 'lazy'}
                    decoding={isHero ? 'sync' : 'async'}
                    {...(isHero ? { fetchPriority: 'high' } : {})}
                    className="home-mosaic__media"
                  />
                  <figcaption className="sr-only">
                    {alt} ({globalIndex} of {HOME_GRID.length})
                  </figcaption>
                </figure>
              )
            })}
          </div>
        ))}
        </section>
      </div>

      <StudioBand
        headingId="studio-heading-footer"
        src={footerLandscape}
        alt="Grainy twilight hills with a glowing peach and lavender horizon"
        width={1024}
        height={438}
        objectClass="object-center"
        emblemSrc={emblemWhite}
        copy="The Super Design Company is an independent brand studio for founders and builders. For the ones with the audacity and the drive to make the impossible happen."
        copyMaxClassName="max-w-[min(100%,52.8rem)]"
        ctaLabel="Work with us"
        ctaSubject="Work with us"
        ctaClassName={WHITE_OUTLINE_CTA_CLASS}
      />
    </>
  )
}
