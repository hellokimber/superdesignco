import { NavLink } from 'react-router-dom'
import logoBlack from '../assets/super-logo/Super-black.svg'

const X_PROFILE_URL = 'https://x.com/thesuperdesign'

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
      <div className="flex shrink-0 items-center gap-3 md:gap-4">
        <a
          href={contactHref()}
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-brand-ink px-4 text-center text-xs font-medium tracking-wide text-white no-underline transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink md:h-11 md:px-5 md:text-sm"
        >
          Let’s work together!
        </a>
        <a
          href={X_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-ink text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink md:h-11 md:w-11"
          aria-label="The Super Design Company on X"
        >
          <svg
            className="h-4 w-4 md:h-[1.125rem] md:w-[1.125rem]"
            viewBox="0 0 19 19"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </header>
  )
}
