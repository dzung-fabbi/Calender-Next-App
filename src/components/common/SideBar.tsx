import Link from 'next/link'
import { useRouter } from 'next/router'
import { twMerge } from 'tailwind-merge'

const SIDEBAR_MENU = [
  {
    label: 'Lịch tốt xấu',
    icon: <img src="/images/top_bar.png" alt="Lich tot xau" />,
    to: '/',
  },
  // {
  //   label: 'Tứ trụ',
  //   icon: <img src="/images/second_bar.png" alt="Tu tru"></img>,
  //   to: '/tu-tru',
  // },
]
export default function Sidebar() {
  const router = useRouter()
  return (
    <section className="hidden h-[100vh] w-[16.5rem] shrink-0 rounded-r-30px bg-primary px-2.5 py-7 transition-all md:block">
      <div className="flex justify-center">
        <Link href={'/'} passHref legacyBehavior>
          <a>
            <img src="/images/logo.png" alt="logo" />
          </a>
        </Link>
      </div>
      <ul className="mt-[60px] flex flex-col gap-y-5">
        {SIDEBAR_MENU.map(({ icon, label, to }) => {
          const active =
            (router.pathname === '/' && to === router.pathname) ||
            (router.pathname !== '/' && to?.includes(router.pathname))

          return (
            <li key={label}>
              <Link href={to} passHref legacyBehavior>
                <a
                  className={twMerge(
                    'flex items-center gap-x-[10px] px-4 py-3 text-white rounded-primary hover:opacity-[0.85] transition-all',
                    `${active && 'bg-white text-default'}`
                  )}
                >
                  <div>{icon}</div>
                  <span className="font-medium">{label}</span>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
