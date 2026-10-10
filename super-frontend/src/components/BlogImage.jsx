export default function BlogImage({ image, eager = false, className = '', caption = image.caption }) {
  return (
    <figure className={`m-0 ${className}`}>
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        className="block h-auto w-full"
      />
      <figcaption className="mt-3 max-w-xl text-sm leading-relaxed text-brand-ink/60">
        {caption}
      </figcaption>
    </figure>
  )
}
