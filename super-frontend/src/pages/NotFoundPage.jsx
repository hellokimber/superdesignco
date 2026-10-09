import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-2xl font-bold">Page not found</h1>
        <p className="mt-4 text-neutral-600">The page you requested does not exist.</p>
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
