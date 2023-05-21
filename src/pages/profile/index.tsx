import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import type { ReactElement } from 'react'

import ButtonRegisteMember from '@/components/button/ButtonRegisteMember'
import { InputProfile } from '@/components/input'
import { Main } from '@/layouts/Main'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'

const Profile: NextPageWithLayout = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const handleRedirectToCheckout = () => router.push('/checkout')
  return (
    <section>
      <h3 className="text-2xl font-bold text-primary">Thông tin cá nhân</h3>
      <p className="text-lg mt-2.5">
        Cập nhật đầy đủ thông tin của bạn để hoạt động tốt hơn
      </p>
      <div className="mt-8 xs:p-5 lg:p-10 xl:p-12 bg-[#F8F9FF] rounded-primary shadow-lg max-w-4xl">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="mx-auto mt-4 rounded-3xl w-28 h-28">
            <img
              src={session?.user.image || undefined}
              alt="Anh dai dien"
              className="object-cover w-full h-full rounded-3xl"
            />
          </div>
          <div className="flex flex-col gap-6">
            <InputProfile
              name="fullname"
              value={session?.user.name || ''}
              disabled
            >
              <div className="absolute right-0 p-3 -translate-y-1/2 top-1/2">
                <AccountCircleOutlinedIcon
                  sx={{ width: '30px', height: '30px', color: 'gray' }}
                />
              </div>
            </InputProfile>
            <InputProfile
              name="email"
              value={session?.user.email || ''}
              disabled
            >
              <div className="absolute right-0 p-3 -translate-y-1/2 top-1/2">
                <MailOutlinedIcon
                  sx={{ width: '30px', height: '30px', color: 'gray' }}
                />
              </div>
            </InputProfile>
            <div>
              <p>
                Bạn chưa đăng kí thành viên,{' '}
                <Link href="/checkout" passHref legacyBehavior>
                  <a className="text-primary">đăng kí ngay</a>
                </Link>
                !!!
              </p>
              <ButtonRegisteMember
                className="w-full mt-4 h-14"
                primary
                onClick={handleRedirectToCheckout}
              >
                Đăng Kí Ngay
              </ButtonRegisteMember>
            </div>
            <div>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <Main
      meta={<Meta title="Thông tin cá nhân" description="Thông tin cá nhân" />}
      isCalendar={false}
    >
      {page}
    </Main>
  )
}

export default Profile
