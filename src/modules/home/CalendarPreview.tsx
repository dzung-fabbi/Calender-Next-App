import dayjs from 'dayjs'
// eslint-disable-next-line import/no-extraneous-dependencies
import { map } from 'lodash'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import homeApi from '@/api/home.api'
import { BadgeDateStatus } from '@/components/badge'
import BadgeHourStatus from '@/components/badge/BadgeHourStatus'
import { Button } from '@/components/button'
import { ModalInformation } from '@/components/modal'
import { useToggle } from '@/hooks'
import { useStore } from '@/store/useStore'
import {
  DAYS,
  DIRECTIONS,
  LOWER_DAYS,
  PART_HOURS,
  TIETKHI,
} from '@/utils/constant'
import {
  addZero,
  getDayName,
  getLunarDate,
  getSunLongitude,
  getTextDay,
  getTextHour,
  getTimeInDay,
  jsUcfirst,
} from '@/utils/helpers'

interface InfoProp {
  good_stars: any
  lunar_day: string
  month: number | string
  no_should_things: string
  should_things: string
  ugly_stars: any
}

interface TietKhiProp {
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

const initTietKhi = {
  start_time: '',
  end_time: '',
  tiet_khi: '',
}

export default function CalendarPreview(props: any) {
  const currentDate = useStore((state) => state.currentDate)
  const onChangeCurrentDate = useStore((state) => state.setCurrentDate)
  const dayOfWeek = currentDate.day()
  const day = currentDate.format('DD')
  const month = currentDate.format('MM')
  const year = currentDate.format('YYYY')
  const currentLunarDate = getLunarDate(+day, +month, +year)
  const dayName = getDayName(currentLunarDate)
  const arrGioHD: any = getTimeInDay()
  const [info, setInfo] = useState<InfoProp>(initInfo)
  const [tietKhiInfo, setTietKhiInfo] = useState<TietKhiProp>(initTietKhi)
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
    if (props.day) {
      onChangeCurrentDate(dayjs(new Date(props.day)))
    }
  }, [props.day])

  useEffect(() => {
    homeApi
      .getInfo(
        currentLunarDate.month,
        (dayName[0] || '').toUpperCase(),
        dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DD'),
        TIETKHI[getSunLongitude(currentLunarDate.jd + 1, 7.0)] || ''
      )
      .then((res) => {
        setInfo(res.data.hiep_ky)
        setTietKhiInfo(res.data.tiet_khi)
        setDataHourInDays(res.data.hour_in_days)
        setDataQuyNhan(res.data.quy_nhan)
        setDataTuDai(res.data.tu_dai)
      })
      .catch(() => {
        setInfo(initInfo)
        setTietKhiInfo(initTietKhi)
        setDataHourInDays({})
        setDataQuyNhan([])
        setDataTuDai([])
      })
  }, [currentDate])

  const textDay = getTextDay(
    info.should_things,
    info.no_should_things,
    map(info.good_stars, 'name').join(','),
    map(info.ugly_stars, 'name').join(',')
  )

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

  const handleClickStars = (el: { name: string; property: string }) => {
    setChooseStars({
      name: el?.name || '',
      data: el?.property || '',
    })
    toggleModal()
  }

  const getSaoTuDai = (hour: string) => {
    let tudai = dataTuDai.filter(
      (el: any) => dayName[0] && el.can_ngay === dayName[0].split(' ')[0]
    )
    tudai = tudai.find((el: any) => el.hour === hour)

    return (
      <>
        {tudai && tudai.sao.length > 0 && ','}&nbsp;
        {tudai &&
          tudai.sao.length > 0 &&
          tudai.sao.map((el: any, ab: number) => {
            if (ab === tudai.sao.length - 1) {
              if (el.good_ugly_stars === 1) {
                return (
                  <span
                    key={ab}
                    onClick={() => handleClickStars(el)}
                    className="text-red-tag text-red-primary text-primary"
                  >
                    {jsUcfirst(el?.name)} (Tứ đại cát thời)
                  </span>
                )
              }
              return (
                <span key={ab} onClick={() => handleClickStars(el)}>
                  {jsUcfirst(el?.name)} (Tứ đại cát thời)
                </span>
              )
            }
            if (el.good_ugly_stars === 1) {
              return (
                <>
                  <span
                    onClick={() => handleClickStars(el)}
                    className="text-red-tag text-red-primary text-primary"
                  >
                    {`${jsUcfirst(el?.name)} (Tứ đại cát thời)`}
                  </span>
                  ,&nbsp;
                </>
              )
            }
            return (
              <>
                <span onClick={() => handleClickStars(el)}>
                  {`${jsUcfirst(el?.name)} (Tứ đại cát thời)`}
                </span>
                ,&nbsp;
              </>
            )
          })}
      </>
    )
  }

  const showGoodStars = (goodStars: any) => {
    if (!goodStars) return null
    return (
      <>
        {goodStars.map((el: any, ab: number) => {
          if (ab === goodStars.length - 1) {
            return (
              // eslint-disable-next-line react/jsx-key
              <span
                className="cursor-pointer"
                onClick={() => handleClickStars(el)}
              >
                {jsUcfirst(el?.name)}
              </span>
            )
          }
          return (
            // eslint-disable-next-line react/jsx-key
            <span
              className="cursor-pointer"
              onClick={() => handleClickStars(el)}
            >
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
              <div className="absolute left-full top-0 rotate-[-31.24deg]">
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
                {tietKhiInfo.start_time &&
                  dayjs(tietKhiInfo.start_time).format('HH:mm')}{' '}
                {tietKhiInfo.start_time &&
                  `ngày ${dayjs(tietKhiInfo.start_time).format('DD/MM/YYYY')}`}
              </span>
            </li>
          </ul>
          <ul className="flex">
            <li>
              Ngày chuyển tiết:{' '}
              <span className="font-semibold text-left">
                {tietKhiInfo.end_time &&
                  dayjs(tietKhiInfo.end_time)
                    .add(1, 'minutes')
                    .format('HH:mm')}{' '}
                {tietKhiInfo.end_time &&
                  `ngày ${dayjs(tietKhiInfo.end_time)
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
              const textHour: any = getTextHour(
                e + 1,
                arrGioHD[e].name,
                dataHourInDays,
                dataQuyNhan,
                dataTuDai,
                (dayName[0] || '').split('')[0] || ''
              )
              return (
                <div
                  key={e}
                  className={twMerge(
                    'flex py-4 items-center pb-2 lg:pb-4 border-b border-[#CBE1FD] lg:border-[#E2E2E2] xl:px-5 cursor-pointer',
                    [11].includes(e) && 'lg:border-b-0'
                  )}
                >
                  <div className="flex w-1/2 shrink-0 items-center gap-2.5 border-r lg:w-48 relative">
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
                    <div className="absolute left-[80px] lg:left-[100px] top-[-5px] rotate-[-10deg]">
                      <BadgeHourStatus isBeatifulDay={textHour.is_good}>
                        {textHour.text}
                      </BadgeHourStatus>
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
                                  <span
                                    key={ab}
                                    onClick={() => handleClickStars(el)}
                                    className="text-red-tag text-red-primary text-primary"
                                  >
                                    {jsUcfirst(el?.name)}
                                  </span>
                                )
                              }
                              return (
                                <span
                                  key={ab}
                                  onClick={() => handleClickStars(el)}
                                >
                                  {jsUcfirst(el?.name)}
                                </span>
                              )
                            }
                            if (el.good_ugly_stars === 1) {
                              return (
                                <>
                                  <span
                                    onClick={() => handleClickStars(el)}
                                    className="text-red-tag text-red-primary text-primary"
                                  >
                                    {`${jsUcfirst(el?.name)}`}
                                  </span>
                                  ,&nbsp;
                                </>
                              )
                            }
                            return (
                              <>
                                <span onClick={() => handleClickStars(el)}>
                                  {`${jsUcfirst(el?.name)}`}
                                </span>
                                ,&nbsp;
                              </>
                            )
                          }
                        )}
                      {getSaoTuDai(arrGioHD[e].name)}
                    </div>
                    {getInfoByHour(arrGioHD[e].name)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

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
