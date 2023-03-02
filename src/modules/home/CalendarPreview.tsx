import dayjs from 'dayjs'
import * as React from 'react'
import { useEffect, useState } from 'react'

import homeApi from '@/api/home.api'
import { BadgeDateStatus } from '@/components/badge'
import { useStore } from '@/store/useStore'
import { DAYS, TIETKHI } from '@/utils/constant'
import {
  addZero,
  getDayName,
  getGioHoangDao,
  getLunarDate,
  getSunLongitude,
} from '@/utils/helpers'

interface InfoProp {
  good_stars: string
  lunar_day: string
  month: number | string
  no_should_things: string
  should_things: string
  ugly_stars: string
}

interface TietkhiProp {
  start_time: string
  end_time: string
  tiet_khi: string
}

export default function CalendarPreview() {
  const currentDate = useStore((state) => state.currentDate)
  const dayOfWeek = currentDate.day()
  const day = currentDate.format('DD')
  const month = currentDate.format('MM')
  const year = currentDate.format('YYYY')
  const currentLunarDate = getLunarDate(+day, +month, +year)
  const dayName = getDayName(currentLunarDate)
  const arrGioHD: any = getGioHoangDao(currentLunarDate.jd)
  const [info, setInfo] = useState<InfoProp>({
    good_stars: '',
    lunar_day: '',
    month: '',
    should_things: '',
    no_should_things: '',
    ugly_stars: '',
  })
  const [tietkhiInfo, setTietkhiInfo] = useState<TietkhiProp>({
    start_time: '',
    end_time: '',
    tiet_khi: '',
  })

  useEffect(() => {
    homeApi
      .getInfo(
        currentLunarDate.month,
        (dayName[0] || '').toUpperCase(),
        `${currentLunarDate.year}-${currentLunarDate.month}-${currentLunarDate.day}`
      )
      .then((res) => {
        setInfo(res.data.hiep_ky)
        setTietkhiInfo(res.data.tiet_khi)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [currentDate])

  return (
    <div>
      <p className="text-xl font-bold">Lịch tháng {month}</p>
      <section className="flex items-center py-7 rounded-primary bg-datePreview">
        <div className="w-5/12 flex flex-col gap-y-[6px] relative">
          <h4 className="font-medium text-[1.625rem] text-center">
            Tháng {month} năm {year}
          </h4>
          <h1 className="font-bold text-[8.75rem] text-primary leading-none text-center relative">
            {day}
            <div className="absolute left-2/3 top-0 rotate-[-31.24deg]">
              <BadgeDateStatus />
            </div>
          </h1>

          <span className="uppercase font-semibold text-[1.625rem] text-center">
            {DAYS[dayOfWeek]}
          </span>
        </div>
        <div className="w-1/6"></div>
        <div className="flex flex-col flex-1 w-5/12">
          <div className="flex">
            <div className="flex flex-col w-2/5">
              <h1 className="font-bold text-[5rem] leading-none text-left text-orange-primary">
                {addZero(currentLunarDate.day)}
              </h1>
              <span className="font-semibold text-left">
                Tháng {addZero(currentLunarDate.month)}{' '}
                {currentLunarDate.leap === 1 && 'Nhuận'} (Âm Lịch)
              </span>
            </div>
            <div className="flex flex-col justify-end flex-1">
              <span className="font-semibold text-left">Năm {dayName[2]}</span>
              <span className="font-semibold text-left">Ngày {dayName[0]}</span>
              <span className="font-semibold text-left">
                Tháng {dayName[1]}
              </span>
            </div>
          </div>
          <ul className="flex pt-5">
            <li className="w-2/5">
              Ngày:{' '}
              <span className="font-semibold text-left">{dayName[0]}</span>
            </li>
            <li>
              Tháng:{' '}
              <span className="font-semibold text-left">{dayName[1]}</span>
            </li>
          </ul>
          <ul className="flex">
            <li className="w-2/5">
              Năm: <span className="font-semibold text-left">{dayName[2]}</span>
            </li>
            <li>
              Tiết:{' '}
              <span className="font-semibold text-left">
                {TIETKHI[getSunLongitude(currentLunarDate.jd + 1, 7.0)]}
              </span>
            </li>
          </ul>
          <ul className="flex">
            <li>
              Ngày khởi tiết:{' '}
              <span className="font-semibold text-left">
                {tietkhiInfo.start_time &&
                  dayjs(tietkhiInfo.start_time).format('HH:mm')}{' '}
                {tietkhiInfo.start_time &&
                  `ngày ${dayjs(tietkhiInfo.start_time).format('DD/MM/YYYY')}`}
              </span>
            </li>
          </ul>
          <ul className="flex">
            <li>
              Ngày chuyển tiết:{' '}
              <span className="font-semibold text-left">
                {tietkhiInfo.end_time &&
                  dayjs(tietkhiInfo.end_time)
                    .add(1, 'minutes')
                    .format('HH:mm')}{' '}
                {tietkhiInfo.end_time &&
                  `ngày ${dayjs(tietkhiInfo.end_time)
                    .add(1, 'minutes')
                    .format('DD/MM/YYYY')}`}
              </span>
            </li>
          </ul>
        </div>
      </section>
      <section className="bg-[#FFFAF9] mt-30px rounded-primary">
        <div className="bg-primary rounded-t-primary py-[10px] pl-5 text-white">
          Giờ tốt trong ngày
        </div>
        <div className="px-[30px]">
          <div className="flex pl-5 border-b border-[#E2E2E2]">
            {[0, 1, 2].map((e: number) => {
              return (
                <div key={e} className="flex items-center w-1/3 py-4 gap-2.5">
                  <img src={arrGioHD[e].img} alt="" className="" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-left">
                      {arrGioHD[e].name}
                    </span>
                    <span>{arrGioHD[e].time}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex pl-5">
            {[3, 4, 5].map((e: number) => {
              return (
                <div key={e} className="flex items-center w-1/3 py-4 gap-2.5">
                  <img src={arrGioHD[e].img} alt="" className="" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-left">
                      {arrGioHD[e].name}
                    </span>
                    <span>{arrGioHD[e].time}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section className="bg-[#F2F7FC] mt-30px rounded-primary">
        <div className="bg-[#B9CBDC] rounded-t-primary py-[10px] pl-5 text-black">
          Giờ Xấu trong ngày
        </div>
        <div className="px-[30px]">
          <div className="flex pl-5 border-b border-[#E2E2E2]">
            <div className="flex items-center w-1/3 py-4 gap-2.5">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
            <div className="flex items-center w-1/3 py-4 gap-2.5">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
            <div className="flex items-center w-1/3 py-4 gap-2.5">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
          </div>
          <div className="flex pl-5">
            <div className="flex items-center w-1/3 py-4 gap-2.5">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
            <div className="flex items-center w-1/3 py-4 gap-2.5">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
            <div className="flex items-center w-1/3 py-4 gap-2.5">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#FFFAF9] mt-30px rounded-primary">
        <div className=" bg-primary rounded-t-primary py-[10px] pl-5 text-white">
          Sao tốt xấu
        </div>
        <div className="flex flex-col p-5">
          <div className="flex items-center mb-4">
            <div className="border-left-infor good flex leading-[16.94px] mr-2 font-semibold text-primary">
              <div className="pl-3 py-3">
                Sao tốt:
                <span className="text-sm text-blue-tag ml-1 font-normal">
                  {info.good_stars}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="border-left-infor ugly flex leading-[16.94px] mr-2 font-semibold">
              <div className="pl-3 py-3">
                Sao xấu:
                <span className="text-sm text-blue-tag ml-1 font-normal">
                  {info.ugly_stars}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#FFFAF9] mt-30px rounded-primary">
        <div className="bg-primary rounded-t-primary py-[10px] pl-5 text-white">
          Việc nên - Không nên làm
        </div>
        <div className="flex flex-col p-5">
          <div className="flex items-center mb-4">
            <div className="border-left-infor good flex leading-[16.94px] mr-2 font-semibold text-primary">
              <div className="pl-3 py-3">
                Nên:
                <span className="text-sm font-normal text-gray-primary ml-1">
                  {info.should_things}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="border-left-infor ugly flex leading-[16.94px] mr-2 font-semibold">
              <div className="pl-3 py-3">
                Không nên:
                <span className="text-sm font-normal text-gray-primary ml-1">
                  {info.no_should_things}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
