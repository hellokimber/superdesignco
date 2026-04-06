import { NavLink } from 'react-router-dom'
import logoBlack from '../assets/super-logo/Super-black.svg'

const contactHref = () => {
  const email = import.meta.env.VITE_CONTACT_EMAIL?.trim()
  if (email) {
    const q = new URLSearchParams({ subject: 'Let’s work together' })
    return `mailto:${email}?${q}`
  }
  return 'mailto:hello@superdesigncompany.com?subject=Let%E2%80%99s%20work%20together'
}

export default function Header() {
  return (
    <header className="flex h-20 flex-wrap items-center justify-between gap-4 px-5 md:px-8">
      <NavLink to="/" className="block w-24 shrink-0 md:w-[6em]" end>
        <img
          src={logoBlack}
          alt="The Super Design Company"
          className="h-auto w-full"
          width={120}
          height={51}
        />
      </NavLink>
      <a
        href={contactHref()}
        className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand-ink px-4 py-2.5 text-center text-xs font-medium tracking-wide text-white no-underline transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink md:px-5 md:text-sm"
      >
        Let’s work together!
      </a>
    </header>
  )
}
