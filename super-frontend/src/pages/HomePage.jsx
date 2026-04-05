import { useLayoutEffect, useRef, useState } from 'react'
import { HOME_GRID } from '../data/homeGrid.js'

/** 4 visual lanes at lg+ (12-col system: each lane = 3 tracks). */
function columnCountForWidth(widthPx) {
  if (widthPx < 768) return 1
  if (widthPx < 1024) return 2
  return 4
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
  for (const item of items) {
    let shortest = cols[0]
    for (let i = 1; i < cols.length; i++) {
      if (cols[i].height < shortest.height) shortest = cols[i]
    }
    const aspect = item.height / item.width
    const tileH = colWidth * aspect + gapPx
    shortest.list.push(item)
    shortest.height += tileH
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

  return (
    <div className="px-5 pb-16 pt-6 md:px-8 md:pb-20 md:pt-8">
      <section aria-labelledby="hero-heading" className="max-w-[min(100%,52rem)]">
        <h1
          id="hero-heading"
          className="m-0 font-sans text-[clamp(1.75rem,5vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-brand-ink"
        >
          AI-native designer with the foundation of a{' '}
          <span className="font-serif font-normal italic">fine artist</span>
        </h1>
      </section>

      <section
        ref={rootRef}
        className="home-mosaic mt-12 md:mt-16"
        aria-label="Selected work"
      >
        {columns.map((colItems, colIndex) => (
          <div
            key={colIndex}
            className="home-mosaic__col min-w-0 flex-1"
            data-col={colIndex + 1}
          >
            {colItems.map(({ area, src, alt, width, height }) => {
              const isLcp = area === 't1'
              const globalIndex = HOME_GRID.findIndex((g) => g.area === area) + 1
              return (
                <figure
                  key={area}
                  data-area={area}
                  className="home-mosaic__figure"
                >
                  <img
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    sizes={sizes}
                    loading={isLcp ? 'eager' : 'lazy'}
                    decoding={isLcp ? 'sync' : 'async'}
                    {...(isLcp ? { fetchPriority: 'high' } : {})}
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
  )
}
