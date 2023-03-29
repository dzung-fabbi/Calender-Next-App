import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Drawer,
} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { twMerge } from 'tailwind-merge'

import { useToggle } from '@/hooks'
import { useStore } from '@/store/useStore'
import { MODE_TAB_HEADER } from '@/utils/constant'

import Button from '../button/ButtonPrimary'
import { CalendarHeader, ConvertCalendar } from '../icon'

const NAVBAR_MENU = [
  {
    label: 'Xem Lịch',
    value: MODE_TAB_HEADER.PREVIEW,
    icon: <CalendarHeader />,
  },
  {
    label: 'Đổi Lịch',
    value: MODE_TAB_HEADER.CALENDAR_CHANGE,
    icon: <ConvertCalendar />,
  },
  {
    label: 'Phương vị cát hung',
    value: MODE_TAB_HEADER.THAN_SAT,
    icon: <ConvertCalendar />,
  },
]
function Header() {
  const router = useRouter()
  const tabHeader = useStore((state) => state.tabHeader)
  const [openDrawer, setOpenDrawer] = useToggle(false)
  const onChangeTab = useStore((state) => state.setTabHeader)
  const handleChangeTabHeader = (newTab: number) => {
    onChangeTab(newTab)
    if (router.pathname !== '/') router.push('/')
  }
  return (
    <section className="flex items-center justify-between gap-x-5 border-b border-[#DDE1DD] py-[15px] md:py-[25px]">
      <nav className="hidden gap-x-5 md:flex">
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
      <div className="hidden gap-x-4 md:flex">
        <Button onClick={() => router.push('/calendar-schedule')} primary>
          Sắp đặt lịch làm việc
        </Button>
        <div className="h-[45px] w-[45px] rounded-primary">
          <img
            className="h-full w-full rounded-primary object-cover"
            src="https://images.unsplash.com/photo-1603468620905-8de7d86b781e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
            alt="avatar"
          />
        </div>
      </div>
      <div className="w-full xs:flex md:hidden">
        <button onClick={() => setOpenDrawer()} className="grow">
          <img src="/images/menu.png" alt="" />
        </button>
        <Avatar
          alt="Remy Sharp"
          src="https://images.unsplash.com/photo-1603468620905-8de7d86b781e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
        />
        <Drawer
          PaperProps={{
            sx: { width: '100%' },
          }}
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer()}
        >
          <div className="flex w-full justify-between border-b border-[#F0F0F0] p-6">
            <img src="/images/mobile_logo.png" alt="" />
            <button>
              <img
                src="/images/arrow-left.png"
                alt=""
                onClick={() => setOpenDrawer()}
              />
            </button>
          </div>
          <div className="p-6">
            <Accordion className="rounded-primary" defaultExpanded>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    fontSize="large"
                    sx={{
                      color: router.pathname === '/' ? 'white' : '#000000',
                    }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={twMerge(
                  'rounded-primary',
                  `${
                    router.pathname === '/'
                      ? 'bg-[#FD7770] text-white'
                      : 'border border-[#F0F0F0]'
                  }`
                )}
              >
                <Link href={'/'} passHref legacyBehavior>
                  <a
                    className={twMerge(
                      'flex items-center gap-x-[10px] rounded-primary hover:opacity-[0.85] transition-all',
                      `${router.pathname === '/' && 'bg-[#FD7770]'}`
                    )}
                  >
                    <div>
                      <img src="/images/top_bar.png" alt="Lich tot xau" />
                    </div>
                    <span className="text-base font-medium">Lịch tốt xấu</span>
                  </a>
                </Link>
              </AccordionSummary>
              <AccordionDetails className="pt-2 pl-6 pr-1">
                <div className="relative flex flex-col gap-4 pt-4 pl-4">
                  {NAVBAR_MENU.map(({ value, label, icon }) => {
                    return (
                      <button
                        key={value}
                        onClick={() => {
                          handleChangeTabHeader(value)
                          setOpenDrawer(false)
                        }}
                        className={twMerge(
                          'rounded-primary flex p-4 items-center relative',
                          `${
                            router.pathname === '/' && tabHeader === value
                              ? 'text-[#292D32] bg-[#ECECEC]'
                              : 'text-[#B0B0B0]'
                          }`
                        )}
                      >
                        <div className="mr-3">{icon}</div>
                        <span className="text-base font-medium">{label}</span>
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={() => {
                    router.push('/calendar-schedule')
                    setOpenDrawer(false)
                  }}
                  className="ml-4 mt-4 w-[170px] rounded-primary border border-[#F0F0F0] p-4 text-[#292D32]"
                >
                  Sắp đặt lịch làm việc
                </button>
              </AccordionDetails>
            </Accordion>
            <Accordion className="mt-5 rounded-primary">
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    fontSize="large"
                    sx={{
                      color:
                        router.pathname === '/tu-tru' ? 'white' : '#000000',
                    }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={twMerge(
                  'rounded-primary',
                  `${
                    router.pathname === '/tu-tru'
                      ? 'bg-[#FD7770] text-white'
                      : 'border border-[#F0F0F0]'
                  }`
                )}
              >
                {/* <Link href={'/tu-tru'} passHref legacyBehavior>
                  <a
                    className={twMerge(
                      'flex items-center gap-x-[10px] rounded-primary hover:opacity-[0.85] transition-all',
                      `${router.pathname === '/tu-tru' && 'bg-[#FD7770]'}`
                    )}
                  >
                    <div>
                      <img src="/images/second_bar.png" alt="Lich tot xau" />
                    </div>
                    <span className="text-base font-medium">Tứ trụ</span>
                  </a>
                </Link> */}
              </AccordionSummary>
              <AccordionDetails className="pt-4 pr-1"></AccordionDetails>
            </Accordion>
          </div>
        </Drawer>
      </div>
    </section>
  )
}

export default Header
