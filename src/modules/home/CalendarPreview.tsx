import clsx from 'clsx'
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
  PART_HOURS,
  TIETKHI,
  TIME_DATA,
} from '@/utils/constant'
import {
  addZero,
  getDayName,
  getLunarDate,
  getSunLongitude,
  getTextDay,
  getTimeInDay,
} from '@/utils/helpers'

interface InfoProp {
  good_stars: object
  lunar_day: string
  month: number | string
  no_should_things: string
  should_things: string
  ugly_stars: object
}

interface TietkhiProp {
  start_time: string
  end_time: string
  tiet_khi: string
}

const initInfo = {
  good_stars: [],
  lunar_day: '',
  month: '',
  should_things: '',
  no_should_things: '',
  ugly_stars: [],
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
  const [dataHourInDays, setDataHourInDays] = useState<any>({})
  const [dataQuyNhan, setDataQuyNhan] = useState<any>([])
  const [dataTuDai, setDataTuDai] = useState<any>([])
  const [isOpen, toggleModal] = useToggle()
  const [chooseStars, setChooseStars] = useState<{
    name: string
    data: string
  }>({
    name: '',
    data: '',
  })

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

  const textDay = getTextDay(info.should_things, info.no_should_things)

  const getInfoByHour = (time: string) => {
    const quyNhan = dataQuyNhan.find(
      (e: { hour: string }) => e.hour.trim() === time
    )
    return (
      quyNhan && (
        <>
          <div>{`Giờ quý nhân đăng thiên môn : ${quyNhan?.am_duong} nhân ${
            quyNhan?.quy_nhan
          } (${PART_HOURS[quyNhan?.quy_nhan]})`}</div>
          <div>Hướng: {DIRECTIONS[quyNhan?.quy_nhan]}</div>
        </>
      )
    )
  }

  const getSaoTuDai = (index: number) => {
    const data =
      dataTuDai[index][
        `can_ngay_${
          CAN.indexOf((dayName[0] && dayName[0].split(' ')[0]) || '') + 1
        }`
      ]
    return <>Sao: {data}</>
  }

  const jsUcfirst = (string: string) => {
    const tmp = string.toLowerCase()
    return tmp.charAt(0).toUpperCase() + tmp.slice(1)
  }

  const handleClickStars = (el: { name: string; property: string }) => {
    setChooseStars({
      name: el?.name || '',
      data: el?.property || '',
    })
    toggleModal()
  }

  const showGoodStars = (goodStars: any) => {
    if (!goodStars) return null
    return (
      <>
        {goodStars.map((el: any, ab: number) => {
          if (ab === goodStars.length - 1) {
            return (
              // eslint-disable-next-line react/jsx-key
              <span onClick={() => handleClickStars(el)}>
                {jsUcfirst(el?.name)}
              </span>
            )
          }
          return (
            // eslint-disable-next-line react/jsx-key
            <span onClick={() => handleClickStars(el)}>
              {`${jsUcfirst(el?.name)}, `}
            </span>
          )
        })}
      </>
    )
  }

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="calendar-preview-wrapper">
      <p className="text-xl font-bold">Lịch tháng {month}</p>
      <section className="grid grid-cols-2 items-center gap-10 rounded-[20px] bg-[#FFF2F1] px-5 py-4 shadow-lg md:px-10 lg:rounded-primary lg:bg-datePreview lg:py-7 lg:px-0 xl:gap-32 2xl:gap-36">
        <div className="hidden flex-col gap-y-[6px] text-center lg:flex">
          <h4 className="text-[1.625rem] font-medium">
            Tháng {month} năm {year}
          </h4>
          <div className="mx-auto">
            <h1 className="relative w-fit text-[8.75rem] font-bold leading-none text-primary">
              {day}
              <div
                className={clsx(
                  'absolute left-full top-0',
                  textDay.is_good && 'rotate-[-31.24deg]'
                )}
              >
                <BadgeDateStatus isBeatifulDay={textDay.is_good}>
                  {textDay.text}
                </BadgeDateStatus>
              </div>
            </h1>
          </div>

          <span className="text-[1.625rem] font-semibold uppercase">
            {DAYS[dayOfWeek]}
          </span>
        </div>
        <div className="z-10 flex flex-col flex-1 col-span-full lg:col-span-1">
          <div className="hidden lg:flex">
            <div className="flex flex-col w-2/5">
              <h1 className="text-left text-[5rem] font-bold leading-none text-orange-primary">
                {addZero(currentLunarDate.day)}
              </h1>
              <span className="font-semibold text-left">
                Tháng {addZero(currentLunarDate.month)}{' '}
                {currentLunarDate.leap === 1 && 'Nhuận'} (Âm Lịch)
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-end gap-y-1.5">
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
              <div className="absolute left-full -top-5 translate-x-4 rotate-[-27.42deg]">
                <BadgeDateStatus isBeatifulDay={textDay.is_good}>
                  {textDay.text}
                </BadgeDateStatus>
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
      <section className="mt-30px rounded-[20px] bg-[#FFFAF9] lg:rounded-primary">
        <div className="rounded-t-[20px] bg-primary py-2.5 pl-5 text-lg font-semibold text-white lg:rounded-t-primary">
          Sao tốt xấu
        </div>
        <div className="flex flex-col p-5">
          <div className="flex items-center mb-4">
            <div className="border-left-infor good mr-2 flex font-semibold leading-[16.94px] text-primary">
              <div className="py-3 pl-3">
                Sao tốt:
                <span className="text-red-tag ml-1 text-sm font-normal">
                  {showGoodStars(info.good_stars)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="border-left-infor ugly mr-2 flex font-semibold leading-[16.94px]">
              <div className="py-3 pl-3">
                Sao xấu:
                <span className="ml-1 text-sm font-normal">
                  {showGoodStars(info.ugly_stars)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-30px rounded-[20px] bg-[#FFFAF9] lg:rounded-primary">
        <div className="rounded-t-[20px] bg-primary py-2.5 pl-5 text-lg font-semibold text-white lg:rounded-t-primary">
          Việc nên - Không nên làm
        </div>
        <div className="flex flex-col p-5">
          <div className="flex items-center mb-4">
            <div className="border-left-infor good mr-2 flex font-semibold leading-[16.94px] text-primary">
              <div className="py-3 pl-3">
                Nên:
                <span className="text-red-primary ml-1 text-sm font-normal">
                  {info.should_things}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="border-left-infor ugly mr-2 flex font-semibold leading-[16.94px]">
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
      <section className="mt-30px rounded-[20px] bg-[#FFFAF9] lg:rounded-primary">
        <div className="rounded-t-[20px] bg-primary py-2.5 pl-5 text-lg font-semibold text-white lg:rounded-t-primary">
          Giờ trong ngày
        </div>
        <div className="px-6 pb-6 lg:px-30px lg:pb-0">
          <div className="grid gap-x-6 lg:gap-0">
            {Array.from(Array(12).keys()).map((e: number) => {
              return (
                <div
                  key={e}
                  className={twMerge(
                    'flex py-4 items-center pb-2 lg:pb-4 border-b border-[#CBE1FD] lg:border-[#E2E2E2] xl:px-5 cursor-pointer',
                    [11].includes(e) && 'lg:border-b-0'
                  )}
                >
                  <div className="flex w-1/2 shrink-0 items-center gap-2.5 border-r lg:w-48">
                    <div className="w-10 h-10">
                      <img
                        src={arrGioHD[e].img}
                        alt="icon"
                        className="object-cover w-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-left">
                        {arrGioHD[e].name}
                      </span>
                      <span>{arrGioHD[e].time}</span>
                    </div>
                  </div>
                  <div className="pl-8 grow lg:pl-10">
                    <div>
                      Sao:{' '}
                      {dataHourInDays[`hour_${e + 1}`] &&
                        dataHourInDays[`hour_${e + 1}`].map(
                          (el: any, ab: number) => {
                            if (
                              ab ===
                              dataHourInDays[`hour_${e + 1}`].length - 1
                            ) {
                              if (el.good_ugly_stars === 1) {
                                return (
                                  // eslint-disable-next-line react/jsx-key
                                  <span
                                    onClick={() => handleClickStars(el)}
                                    className="text-red-tag text-red-primary text-primary"
                                  >
                                    {jsUcfirst(el?.name)}
                                  </span>
                                )
                              }
                              return (
                                // eslint-disable-next-line react/jsx-key
                                <span onClick={() => handleClickStars(el)}>
                                  {jsUcfirst(el?.name)}
                                </span>
                              )
                            }
                            if (el.good_ugly_stars === 1) {
                              return (
                                // eslint-disable-next-line react/jsx-key
                                <span
                                  onClick={() => handleClickStars(el)}
                                  className="text-red-tag text-red-primary text-primary"
                                >
                                  {`${jsUcfirst(el?.name)}, `}
                                </span>
                              )
                            }
                            return (
                              // eslint-disable-next-line react/jsx-key
                              <span onClick={() => handleClickStars(el)}>
                                {`${jsUcfirst(el?.name)}, `}
                              </span>
                            )
                          }
                        )}
                    </div>
                    {getInfoByHour(arrGioHD[e].name)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      {dataTuDai.length ? (
        <section className="mt-30px rounded-[20px] bg-[#FFFAF9] lg:rounded-primary">
          <div className="rounded-t-[20px] bg-primary py-2.5 pl-5 text-lg font-semibold text-white lg:rounded-t-primary">
            Tứ đại cát thời
          </div>
          <div className="px-6 pb-6 lg:px-30px lg:pb-0">
            <div className="grid gap-x-6 lg:gap-0">
              {Array.from(Array(4).keys()).map((e: number) => {
                return (
                  <div
                    key={e}
                    className={twMerge(
                      'flex py-4 items-center pb-2 lg:pb-4 border-b border-[#CBE1FD] lg:border-[#E2E2E2] xl:px-5 cursor-pointer',
                      [3].includes(e) && 'lg:border-b-0'
                    )}
                  >
                    <div className="flex w-1/2 shrink-0 items-center gap-2.5 border-r lg:w-48">
                      <div className="w-10 h-10">
                        <img
                          src={TIME_DATA[dataTuDai[e].hour].img}
                          alt=""
                          className="object-cover w-full"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="font-semibold text-left">
                          {dataTuDai[e].hour}
                        </span>
                        <span>{TIME_DATA[dataTuDai[e].hour].time}</span>
                      </div>
                    </div>
                    <div className="pl-8 grow lg:pl-10">{getSaoTuDai(e)}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      <ModalInformation
        isOpen={isOpen}
        toggleModal={toggleModal}
        titleModal={`Sao ${jsUcfirst(chooseStars.name)}`}
      >
        <div>{chooseStars.data}</div>
        <div className="flex items-center justify-end mt-5 gap-x-4">
          <Button
            primary
            onClick={toggleModal}
            className="h-[2.5rem] pt-2 w-[2.5rem]"
          >
            OK
          </Button>
        </div>
      </ModalInformation>
    </div>
  )
}
