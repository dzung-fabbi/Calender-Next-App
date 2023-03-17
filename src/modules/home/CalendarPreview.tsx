import dayjs from 'dayjs'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import homeApi from '@/api/home.api'
import { BadgeDateStatus } from '@/components/badge'
import { Button } from '@/components/button'
import { ModalInformation } from '@/components/modal'
import { useToggle } from '@/hooks'
import { useStore } from '@/store/useStore'
import {
  CAN,
  DAYS,
  DIRECTIONS,
  LOWER_DAYS,
  TIETKHI,
  TIME_DATA,
} from '@/utils/constant'
import {
  addZero,
  getDayName,
  getLunarDate,
  getSunLongitude,
  getTimeInDay,
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

const initInfo = {
  good_stars: '',
  lunar_day: '',
  month: '',
  should_things: '',
  no_should_things: '',
  ugly_stars: '',
}

const initTietkhi = {
  start_time: '',
  end_time: '',
  tiet_khi: '',
}

export default function CalendarPreview() {
  const currentDate = useStore((state) => state.currentDate)
  const dayOfWeek = currentDate.day()
  const day = currentDate.format('DD')
  const month = currentDate.format('MM')
  const year = currentDate.format('YYYY')
  const currentLunarDate = getLunarDate(+day, +month, +year)
  const dayName = getDayName(currentLunarDate)
  const arrGioHD: any = getTimeInDay()
  const [info, setInfo] = useState<InfoProp>(initInfo)
  const [tietkhiInfo, setTietkhiInfo] = useState<TietkhiProp>(initTietkhi)
  const [isOpen, toggleModal] = useToggle()
  const [isOpenTuDai, toggleModalTuDai] = useToggle()
  const [chooseTime, setChooseTime] = useState<{
    name: string
    index: number
    quy_nhan: string
    am_duong: string
  }>({
    name: '',
    index: -1,
    quy_nhan: '',
    am_duong: '',
  })
  const [chooseTimeTuDai, setChooseTimeTuDai] = useState<{
    name: string
    index: number
    data: ''
  }>({
    name: '',
    index: -1,
    data: '',
  })
  const [dataHourInDays, setDataHourInDays] = useState<any>({})
  const [dataQuyNhan, setDataQuyNhan] = useState<any>([])
  const [dataTuDai, setDataTuDai] = useState<any>([])

  useEffect(() => {
    homeApi
      .getInfo(
        currentLunarDate.month,
        (dayName[0] || '').toUpperCase(),
        dayjs(
          `${currentLunarDate.year}-${currentLunarDate.month}-${currentLunarDate.day}`
        ).format('YYYY-MM-DD'),
        TIETKHI[getSunLongitude(currentLunarDate.jd + 1, 7.0)] || ''
      )
      .then((res) => {
        setInfo(res.data.hiep_ky)
        setTietkhiInfo(res.data.tiet_khi)
        setDataHourInDays(res.data.hour_in_days)
        setDataQuyNhan(res.data.quy_nhan)
        setDataTuDai(res.data.tu_dai)
      })
      .catch(() => {
        setInfo(initInfo)
        setTietkhiInfo(initTietkhi)
        setDataHourInDays({})
        setDataQuyNhan([])
        setDataTuDai([])
      })
  }, [currentDate])

  const handleClickTime = (time: string, index: number) => {
    const quynhan = dataQuyNhan.filter(
      (e: { hour: string }) => e.hour.trim() === time
    )
    setChooseTime({
      name: time,
      index,
      quy_nhan: quynhan.length > 0 && quynhan[0].quy_nhan,
      am_duong: quynhan.length > 0 && quynhan[0].am_duong,
    })
    toggleModal()
  }

  const handleClickTimeTuDai = (time: string, index: number) => {
    setChooseTimeTuDai({
      name: time,
      index,
      data: dataTuDai[index][
        `can_ngay_${
          CAN.indexOf((dayName[0] && dayName[0].split(' ')[0]) || '') + 1
        }`
      ],
    })
    toggleModalTuDai()
  }

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="calendar-preview-wrapper">
      <p className="text-xl font-bold">Lịch tháng {month}</p>
      <section className="grid items-center shadow-lg bg-[#FFF2F1] grid-cols-2 gap-10 px-5 py-4 md:px-10 xl:gap-32 2xl:gap-36 lg:py-7 lg:px-0 rounded-[20px] lg:rounded-primary lg:bg-datePreview">
        <div className="hidden lg:flex flex-col gap-y-[6px] text-center">
          <h4 className="font-medium text-[1.625rem]">
            Tháng {month} năm {year}
          </h4>
          <div className="mx-auto">
            <h1 className="font-bold text-[8.75rem] text-primary leading-none relative w-fit">
              {day}
              <div className="absolute left-full top-0 rotate-[-31.24deg]">
                <BadgeDateStatus isBeatifulDay>Ngày Cực Tốt</BadgeDateStatus>
              </div>
            </h1>
          </div>

          <span className="uppercase font-semibold text-[1.625rem]">
            {DAYS[dayOfWeek]}
          </span>
        </div>
        <div className="z-10 flex flex-col flex-1 col-span-full lg:col-span-1">
          <div className="hidden lg:flex">
            <div className="flex flex-col w-2/5">
              <h1 className="font-bold text-[5rem] leading-none text-left text-orange-primary">
                {addZero(currentLunarDate.day)}
              </h1>
              <span className="font-semibold text-left">
                Tháng {addZero(currentLunarDate.month)}{' '}
                {currentLunarDate.leap === 1 && 'Nhuận'} (Âm Lịch)
              </span>
            </div>
            <div className="flex flex-col justify-end flex-1 gap-y-1.5">
              <span className="font-medium text-left">Năm {dayName[2]}</span>
              <span className="font-medium text-left">Ngày {dayName[0]}</span>
              <span className="font-medium text-left">Tháng {dayName[1]}</span>
            </div>
          </div>

          <div className="flex flex-col lg:hidden">
            <span className="font-semibold leading-tight capitalize">
              {LOWER_DAYS[dayOfWeek]}
            </span>
            <span className="text-2xl font-medium leading-tight capitalize text-primary">{`${day} Tháng ${month} `}</span>
            <span className="relative font-medium leading-tight capitalize w-fit">
              {`${addZero(currentLunarDate.day)} Tháng ${addZero(
                currentLunarDate.month
              )}, ${dayName[2]}`}
              <div className="absolute left-full translate-x-4 -top-5 rotate-[-27.42deg]">
                <BadgeDateStatus>Ngày Xấu</BadgeDateStatus>
              </div>
            </span>
          </div>

          <ul className="flex pt-5">
            <li className="w-2/5">
              Ngày:
              <span className="font-semibold text-left">{dayName[0]}</span>
            </li>
            <li>
              Tháng:
              <span className="font-semibold text-left">{dayName[1]}</span>
            </li>
          </ul>
          <ul className="flex">
            <li className="w-2/5">
              Năm: <span className="font-semibold text-left">{dayName[2]}</span>
            </li>
            <li>
              Tiết:
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
      <section className="bg-[#FFFAF9] mt-30px rounded-[20px] lg:rounded-primary">
        <div className="bg-primary rounded-t-[20px] lg:rounded-t-primary text-lg font-semibold py-2.5 pl-5 text-white">
          Giờ trong ngày
        </div>
        <div className="px-6 pb-6 lg:px-30px lg:pb-0">
          <div className="grid grid-cols-2 gap-x-6 lg:grid-cols-3 lg:gap-0">
            {Array.from(Array(12).keys()).map((e: number) => {
              return (
                <div
                  key={e}
                  className={twMerge(
                    'flex items-center py-4 pb-2 lg:pb-4 gap-2.5 border-b border-[#CBE1FD] lg:border-[#E2E2E2] xl:px-5 cursor-pointer',
                    [9, 10, 11].includes(e) && 'lg:border-b-0'
                  )}
                  onClick={() => handleClickTime(arrGioHD[e].name, e)}
                >
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
      {dataTuDai.length ? (
        <section className="bg-[#FFFAF9] mt-30px rounded-[20px] lg:rounded-primary">
          <div className="bg-primary rounded-t-[20px] lg:rounded-t-primary text-lg font-semibold py-2.5 pl-5 text-white">
            Tứ đại cát thời
          </div>
          <div className="px-6 pb-6 lg:px-30px lg:pb-0">
            <div className="grid grid-cols-2 gap-x-6 lg:gap-0">
              {Array.from(Array(4).keys()).map((e: number) => {
                return (
                  <div
                    key={e}
                    className={twMerge(
                      'flex items-center py-4 pb-2 lg:pb-4 gap-2.5 border-b border-[#CBE1FD] lg:border-[#E2E2E2] xl:px-5 cursor-pointer',
                      [9, 10, 11].includes(e) && 'lg:border-b-0'
                    )}
                    onClick={() => handleClickTimeTuDai(dataTuDai[e].hour, e)}
                  >
                    <img
                      src={TIME_DATA[dataTuDai[e].hour].img}
                      alt=""
                      className=""
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-left">
                        {dataTuDai[e].hour}
                      </span>
                      <span>{TIME_DATA[dataTuDai[e].hour].time}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}
      <section className="bg-[#FFFAF9] mt-30px rounded-[20px] lg:rounded-primary">
        <div className="bg-primary rounded-t-[20px] lg:rounded-t-primary text-lg font-semibold py-2.5 pl-5 text-white">
          Sao tốt xấu
        </div>
        <div className="flex flex-col p-5">
          <div className="flex items-center mb-4">
            <div className="border-left-infor good flex leading-[16.94px] mr-2 font-semibold text-primary">
              <div className="py-3 pl-3">
                Sao tốt:
                <span className="ml-1 text-sm font-normal text-blue-tag">
                  {info.good_stars}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="border-left-infor ugly flex leading-[16.94px] mr-2 font-semibold">
              <div className="py-3 pl-3">
                Sao xấu:
                <span className="ml-1 text-sm font-normal text-blue-tag">
                  {info.ugly_stars}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#FFFAF9] mt-30px rounded-[20px] lg:rounded-primary">
        <div className="bg-primary rounded-t-[20px] lg:rounded-t-primary text-lg font-semibold py-2.5 pl-5 text-white">
          Việc nên - Không nên làm
        </div>
        <div className="flex flex-col p-5">
          <div className="flex items-center mb-4">
            <div className="border-left-infor good flex leading-[16.94px] mr-2 font-semibold text-primary">
              <div className="py-3 pl-3">
                Nên:
                <span className="ml-1 text-sm font-normal text-gray-primary">
                  {info.should_things}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="border-left-infor ugly flex leading-[16.94px] mr-2 font-semibold">
              <div className="py-3 pl-3">
                Không nên:
                <span className="ml-1 text-sm font-normal text-gray-primary">
                  {info.no_should_things}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalInformation
        isOpen={isOpen}
        toggleModal={toggleModal}
        titleModal={`Giờ ${chooseTime.name}`}
      >
        <div>
          Sao:{' '}
          {dataHourInDays[`hour_${chooseTime.index + 1}`] &&
            dataHourInDays[`hour_${chooseTime.index + 1}`].replaceAll(
              '\n',
              ', '
            )}
        </div>
        {chooseTime.quy_nhan ? (
          <>
            <div>{`${chooseTime.am_duong} : ${chooseTime.quy_nhan}`}</div>
            <div>Hướng: {DIRECTIONS[chooseTime.quy_nhan]}</div>
          </>
        ) : null}
        <div className="flex items-center justify-end mt-5 gap-x-4">
          <Button primary onClick={toggleModal} className="h-[3.5rem]">
            OK
          </Button>
        </div>
      </ModalInformation>
      <ModalInformation
        isOpen={isOpenTuDai}
        toggleModal={toggleModalTuDai}
        titleModal={`Giờ ${chooseTimeTuDai.name}`}
      >
        <div>{chooseTimeTuDai.data}</div>
        <div className="flex items-center justify-end mt-5 gap-x-4">
          <Button primary onClick={toggleModalTuDai} className="h-[3.5rem]">
            OK
          </Button>
        </div>
      </ModalInformation>
    </div>
  )
}
