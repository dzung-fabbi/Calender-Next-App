import { yupResolver } from '@hookform/resolvers/yup'
import { Autocomplete, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import calendarSchedule from '@/api/calendar-schedule.api'
import { Button } from '@/components/button'
import { IconCalendar, IconDown } from '@/components/icon'
import { useStore } from '@/store/useStore'
import { LABEL_WORK, MESSAGES } from '@/utils/constant'
import {
  findIndexCanChi,
  getCanChi,
  getLunarDate,
  getSolarDate,
  jsUcfirst,
} from '@/utils/helpers'

interface FormValue {
  mainWork: string | null
  work: string | null
  startDate: any
  endDate: any
}
export default function BoxSelectInfo(props: any) {
  const setMessageInfo = useStore((state) => state.setMessageInfo)
  const schema = yup.object().shape({
    mainWork: yup.string().nullable().required('Please enter your work'),
    work: yup.string().nullable().required('Please enter your work'),
    startDate: yup
      .date()
      .typeError('Please enter the correct date format')
      .nullable()
      .required('Please enter your start date')
      .max(yup.ref('endDate')),
    endDate: yup
      .date()
      .typeError('Please enter the correct date format')
      .nullable()
      .required('Please enter your end date')
      .min(yup.ref('startDate')),
  })
  const [workMain, setWorkMain] = useState('Việc liên quan đến sản xuất')
  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid: isValidForm },
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
    defaultValues: {
      mainWork: workMain || 'abc',
      work: LABEL_WORK.find((el) => el.label === workMain)?.work[0] || '',
      startDate: dayjs(new Date()),
      endDate: dayjs(new Date()),
    },
    mode: 'onChange',
  })

  const getLunarDateByCanchi = (
    canChi: string,
    month: string,
    year: number
  ) => {
    // process day
    const convertSolarFirstDay = getSolarDate(1, month, +year)
    const lunarDateFirstDay = getLunarDate(
      +convertSolarFirstDay[0],
      +convertSolarFirstDay[1],
      +convertSolarFirstDay[2]
    )
    const canChiByYear = getCanChi(lunarDateFirstDay)
    const arrTmp = canChi.split(' ')
    const canChiDayFirstDay = canChiByYear[0]
    // @ts-ignore
    const indexCanChiDaySearch = findIndexCanChi(
      `${jsUcfirst(arrTmp[0] || '')} ${jsUcfirst(arrTmp[1] || '')}`
    )
    const indexCanChiFirstDay = findIndexCanChi(canChiDayFirstDay)
    let rangeDay = indexCanChiDaySearch - indexCanChiFirstDay

    if (indexCanChiFirstDay > indexCanChiDaySearch) {
      rangeDay = 59 - indexCanChiFirstDay + indexCanChiDaySearch
    }
    const firstDay = new Date(`${year}-${month}-1`)
    const daySearchNumber = firstDay.setDate(firstDay.getDate() + rangeDay)
    const daySearch = new Date(daySearchNumber)
    const solarSearch = getSolarDate(
      daySearch.getDate(),
      daySearch.getMonth() + 1,
      +daySearch.getFullYear()
    )

    const lunarDateSearchDay = getLunarDate(
      +solarSearch[0],
      +solarSearch[1],
      +solarSearch[2]
    )
    const canChiSearch = getCanChi(lunarDateSearchDay)
    if (canChiSearch[0]?.toUpperCase() !== canChi) return null

    return `${solarSearch[2]}-${solarSearch[1]}-${solarSearch[0]}`
  }

  // eslint-disable-next-line no-alert
  const submitForm = (data: FormValue) => {
    props.setWork(data.work)
    const startDate = dayjs(data.startDate).format('DD/MM/YYYY')
    const endDate = dayjs(data.endDate).format('DD/MM/YYYY')
    const startDateLunar = getLunarDate(
      +data.startDate.getDate() || new Date().getDate(),
      +(data.startDate.getMonth() + 1),
      +data.startDate.getFullYear()
    )

    const canChi = getCanChi(startDateLunar)
    const endDateLunar = getLunarDate(
      +data.endDate.getDate() || new Date().getDate(),
      +(data.endDate.getMonth() + 1),
      +data.endDate.getFullYear()
    )
    calendarSchedule
      .getDateByWork(
        data.work || '',
        startDate,
        endDate,
        canChi[0] || '',
        startDateLunar.month,
        endDateLunar.month
      )
      .then((res) => {
        let goodDays = res.data.map((el: any) => {
          const newEl = { ...el }
          newEl.lunar_day = getLunarDateByCanchi(
            el.lunar_day,
            el.month,
            data.startDate.getFullYear()
          )
          return newEl
        })
        goodDays = goodDays.filter((el: any) => el.lunar_day !== null)
        goodDays = goodDays.slice(0, 10)
        props.setGoodDays(goodDays)
        if (!goodDays.length) {
          setMessageInfo({ type: 'warning', message: MESSAGES.NOT_FOUND })
        }
      })
      .catch(() => {})
  }
  return (
    <form
      className="flex flex-col gap-y-2.5 rounded-primary border border-primary p-2.5 pb-5 xl:gap-y-5 xl:p-5 xl:pt-2.5"
      onSubmit={handleSubmit(submitForm)}
    >
      <h4 className="my-[5px] font-medium text-gray-primary">
        Lựa chọn thời gian sắp đặt lịch làm việc của bạn!
      </h4>
      <div className="flex flex-wrap gap-[10px]">
        <Controller
          name="mainWork"
          control={control}
          render={({
            field: { onChange, value, ref },
            fieldState: { invalid },
          }) => (
            <Autocomplete
              disablePortal
              id="work-id"
              options={LABEL_WORK.map((e) => e.label)}
              sx={{ flexGrow: 1, minWidth: '100px' }}
              ref={ref}
              renderInput={(params) => (
                <TextField
                  variant="filled"
                  {...params}
                  label="Chọn công việc"
                  error={invalid}
                />
              )}
              value={value}
              clearIcon={null}
              onChange={(_, v) => {
                onChange(v)
                // @ts-ignore
                setWorkMain(v)
              }}
              popupIcon={<IconDown />}
            />
          )}
        />

        <Controller
          name="work"
          control={control}
          render={({
            field: { onChange, value, ref },
            fieldState: { invalid },
          }) => (
            <Autocomplete
              disablePortal
              id="work-id"
              options={
                LABEL_WORK.find((el) => el.label === workMain)?.work.map(
                  (e) => e
                ) || []
              }
              sx={{ flexGrow: 1, minWidth: '100px' }}
              ref={ref}
              renderInput={(params) => (
                <TextField
                  variant="filled"
                  {...params}
                  label={LABEL_WORK.find((el) => el.label === workMain)?.label}
                  error={invalid}
                />
              )}
              value={value}
              clearIcon={null}
              onChange={(_, v) => {
                onChange(v)
              }}
              popupIcon={<IconDown />}
            />
          )}
        />
        <div className="w-full lg:w-[11.25rem] 2xl:w-52">
          <Controller
            name="startDate"
            control={control}
            render={({
              field: { onChange, value, ref },
              fieldState: { invalid },
            }) => (
              <DatePicker
                label="Ngày bắt đầu"
                inputFormat="DD/MM/YYYY"
                components={{
                  OpenPickerIcon: IconCalendar,
                }}
                className="w-full"
                ref={ref}
                maxDate={watch('endDate')}
                value={value}
                onChange={onChange}
                renderInput={(params) => (
                  <TextField variant="filled" {...params} error={invalid} />
                )}
              />
            )}
          />
        </div>
        <div className="w-full lg:w-[11.25rem] 2xl:w-52">
          <Controller
            name="endDate"
            control={control}
            render={({
              field: { onChange, value, ref },
              fieldState: { invalid },
            }) => (
              <DatePicker
                label="Ngày kết thúc"
                inputFormat="DD/MM/YYYY"
                components={{
                  OpenPickerIcon: IconCalendar,
                }}
                className="w-full"
                ref={ref}
                minDate={watch('startDate')}
                value={value}
                onChange={onChange}
                renderInput={(params) => (
                  <TextField variant="filled" {...params} error={invalid} />
                )}
              />
            )}
          />
        </div>
      </div>
      <div className="flex lg:justify-end">
        <Button
          className="w-full lg:w-fit"
          primary
          type="submit"
          disabled={!isValidForm}
        >
          Gửi
        </Button>
      </div>
    </form>
  )
}
