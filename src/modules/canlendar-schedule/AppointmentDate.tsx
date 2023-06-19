import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Autocomplete, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import * as React from 'react'
import { useEffect, useState } from 'react'

import calendarSchedule from '@/api/calendar-schedule.api'
import { Button } from '@/components/button'
import { TitlePage } from '@/components/common'
import { IconCalendar, IconDown } from '@/components/icon'
import { useStore } from '@/store/useStore'
import { MESSAGES } from '@/utils/constant'

type ItemProps = {
  id?: number
  name: string
  value: null | string
  days: string
  isDefault: boolean
  isNew: boolean
}

const days = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
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
]

export default function AppointmentDate() {
  const { setMessageInfo, userInfo } = useStore((state) => ({
    setMessageInfo: state.setMessageInfo,
    userInfo: state.userInfo,
  }))

  const [list, setList] = useState<Array<ItemProps>>([
    {
      name: 'Ngày sinh',
      value: null,
      days: '0',
      isDefault: true,
      isNew: false,
    },
    {
      name: 'Ngày cưới',
      value: null,
      days: '0',
      isDefault: true,
      isNew: false,
    },
  ])

  useEffect(() => {
    calendarSchedule
      .getAppointmentDate()
      .then((res) => {
        if (res.data && res.data.length)
          setList(
            res.data.map(
              (
                item: {
                  name: string
                  date: string
                  id: number
                  convert_time: number
                },
                index: number
              ) => {
                return {
                  name: item.name,
                  value: item.date,
                  days: item.convert_time / 86400,
                  isDefault: !!(index === 0 || index === 1),
                  isNew: false,
                  id: item.id,
                }
              }
            )
          )
      })
      .catch(() => {
        setMessageInfo({ type: 'error', message: MESSAGES.ERROR })
      })
  }, [])

  const addNewItem = () => {
    setList([
      ...list,
      {
        name: '',
        value: null,
        days: '0',
        isDefault: false,
        isNew: true,
      },
    ])
  }

  const removeItem = (index: number) => {
    const newList = [...list]
    newList.splice(index, 1)
    setList(newList)
  }

  const changeText = (index: number, value: string) => {
    setList(
      list.map((item: ItemProps, idx: number) => {
        if (idx === index) {
          return {
            ...item,
            name: value,
            isNew: false,
          }
        }
        return item
      })
    )
  }

  const changeDays = (index: number, value: string) => {
    setList(
      list.map((item: ItemProps, idx: number) => {
        if (idx === index) {
          return {
            ...item,
            days: value,
            isNew: false,
          }
        }
        return item
      })
    )
  }

  const changeDate = (index: number, value: string) => {
    setList(
      list.map((item: ItemProps, idx: number) => {
        if (idx === index) {
          return {
            ...item,
            value,
          }
        }
        return item
      })
    )
  }

  const submitForm = () => {
    calendarSchedule
      .appointmentDate(
        list.map((item: ItemProps) => {
          let data: any = {
            name: item.name,
            date: item.value,
            before_days: item.days,
            user_id: userInfo && userInfo.id,
          }
          if (item.id) {
            data = {
              ...data,
              id: item.id,
            }
          }
          return data
        })
      )
      .then((res) => {
        setMessageInfo({ type: 'success', message: MESSAGES.SUCCESS })
        setList(
          res.data.map(
            (
              item: {
                name: string
                date: string
                id: number
                convert_time: number
              },
              index: number
            ) => {
              return {
                name: item.name,
                value: item.date,
                days: item.convert_time / 86400,
                isDefault: !!(index === 0 || index === 1),
                isNew: false,
                id: item.id,
              }
            }
          )
        )
      })
      .catch(() => {
        setMessageInfo({ type: 'error', message: MESSAGES.ERROR })
      })
  }

  return (
    <div>
      <TitlePage>Đặt ngày hẹn</TitlePage>
      <div className="flex flex-col gap-y-2.5 rounded-primary border border-primary p-2.5 pb-5 xl:gap-y-5 xl:p-5 xl:pt-2.5">
        {list.map((item: ItemProps, index: number) => {
          return (
            <div key={index} className="flex gap-2">
              <div className="w-full lg:w-[11.25rem] 2xl:w-52">
                <TextField
                  variant="filled"
                  label="Chọn công việc"
                  value={item.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    changeText(index, event.target.value)
                  }
                  error={!item.name && !item.isNew}
                />
              </div>
              <div className="w-full lg:w-[11.25rem] 2xl:w-52">
                <DatePicker
                  label="Chọn ngày"
                  inputFormat="DD/MM/YYYY"
                  components={{
                    OpenPickerIcon: IconCalendar,
                  }}
                  className="w-full"
                  value={item.value}
                  onChange={(value) =>
                    changeDate(index, dayjs(value).format('YYYY-MM-DD'))
                  }
                  renderInput={(params) => (
                    <TextField variant="filled" {...params} />
                  )}
                />
              </div>
              <div className="w-full lg:w-[11.25rem] 2xl:w-52">
                <Autocomplete
                  disablePortal
                  clearOnBlur
                  id="month-select"
                  options={days}
                  className="w-32"
                  renderInput={(params) => (
                    <TextField variant="filled" {...params} label="Ngày hẹn" />
                  )}
                  value={item.days}
                  onChange={(_, v: string | null) => {
                    changeDays(index, v || '0')
                  }}
                  popupIcon={<IconDown />}
                />
              </div>
              {!item.isDefault && (
                <button onClick={() => removeItem(index)}>
                  <HighlightOffIcon />
                </button>
              )}
            </div>
          )
        })}

        <div className="flex gap-2 lg:justify-start">
          <Button
            className="w-full lg:w-fit"
            primary
            type="submit"
            onClick={addNewItem}
          >
            Thêm mới
          </Button>
          <Button
            className="w-full lg:w-fit"
            primary
            type="submit"
            disabled={list.some(({ name }) => !name)}
            onClick={submitForm}
          >
            Lưu
          </Button>
        </div>
      </div>
    </div>
  )
}
