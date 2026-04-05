import { Link, useParams } from 'react-router-dom'
import { projectTitleForSlug } from '../data/projects.js'

export default function ProjectPage() {
  const { slug } = useParams()
  const title = projectTitleForSlug(slug)

  if (!title) {
    return (
      <div className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-2xl font-bold">Not found</h1>
          <p className="mt-4 text-neutral-600">
            This project does not exist.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block text-sm font-medium underline underline-offset-4"
          >
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-5 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <h1 className="m-0 font-serif text-3xl font-bold lowercase tracking-tight md:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base font-light text-neutral-700">
            Case study and imagery—replace placeholders when assets are ready.
          </p>
        </header>

        <section
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          aria-label="Project imagery"
        >
          <figure className="m-0 aspect-video overflow-hidden rounded-sm border border-dashed border-neutral-300 bg-neutral-50" />
          <figure className="m-0 aspect-video overflow-hidden rounded-sm border border-dashed border-neutral-300 bg-neutral-50" />
        </section>

        <p className="mt-10">
          <Link
            to="/"
            className="text-sm font-medium text-inherit underline underline-offset-4"
          >
            ← Home
          </Link>
        </p>
      </div>
    </div>
  )
}
