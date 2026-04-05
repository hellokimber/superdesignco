import logoWhite from '../assets/super-logo/SuperDesCo_white.svg'

export default function Footer() {
  return (
    <footer className="flex flex-col gap-6 bg-[#050505] px-5 py-8 pb-16 text-white md:flex-row md:items-center md:justify-between md:px-8">
      <div className="w-24 shrink-0 md:w-[6em]">
        <img
          src={logoWhite}
          alt="The Super Design Company"
          className="h-auto w-full"
          width={120}
          height={29}
        />
      </div>
      <p className="text-sm font-light opacity-90">
        © {new Date().getFullYear()} The Super Design Company
      </p>
    </footer>
  )
}
