import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Drawer,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useToggle } from '@/hooks'
import { useStore } from '@/store/useStore'
import { MODE_TAB_HEADER } from '@/utils/constant'

import Button from '../button/ButtonPrimary'
import { CalendarHeader, ConvertCalendar, IconDown2 } from '../icon'
import { ModalLogin } from '../modal'

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
const CALLBACK_URL_LOGIN = `${process.env.NEXTAUTH_URL}`
function Header() {
  const router = useRouter()
  const tabHeader = useStore((state) => state.tabHeader)
  const [openDrawer, setOpenDrawer] = useToggle(false)
  const [openModalLogin, toggleModalLogin] = useToggle(false)
  const onChangeTab = useStore((state) => state.setTabHeader)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const { data: session } = useSession()
  const settings = [
    {
      name: 'Xem thông tin cá nhân',
      onSubmit: () => router.push('/profile'),
    },
    {
      name: 'Đăng Nhập Lại',
      onSubmit: toggleModalLogin,
    },
    {
      name: 'Đăng Xuất',
      onSubmit: () => signOut(),
    },
  ]
  const handleChangeTabHeader = (newTab: number) => {
    onChangeTab(newTab)
    if (router.pathname !== '/') router.push('/')
  }

  const handleSubmitLogin = (type: 'facebook' | 'google') => {
    if (type === 'google') signIn('google', { callbackUrl: CALLBACK_URL_LOGIN })
    else {
      signIn('facebook', { callbackUrl: CALLBACK_URL_LOGIN })
    }
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
      <div className="hidden gap-x-4 md:flex md:items-stretch">
        <Button onClick={() => router.push('/calendar-schedule')} primary>
          Sắp đặt lịch làm việc
        </Button>
        {session?.user ? (
          <Box>
            <Tooltip title={`${session.user.name}`}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  ':hover': {
                    opacity: 0.8,
                  },
                  transition: 'all ease 0.2s',
                }}
                onClick={handleOpenUserMenu}
              >
                <Avatar
                  alt="Avatar"
                  src={session.user.image || '/apple-touch-icon.png'}
                  sx={{ width: 45, height: 45, mr: 1 }}
                />
                <IconDown2 />
              </Box>
            </Tooltip>
            <Menu
              sx={{ mt: 6 }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              disableScrollLock={true}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ name, onSubmit }) => (
                <MenuItem key={name} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={onSubmit}
                    sx={{
                      transition: 'all ease 0.2s',
                      '&:hover': { color: '#F96A2D' },
                    }}
                  >
                    {name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : (
          <Button onClick={toggleModalLogin}>Đăng Nhập</Button>
        )}

        <ModalLogin
          isOpen={openModalLogin}
          toggleModal={toggleModalLogin}
          onSubmit={handleSubmitLogin}
        />
      </div>
      <div className="w-full xs:flex md:hidden">
        <button onClick={() => setOpenDrawer()} className="grow">
          <img src="/images/menu.png" alt="" />
        </button>

        {session && (
          <Avatar
            alt="Avatar"
            src={session.user?.image || '/apple-touch-icon.png'}
            sx={{ width: 45, height: 45, mr: 1 }}
          />
        )}
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
          </div>
        </Drawer>
      </div>
    </section>
  )
}

export default Header
