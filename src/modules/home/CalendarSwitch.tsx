import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import * as React from 'react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { IconChevronRight, IconDown } from '@/components/icon'
import { Input } from '@/components/input'
import { CAN, CHI, TIETKHI } from '@/utils/constant'
import {
  addZero,
  convertSolar2Lunar,
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
    allow: [2],
  },
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
  const [tab, setTab] = React.useState(0)
  const [tabConvert, setTabConvert] = React.useState(1)

  const [time, setTime] = useState<Dayjs | null>(null)
  const [day, setDay] = useState<string>('')
  const [month, setMonth] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [tietkhi, setTietkhi] = useState<string>('')
  const [can, setCan] = useState<string>('')
  const [chi, setChi] = useState<string>('')
  const [convertDate, setConvertDate] = useState<DateProps>({
    time: '',
    day: '',
    month: '',
    year: '',
  })
  const [convertTietkhi, setConvertTietkhi] = useState<string>('')

  const handleChange = (newValue: Dayjs | null) => {
    setTime(newValue)
  }

  const handleConvert = () => {
    if (tab === 0) {
      if (!day || !month || !year) return
      const value = convertSolar2Lunar(
        removeZero(day),
        removeZero(month),
        +year
      )
      setConvertDate({
        time: dayjs(time).format('HH:mm A'),
        day: addZero(value[0]) || '',
        month: addZero(value[1]) || '',
        year: value[2] || '',
      })
    } else if (tab === 1) {
      if (!day || !month || !year) return
      const value = getSolarDate(removeZero(day), removeZero(month), +year)
      setConvertDate({
        time: dayjs(time).format('HH:mm A'),
        day: addZero(value[0]) || '',
        month: addZero(value[1]) || '',
        year: value[2] || '',
      })
      setConvertTietkhi(
        getTietkhiByLunar(removeZero(day), removeZero(month), +year)
      )
    }
  }
  return (
    <div className="relative flex flex-wrap w-full gap-5">
      <div className="flex flex-col flex-1 px-5 pt-2.5 pb-8  border shadow border-primary rounded-primary gap-y-4">
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
          <div className="text-sm font-medium text-gray-primary mb-4">
            Lựa chọn ngày {tab === 0 ? 'dương' : 'âm'}
          </div>
          <div className="flex gap-2.5">
            <TimePicker
              label="Chọn giờ"
              value={time}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField sx={{ width: 150 }} variant="filled" {...params} />
              )}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={days}
              sx={{ width: 110 }}
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
              sx={{ width: 110 }}
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
              sx={{ width: 110 }}
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
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <div className="text-sm font-medium text-gray-primary mb-4">
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
          <div className="text-sm font-medium text-gray-primary mb-4">
            Lựa chọn can chi
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
              value={can}
              disableClearable
              onChange={(_, v: string) => {
                setCan(v)
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
              value={chi}
              disableClearable
              onChange={(_, v: string) => {
                setChi(v)
              }}
              popupIcon={<IconDown />}
            />
          </div>
        </TabPanel>
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
        <TabPanel
          value={tabConvert}
          index={tabConvert === 0 || tabConvert === 1 ? tabConvert : 0}
        >
          <div className="text-sm font-medium text-gray-primary mb-4">
            {tabConvert === 0 ? 'Ngày dương' : 'Ngày âm'}
          </div>
          <div className="flex gap-2.5">
            <Input
              label="Giờ"
              value={convertDate.time}
              containerClass="grow"
              className="w-full min-w-[150px] bg-[#FFF6F6] border-transparent rounded-md"
              disabled
            ></Input>
            <Input
              label="Ngày"
              value={convertDate.day}
              className="w-[88px] xl:w-24 bg-[#FFF6F6] border-transparent rounded-md"
              disabled
            ></Input>
            <Input
              label="Tháng"
              value={convertDate.month}
              className="w-[88px] xl:w-24 bg-[#FFF6F6] border-transparent rounded-md"
              disabled
            ></Input>
            <Input
              label="Năm"
              value={convertDate.year}
              className="w-[100px] xl:w-28 bg-[#FFF6F6] border-transparent rounded-md"
              disabled
            ></Input>
          </div>
        </TabPanel>
        <TabPanel value={tabConvert} index={2}>
          <div className="text-sm font-medium text-gray-primary mb-4">
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
          <div className="text-sm font-medium text-gray-primary mb-4">
            Can chi tương ứng
          </div>
        </TabPanel>
      </div>

      <div className="absolute flex items-center justify-center w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-white border-2 cursor-pointer hover:opacity-90 top-1/2 left-1/2 rounded-lg border-primary/[43] ring-2 ring-primary/[0.32]">
        <button onClick={handleConvert}>
          <IconChevronRight />
        </button>
      </div>
    </div>
  )
}
