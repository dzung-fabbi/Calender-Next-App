import { useRouter } from 'next/router'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

const NAVBAR_MENU = [
  {
    label: 'Xem Lịch',
    value: 1,
  },
  {
    label: 'Đổi Lịch',
    value: 2,
  },
]
function Header() {
  const [navbarActive, setNavbarActive] = useState(1)
  const router = useRouter()
  return (
    <section className="flex justify-between items-center gap-x-5 py-25px border-b border-[#DDE1DD]">
      <nav className="flex gap-x-5">
        {NAVBAR_MENU.map(({ value, label }) => {
          return (
            <div
              key={value}
              className={twMerge(
                'font-medium text-default p-2.5 cursor-pointer transition-all',
                `${
                  navbarActive === value &&
                  'text-primary border-b-[1px] border-primary'
                }`
              )}
              onClick={() => setNavbarActive(value)}
            >
              {label}
            </div>
          )
        })}
      </nav>
      <div className="flex gap-x-4">
        <button
          className="btn btn-primary"
          onClick={() => router.push('/calendar-schedule')}
        >
          Sắp đặt lịch làm việc
        </button>
        <div className="avatar">
          <div className="w-[45px] h-[45px] rounded-lg">
            <img
              className="object-cover w-full"
              src="https://images.unsplash.com/photo-1603468620905-8de7d86b781e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
              alt="avatar"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header
