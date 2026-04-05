const PLACEHOLDER_COUNT = 6

export default function GalleryPage() {
  return (
    <div className="px-5 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-2xl">
          <h1 className="m-0 font-serif text-3xl font-bold lowercase tracking-tight md:text-4xl">
            AI explorations
          </h1>
          <p className="mt-4 text-base font-light leading-relaxed text-neutral-700 md:text-lg">
            Placeholder grid—swap in real imagery when assets are ready.
          </p>
        </header>

        <section
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Image gallery"
        >
          {Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
            <figure
              key={i}
              className="m-0 aspect-[4/3] overflow-hidden rounded-sm border border-dashed border-neutral-300 bg-neutral-50"
            >
              <figcaption className="sr-only">Placeholder {i + 1}</figcaption>
            </figure>
          ))}
        </section>
      </div>
    </div>
  )
}
