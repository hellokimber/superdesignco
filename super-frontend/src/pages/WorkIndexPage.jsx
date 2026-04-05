import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/projects.js'

export default function WorkIndexPage() {
  return (
    <div className="px-5 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="m-0 font-serif text-3xl font-bold lowercase tracking-tight md:text-4xl">
          Work
        </h1>
        <ul className="mt-8 list-none space-y-3 p-0">
          {PROJECTS.map(({ slug, title }) => (
            <li key={slug}>
              <Link
                to={`/work/${slug}`}
                className="text-lg font-light text-inherit underline underline-offset-4 transition-opacity hover:opacity-80"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
