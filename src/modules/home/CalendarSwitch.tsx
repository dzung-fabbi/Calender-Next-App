import LoadingButton from '@mui/lab/LoadingButton'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { IconChevronRight, IconDown } from '@/components/icon'
import { Input } from '@/components/input'
import { useToggle } from '@/hooks'
import { CAN, CHI, HOURS, TIETKHI } from '@/utils/constant'
import {
  addZero,
  convertSolar2Lunar,
  getCanChi,
  getCanHour0,
  getLunarDate,
  getSolarDate,
  getTietkhiByLunar,
  removeZero,
} from '@/utils/helpers'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
interface DateProps {
  time: string | number
  day: string | number
  month: string | number
  year: string | number
}
const days = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
]

const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
]

const LIST_TAB = [
  {
    label: 'Ngày dương',
    tabValue: 0,
    allow: [1],
  },
  {
    label: 'Ngày âm',
    tabValue: 1,
    allow: [0, 2],
  },
  {
    label: 'Tiết khí',
    tabValue: 2,
    allow: [1, 3],
  },
  {
    label: 'Can chi',
    tabValue: 3,
    allow: [0, 1, 2],
  },
]

const CAN_CHI = [
  'Giáp Tý',
  'Ất Sửu',
  'Bính Dần',
  'Đinh Mão',
  'Mậu Thìn',
  'Kỷ Tỵ',
  'Canh Ngọ',
  'Tân Mùi',
  'Nhâm Thân',
  'Quý Dậu',
  'Giáp Tuất',
  'Ất Hợi',
  'Bính Tý',
  'Đinh Sửu',
  'Mậu Dần',
  'Kỷ Mão',
  'Canh Thìn',
  'Tân Tỵ',
  'Nhâm Ngọ',
  'Quý Mùi',
  'Giáp Thân',
  'Ất Dậu',
  'Bính Tuất',
  'Đinh Hợi',
  'Mậu Tý',
  'Kỷ Sửu',
  'Canh Dần',
  'Tân Mão',
  'Nhâm Thìn',
  'Quý Tỵ',
  'Giáp Ngọ',
  'Ất Mùi',
  'Bính Thân',
  'Đinh Dậu',
  'Mậu Tuất',
  'Kỷ Hợi',
  'Canh Tý',
  'Tân Sửu',
  'Nhâm Dần',
  'Quý Mão',
  'Giáp Thìn',
  'Ất Tỵ',
  'Bính Ngọ',
  'Đinh Mùi',
  'Mậu Thân',
  'Kỷ Dậu',
  'Canh Tuất',
  'Tân Hợi',
  'Nhâm Tý',
  'Quý Sửu',
  'Giáp Dần',
  'Ất Mão',
  'Bính Thìn',
  'Đinh Tỵ',
  'Mậu Ngọ',
  'Kỷ Mùi',
  'Canh Thân',
  'Tân Dậu',
  'Nhâm Tuất',
  'Quý Hợi',
]

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

export default function CalendarSwitch() {
  const [tab, setTab] = useState(0)
  const [isLoading, setLoading] = useToggle()
  const [tabConvert, setTabConvert] = useState(1)
  const currentDate = dayjs()
  const [time, setTime] = useState<Dayjs | null>(currentDate)
  const [day, setDay] = useState<string>(currentDate.format('DD'))
  const [month, setMonth] = useState<string>(currentDate.format('MM'))
  const [year, setYear] = useState<string>(currentDate.format('YYYY'))
  const [tietkhi, setTietkhi] = useState<string>('')
  const [canYear, setCanYear] = useState<string>('')
  const [chiYear, setChiYear] = useState<string>('')
  const [canMonth, setCanMonth] = useState<string>('')
  const [chiMonth, setChiMonth] = useState<string>('')
  const [canDay, setCanDay] = useState<string>('')
  const [chiDay, setChiDay] = useState<string>('')
  const [isDislayError, setIsDislayError] = useState<boolean>(false)
  const [convertDate, setConvertDate] = useState<DateProps>({
    time: '',
    day: '',
    month: '',
    year: '',
  })
  const [convertTietkhi, setConvertTietkhi] = useState<string>('')
  const [convertCanChi, setConvertCanChi] = useState<DateProps>({
    time: '',
    day: '',
    month: '',
    year: '',
  })

  const handleChange = (newValue: Dayjs | null) => {
    setTime(newValue)
  }

  const convertFromLunar = () => {
    const value = getSolarDate(removeZero(day), removeZero(month), +year)
    setConvertDate({
      time: dayjs(time).format('hh:mm A'),
      day: addZero(value[0]) || '',
      month: addZero(value[1]) || '',
      year: value[2] || '',
    })
    setConvertTietkhi(
      getTietkhiByLunar(
        removeZero(value[0]),
        removeZero(value[1]),
        +value[2]
      ) || ''
    )
    const currentLunarDate = getLunarDate(+value[0], +value[1], +value[2])
    const canChi = getCanChi(currentLunarDate)
    const canHours = getCanHour0(currentLunarDate.jd)
    const chiHours = HOURS.find(
      (el) => (time?.hour() || 0) >= el.min && (time?.hour() || 0) <= el.max
    )?.chi
    setConvertCanChi({
      time: `${canHours} ${chiHours}`,
      day: canChi[0] || '',
      month: canChi[1] || '',
      year: canChi[2] || '',
    })
  }

  const convertFromSolar = () => {
    const value = convertSolar2Lunar(removeZero(day), removeZero(month), +year)
    setConvertDate({
      time: dayjs(time).format('hh:mm A'),
      day: addZero(value[0]) || '',
      month: addZero(value[1]) || '',
      year: value[2] || '',
    })
    const lunarDate = getLunarDate(+day, +month, +year)
    const canChi = getCanChi(lunarDate)
    const canHours = getCanHour0(lunarDate.jd)
    const chiHours = HOURS.find(
      (el) => (time?.hour() || 0) >= el.min && (time?.hour() || 0) <= el.max
    )?.chi
    setConvertCanChi({
      time: `${canHours} ${chiHours}`,
      day: canChi[0] || '',
      month: canChi[1] || '',
      year: canChi[2] || '',
    })
  }

  const findIndexCanChi = (value: any) => {
    return CAN_CHI.findIndex((element: string) => element === value)
  }

  const convertFromCanChi = () => {
    const canChiTietKhiYear = `${canYear} ${chiYear}`
    const indexYear = findIndexCanChi(canChiTietKhiYear)
    if (indexYear < 0) setIsDislayError(true)

    const canChiTietKhiMonth = `${canMonth} ${chiMonth}`
    const indexcanChiTietKhiMonth = findIndexCanChi(canChiTietKhiMonth)
    if (indexcanChiTietKhiMonth < 0) setIsDislayError(true)

    const canChiTietKhiDay = `${canDay} ${chiDay}`
    const indexcanChiTietKhiDay = findIndexCanChi(canChiTietKhiDay)
    if (indexcanChiTietKhiDay < 0) setIsDislayError(true)

    const now = new Date()
    let currentLunarDate = getLunarDate(
      +now.getDate(),
      +now.getMonth() + 1,
      +now.getFullYear()
    )

    // process year
    const canChiNow = getCanChi(currentLunarDate)
    const canChiYearNow = canChiNow[2]
    const indexYearNow = findIndexCanChi(canChiYearNow)
    let rangeYear = indexYear - indexYearNow
    if (indexYearNow > indexYear) {
      rangeYear = 59 - indexYearNow + indexYear + 1
    }
    const yearCanChi = currentLunarDate.year + rangeYear

    // process month
    let value = getSolarDate(1, 1, +yearCanChi)
    currentLunarDate = getLunarDate(+value[0], +value[1], +value[2])
    let canChiByYear = getCanChi(currentLunarDate)

    const canChiMonthNow = canChiByYear[1]

    const indexcanChiTietKhiMonthByYear = findIndexCanChi(canChiMonthNow)

    let rangeMonth = indexcanChiTietKhiMonth - indexcanChiTietKhiMonthByYear
    let monthCanChi = 1 + rangeMonth
    if (indexcanChiTietKhiMonthByYear > indexcanChiTietKhiMonth) {
      rangeMonth =
        59 - indexcanChiTietKhiMonthByYear + indexcanChiTietKhiMonth + 1
      monthCanChi = 1 + rangeMonth
    }
    if (monthCanChi > 12) setIsDislayError(true)

    // process day
    value = getSolarDate(1, monthCanChi, +yearCanChi)
    currentLunarDate = getLunarDate(+value[0], +value[1], +value[2])
    canChiByYear = getCanChi(currentLunarDate)

    const canChiDayNow = canChiByYear[0]

    const indexCanChiTietKhiDayNow = findIndexCanChi(canChiDayNow)
    let rangeDay = indexcanChiTietKhiDay - indexCanChiTietKhiDayNow
    let dayCanChi = now.getDate() + rangeDay
    if (indexCanChiTietKhiDayNow > indexcanChiTietKhiDay) {
      rangeDay = 59 - indexCanChiTietKhiDayNow + indexcanChiTietKhiDay
      dayCanChi = 1 + rangeDay
    }

    if (dayCanChi > 31) setIsDislayError(true)
    const converSolar = getSolarDate(dayCanChi, monthCanChi, +yearCanChi)
    setConvertTietkhi(
      getTietkhiByLunar(
        removeZero(converSolar[0]),
        removeZero(converSolar[1]),
        +converSolar[2]
      ) || ''
    )
  }

  useEffect(() => {
    convertFromSolar()
  }, [])

  const handleConvert = () => {
    setLoading()
    setTimeout(() => {
      setLoading()
      setIsDislayError(false)
      if (tab === 0) {
        if (!day || !month || !year) setIsDislayError(true)
        convertFromSolar()
      } else if (tab === 1) {
        if (!day || !month || !year) setIsDislayError(true)
        convertFromLunar()
      } else if (tab === 3) {
        if (
          !canYear ||
          !chiYear ||
          !canMonth ||
          !chiMonth ||
          !canDay ||
          !chiDay
        )
          setIsDislayError(true)
        convertFromCanChi()
      }
    }, 300)
  }
  return (
    <div className="relative grid grid-cols-1 gap-5 2xl:grid-cols-2">
      <div className="flex flex-col flex-1 px-5 pt-2.5 pb-8  border shadow border-primary rounded-primary gap-y-4 relative">
        <div className="text-sm font-medium text-center border-b border-gray-200 text-gray-secondary">
          <ul className="flex flex-wrap gap-4">
            {LIST_TAB.map(({ label, tabValue, allow }) => {
              return (
                <li key={tabValue}>
                  <label
                    onClick={() => {
                      if (!allow.includes(tabConvert))
                        setTabConvert(allow[0] || 0)
                      setTab(tabValue)
                    }}
                    className={twMerge(
                      'inline-block p-2 font-semibold transition-all border-b-2 border-transparent rounded-t-lg hover:text-default hover:border-default',
                      tabValue === tab && 'text-default border-default'
                    )}
                  >
                    {label}
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
        <TabPanel value={tab} index={tab === 0 || tab === 1 ? tab : 0}>
          <div className="mb-4 text-sm font-medium text-gray-primary">
            Lựa chọn ngày {tab === 0 ? 'dương' : 'âm'}
          </div>
          <div className="flex gap-2.5 flex-wrap 4xl:flex-nowrap">
            <TimePicker
              label="Chọn giờ"
              value={time}
              className="w-40 4xl:w-full"
              onChange={handleChange}
              renderInput={(params) => (
                <TextField variant="filled" {...params} />
              )}
            />
            <div className="flex gap-2.5">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={days}
                className="w-24"
                renderInput={(params) => (
                  <TextField variant="filled" {...params} label="Ngày" />
                )}
                value={day}
                disableClearable
                onChange={(_, v: string) => {
                  setDay(v)
                }}
                popupIcon={<IconDown />}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={months}
                className="w-24"
                renderInput={(params) => (
                  <TextField variant="filled" {...params} label="Tháng" />
                )}
                value={month}
                disableClearable
                onChange={(_, v: string) => {
                  setMonth(v)
                }}
                popupIcon={<IconDown />}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Array.from({ length: 400 }, (_, i) =>
                  (i + 1900).toString()
                )}
                className="w-28"
                renderInput={(params) => (
                  <TextField variant="filled" {...params} label="Năm" />
                )}
                value={year}
                disableClearable
                onChange={(_, v: string) => {
                  setYear(v)
                }}
                popupIcon={<IconDown />}
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <div className="mb-4 text-sm font-medium text-gray-primary">
            Lựa chọn tiết khí
          </div>
          <div className="flex gap-2.5">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={TIETKHI}
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField variant="filled" {...params} label="Tiết khí" />
              )}
              value={tietkhi}
              disableClearable
              onChange={(_, v: string) => {
                setTietkhi(v)
              }}
              popupIcon={<IconDown />}
            />
          </div>
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <div className="mb-4 text-sm font-medium text-gray-primary">
            Lựa chọn can chi
          </div>
          <div className="year">
            <div className="mb-4 text-sm font-medium text-gray-primary">
              Năm
            </div>
            <div className="flex gap-2.5">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={CAN}
                sx={{ width: 150 }}
                renderInput={(params) => (
                  <TextField variant="filled" {...params} label="Can" />
                )}
                value={canYear}
                disableClearable
                onChange={(_, v: string) => {
                  setCanYear(v)
                }}
                popupIcon={<IconDown />}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={CHI}
                sx={{ width: 150 }}
                renderInput={(params) => (
                  <TextField variant="filled" {...params} label="Chi" />
                )}
                value={chiYear}
                disableClearable
                onChange={(_, v: string) => {
                  setChiYear(v)
                }}
                popupIcon={<IconDown />}
              />
            </div>
          </div>
          <div className="month">
            <div className="mb-4 text-sm font-medium text-gray-primary">
              Tháng
            </div>
            <div className="flex gap-2.5">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={CAN}
                sx={{ width: 150 }}
                renderInput={(params) => (
                  <TextField variant="filled" {...params} label="Can" />
                )}
                value={canMonth}
                disableClearable
                onChange={(_, v: string) => {
                  setCanMonth(v)
                }}
                popupIcon={<IconDown />}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={CHI}
                sx={{ width: 150 }}
                renderInput={(params) => (
                  <TextField variant="filled" {...params} label="Chi" />
                )}
                value={chiMonth}
                disableClearable
                onChange={(_, v: string) => {
                  setChiMonth(v)
                }}
                popupIcon={<IconDown />}
              />
            </div>
          </div>
          <div className="day">
            <div className="mb-4 text-sm font-medium text-gray-primary">
              Ngày
            </div>
            <div className="flex gap-2.5">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={CAN}
                sx={{ width: 150 }}
                renderInput={(params) => (
                  <TextField variant="filled" {...params} label="Can" />
                )}
                value={canDay}
                disableClearable
                onChange={(_, v: string) => {
                  setCanDay(v)
                }}
                popupIcon={<IconDown />}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={CHI}
                sx={{ width: 150 }}
                renderInput={(params) => (
                  <TextField variant="filled" {...params} label="Chi" />
                )}
                value={chiDay}
                disableClearable
                onChange={(_, v: string) => {
                  setChiDay(v)
                }}
                popupIcon={<IconDown />}
              />
            </div>
          </div>
        </TabPanel>

        {/* Button convert  */}
        <div
          onClick={handleConvert}
          className="absolute rotate-90 2xl:rotate-0 top-full -translate-y-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center w-[32px] h-[32px] 2xl:-translate-y-1/2 bg-white border-2 cursor-pointer hover:opacity-90 2xl:top-1/2 2xl:left-full 2xl:-translate-x-1.5 rounded-lg border-primary/[43] ring-2 ring-primary/[0.32]"
        >
          <button>
            {isLoading ? (
              <LoadingButton loading variant="text">
                Submit
              </LoadingButton>
            ) : (
              <IconChevronRight />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-1 px-5 pt-2.5 pb-8 gap-y-4 border border-transparent shadow rounded-primary">
        <div className="text-sm font-medium text-center border-b border-gray-200 text-gray-secondary">
          <ul className="flex flex-wrap gap-4">
            {LIST_TAB.map(({ label, tabValue, allow }) => {
              return (
                <li key={tabValue}>
                  <label
                    onClick={() => {
                      if (allow.includes(tab)) setTabConvert(tabValue)
                    }}
                    className={twMerge(
                      'inline-block p-2 font-semibold transition-all border-b-2 border-transparent rounded-t-lg',
                      tabValue === tabConvert && 'text-default border-default',
                      allow.includes(tab)
                        ? 'hover:text-default hover:border-default'
                        : 'opacity-50'
                    )}
                  >
                    {label}
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
        {isDislayError && (
          <div
            className="mb-4 text-sm font-medium text-gray-primary"
            style={{ color: 'red' }}
          >
            Không có kết quả tương ứng
          </div>
        )}

        {!isDislayError && (
          <div>
            <TabPanel
              value={tabConvert}
              index={tabConvert === 0 || tabConvert === 1 ? tabConvert : 0}
            >
              <div className="mb-4 text-sm font-medium text-gray-primary">
                {tabConvert === 0 ? 'Ngày dương' : 'Ngày âm'}
              </div>
              <div className="flex gap-2.5 flex-wrap 4xl:flex-nowrap">
                <div className="w-40 4xl:w-full">
                  <TextField
                    label="Giờ"
                    value={convertDate.time}
                    variant="filled"
                    inputProps={{ readOnly: true, className: 'w-full' }}
                  />
                </div>
                <div className="flex gap-2.5">
                  <div className="w-24">
                    <TextField
                      label="Ngày"
                      value={convertDate.day}
                      variant="filled"
                      inputProps={{ readOnly: true }}
                    />
                  </div>
                  <div className="w-24">
                    <TextField
                      label="Tháng"
                      value={convertDate.month}
                      variant="filled"
                      inputProps={{ readOnly: true }}
                    />
                  </div>
                  <div className="w-28">
                    <TextField
                      label="Năm"
                      value={convertDate.year}
                      variant="filled"
                      inputProps={{ readOnly: true }}
                    />
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={tabConvert} index={2}>
              <div className="mb-4 text-sm font-medium text-gray-primary">
                Tiết khí tương ứng
              </div>
              <Input
                label="Tiết khí"
                value={convertTietkhi}
                containerClass="grow"
                className="w-[150px] bg-[#FFF6F6] border-transparent rounded-md"
                disabled
              ></Input>
            </TabPanel>
            <TabPanel value={tabConvert} index={3}>
              <div className="mb-4 text-sm font-medium text-gray-primary">
                Can chi tương ứng
              </div>

              <div className="mb-4 text-sm text-gray-primary">
                Giờ: {convertCanChi.time}
              </div>
              <div className="mb-4 text-sm text-gray-primary">
                Ngày: {convertCanChi.day}
              </div>
              <div className="mb-4 text-sm text-gray-primary">
                Tháng: {convertCanChi.month}
              </div>
              <div className="mb-4 text-sm text-gray-primary">
                Năm: {convertCanChi.year}
              </div>
            </TabPanel>
          </div>
        )}
      </div>
    </div>
  )
}
