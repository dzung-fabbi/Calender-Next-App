import { useRouter } from 'next/router'
import { twMerge } from 'tailwind-merge'

import { useStore } from '@/store/useStore'
import { MODE_TAB_HEADER } from '@/utils/constant'

import Button from '../button/ButtonPrimary'

const NAVBAR_MENU = [
  {
    label: 'Xem Lịch',
    value: MODE_TAB_HEADER.PREVIEW,
  },
  {
    label: 'Đổi Lịch',
    value: MODE_TAB_HEADER.CALENDAR_CHANGE,
  },
]
function Header() {
  const router = useRouter()
  const tabHeader = useStore((state) => state.tabHeader)
  const onChangeTab = useStore((state) => state.setTabHeader)
  const handleChangeTabHeader = (newTab: number) => {
    onChangeTab(newTab)
    if (router.pathname !== '/') router.push('/')
  }
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
                  router.pathname === '/' &&
                  tabHeader === value &&
                  'text-primary border-b border-primary'
                }`
              )}
              onClick={() => handleChangeTabHeader(value)}
            >
              {label}
            </div>
          )
        })}
      </nav>
      <div className="flex gap-x-4">
        <Button onClick={() => router.push('/calendar-schedule')} primary>
          Sắp đặt lịch làm việc
        </Button>
        <div className="w-[45px] h-[45px] rounded-primary">
          <img
            className="object-cover w-full h-full rounded-primary"
            src="https://images.unsplash.com/photo-1603468620905-8de7d86b781e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
            alt="avatar"
          />
        </div>
      </div>
    </section>
  )
}

export default Header
