import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import * as React from 'react'
import { useEffect, useState } from 'react'

import calendarSchedule from '@/api/calendar-schedule.api'
import { Button } from '@/components/button'
import { TitlePage } from '@/components/common'
import { IconCalendar } from '@/components/icon'
import { useStore } from '@/store/useStore'
import { MESSAGES } from '@/utils/constant'

type ItemProps = {
  id?: number
  name: string
  value: null | string
  isDefault: boolean
  isNew: boolean
}

export default function AppointmentDate() {
  const setMessageInfo = useStore((state) => state.setMessageInfo)
  const [list, setList] = useState<Array<ItemProps>>([
    {
      name: 'Ngày sinh',
      value: null,
      isDefault: true,
      isNew: false,
    },
    {
      name: 'Ngày cưới',
      value: null,
      isDefault: true,
      isNew: false,
    },
  ])

  useEffect(() => {
    calendarSchedule
      .getAppointmentDate('1')
      .then((res) => {
        if (res.data && res.data.length)
          setList(
            res.data.map(
              (
                item: { name: string; date: string; id: number },
                index: number
              ) => {
                return {
                  name: item.name,
                  value: item.date,
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
            user_id: 1,
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
              item: { name: string; date: string; id: number },
              index: number
            ) => {
              return {
                name: item.name,
                value: item.date,
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
