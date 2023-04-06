/* eslint-disable tailwindcss/no-custom-classname */
import { TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { vi } from 'date-fns/locale'
import type { Dayjs } from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import homeApi from '@/api/home.api'
import { useStore } from '@/store/useStore'
import { LOWER_DAYS } from '@/utils/constant'
import CustomDateAdapter, {
  getDayName,
  getMonth,
  getTextDay,
} from '@/utils/helpers'

import { CardCalendar } from '../card'
import { IconAkarChevronDown } from '../icon'

const Calendar = ({
  currentDate,
  setCurrentDate,
}: {
  currentDate: Dayjs
  setCurrentDate: (date: Dayjs) => void
}) => {
  const nextMonth = currentDate.add(1, 'month')
  const prevMonth = currentDate.subtract(1, 'month')
  const day = currentDate.format('DD')
  const month = currentDate.format('MM')
  const year = currentDate.format('YYYY')
  const currentMonths = getMonth(+month, +year)
  const ldCurren = currentMonths[0]
  const emptyCells = (ldCurren.jd + 1) % 7
  const [arrGood, setArrGood] = useState<any>([])

  const nextMonths = getMonth(
    +nextMonth.format('MM'),
    +nextMonth.format('YYYY')
  )

  const prevMonths = getMonth(
    +prevMonth.format('MM'),
    +prevMonth.format('YYYY')
  )

  const endOfPrevMonth = +prevMonth.endOf('month').format('DD')
  const arrDay: { month: string | number; lunar_day: string }[] = []
  Array.from(Array(6).keys()).forEach((i: number) => {
    Array.from(Array(7).keys()).forEach((j: number) => {
      const k = 7 * i + j
      if (
        k >= emptyCells + currentMonths.length &&
        k > 34 &&
        emptyCells + currentMonths.length < 36
      )
        return
      let lunarDate = null
      if (k < emptyCells || k >= emptyCells + currentMonths.length) {
        if (k < emptyCells) {
          lunarDate = prevMonths[prevMonths.length - (emptyCells - k)]
        } else {
          lunarDate = nextMonths[k - (emptyCells + currentMonths.length)]
        }
      } else {
        lunarDate = currentMonths[k - emptyCells]
      }
      const dayName = getDayName(lunarDate)
      arrDay.push({
        month: lunarDate.month,
        lunar_day: dayName[0] || '',
      })
    })
  })

  useEffect(() => {
    if (arrDay.length)
      homeApi
        .getCalendar(arrDay)
        .then((res) => {
          setArrGood(res.data)
        })
        .catch(() => {})
  }, [JSON.stringify(arrDay)])

  let count = -1

  return (
    <div className="lvn-lichad-lichmain mt-4 rounded-2xl bg-[#FAFBFA] p-1.5 xl:p-3">
      <div className="grid grid-cols-7 gap-2 mb-3">
        <div className="font-semibold text-primary">CN</div>
        <div className="font-semibold">Hai</div>
        <div className="font-semibold">Ba</div>
        <div className="font-semibold">Bốn</div>
        <div className="font-semibold">Năm</div>
        <div className="font-semibold">Sáu</div>
        <div className="font-semibold">Bảy</div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from(Array(6).keys()).map((i: number) => {
          return Array.from(Array(7).keys()).map((j: number) => {
            const k = 7 * i + j
            if (
              k >= emptyCells + currentMonths.length &&
              k > 34 &&
              emptyCells + currentMonths.length < 36
            )
              return null
            count += 1
            if (k < emptyCells || k >= emptyCells + currentMonths.length) {
              let solarDate: number | string = ''
              let lunar: number | string = ''
              if (k < emptyCells) {
                solarDate = endOfPrevMonth - (emptyCells - k) + 1
                const lunarDate =
                  prevMonths[prevMonths.length - (emptyCells - k)]
                lunar = lunarDate.day

                if (lunar === 1) {
                  lunar = `${lunarDate.day}/${lunarDate.month}`
                }
              } else {
                solarDate = k - (emptyCells + currentMonths.length) + 1
                const lunarDate =
                  nextMonths[k - (emptyCells + currentMonths.length)]
                lunar = lunarDate.day

                if (lunar === 1) {
                  lunar = `${lunarDate.day}/${lunarDate.month}`
                }
              }
              let classAdd = ''
              if (arrGood[count]) {
                const textDay = getTextDay(
                  arrGood[count].should_things,
                  arrGood[count].no_should_things,
                  arrGood[count].good_stars,
                  arrGood[count].ugly_stars
                )
                if (!textDay.is_good) classAdd = 'ugly-cal'
              }
              return (
                <div key={k} className="lvn-lichad-col lvn-lichad-colhide">
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span>{solarDate}</span>
                  </div>
                  <span
                    className={`lvn-lichad-da text-sm text-gray-primary ${classAdd}`}
                  >
                    {lunar}
                  </span>
                </div>
              )
            }
            const solarDate = k - emptyCells + 1
            const lunarDate = currentMonths[k - emptyCells]
            let lunar = lunarDate.day

            if (lunar === 1) {
              lunar = `${lunarDate.day}/${lunarDate.month}`
            }

            let classAdd = ''
            if (arrGood[count]) {
              const textDay = getTextDay(
                arrGood[count].should_things,
                arrGood[count].no_should_things,
                arrGood[count].good_stars,
                arrGood[count].ugly_stars
              )
              if (!textDay.is_good) classAdd = 'ugly-cal'
            }

            return (
              <div
                key={k}
                className={`lvn-lichad-col${
                  solarDate === +day ? ' today' : ''
                }`}
              >
                <button
                  className=""
                  onClick={() => {
                    setCurrentDate(currentDate.set('date', solarDate))
                  }}
                  title="Xem lịch âm ngày 4 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">{solarDate}</span>
                  </div>
                  <span
                    className={`lvn-lichad-da text-sm ${classAdd} ${
                      lunarDate.day === 1
                        ? 'text-[#FF3939]'
                        : 'text-gray-primary'
                    }`}
                  >
                    {lunar}
                  </span>
                </button>
              </div>
            )
          })
        })}
      </div>
    </div>
  )
}

export default function BoxCalenderRight({
  className,
}: {
  className?: string
}) {
  const tabHeader = useStore((state) => state.tabHeader)
  const currentDate = useStore((state) => state.currentDate)
  const onChangeCurrentDate = useStore((state) => state.setCurrentDate)
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  const titleCalendar = useMemo(() => {
    return `${LOWER_DAYS[currentDate.day()]}, ${currentDate.format(
      'DD'
    )} Tháng ${currentDate.format('MM, YYYY')}`
  }, [currentDate])
  return (
    <section
      className={twMerge(
        'bg-transparent xl:bg-[#F3F4F3] xl:h-[100vh] w-full mx-auto xl:max-w-[25.625rem] xl:min-w-[25.625rem] min-w-[22rem] xs:pt-4 xl:py-10 xl:px-5 rounded-30px xl:rounded-r-none',
        tabHeader === 2 && 'xs:hidden',
        className
      )}
    >
      <CardCalendar className="bg-[#D9E8DA] xl:bg-white">
        <LocalizationProvider
          adapterLocale={vi}
          // @ts-ignore
          dateAdapter={CustomDateAdapter}
          dateFormats={{ monthShort: 'T.M', monthAndYear: 'MM/YYYY' }}
        >
          <DatePicker
            views={['year', 'month']}
            // minDate={dayjs('2012-03-01')}
            // maxDate={dayjs('2023-06-01')}
            value={currentDate}
            PopperProps={{
              placement: 'bottom-start',
            }}
            onChange={(newValue: Dayjs | null) => {
              onChangeCurrentDate(newValue || currentDate)
            }}
            open={isOpenCalendar}
            onClose={() => setIsOpenCalendar(false)}
            openTo="year"
            renderInput={(params) => (
              <div
                className="flex items-center cursor-pointer w-fit hover:opacity-80"
                onClick={() => setIsOpenCalendar(!isOpenCalendar)}
              >
                <p className="text-xl text-left">{titleCalendar}</p>

                <div className="rounded-full p-1.5 transition-all duration-200 hover:bg-[#E7E7E7]">
                  <IconAkarChevronDown />
                </div>
                <TextField
                  style={{ opacity: 0, width: 0, height: 0 }}
                  {...params}
                  InputProps={{ className: 'hidden-input-calendar' }}
                />
              </div>
            )}
          />
        </LocalizationProvider>

        <Calendar
          currentDate={currentDate}
          setCurrentDate={onChangeCurrentDate}
        />
        <p className="mt-4 text-lg font-semibold text-left">Chú thích</p>
        <div className="flex pl-2">
          <span className="good-day w-2/5 text-left">Ngày tốt</span>
          <span className="ugly-day">Ngày xấu</span>
        </div>
      </CardCalendar>
    </section>
  )
}
