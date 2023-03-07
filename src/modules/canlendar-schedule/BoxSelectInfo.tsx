import { yupResolver } from '@hookform/resolvers/yup'
import { Autocomplete, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Button } from '@/components/button'
import { IconCalendar, IconDown } from '@/components/icon'

const LABEL_WORK = [
  { label: 'The Shawshank Redemption', value: 1 },
  { label: 'The Godfather', value: 2 },
  { label: 'The Godfather: Part II', value: 3 },
  { label: 'The Dark Knight', value: 4 },
  { label: '12 Angry Men', value: 5 },
  { label: "Schindler's List", value: 6 },
  { label: 'Pulp Fiction', value: 7 },
]
interface FormValue {
  work: string | null
  year: Dayjs | null
  startDate: Dayjs | null
  endDate: Dayjs | null
}
export default function BoxSelectInfo() {
  const schema = yup.object().shape({
    work: yup.string().nullable().required('Please enter your work'),
    year: yup.date().nullable().required('Please enter your year'),
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
  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid: isValidForm },
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
    defaultValues: {
      work: LABEL_WORK[0]?.label || 'abc',
      year: dayjs('1998-08-18'),
      startDate: dayjs('2022-08-18'),
      endDate: dayjs('2022-08-18'),
    },
    mode: 'onChange',
  })

  // eslint-disable-next-line no-alert
  const submitForm = (data: FormValue) => alert(data)
  return (
    <form
      className="flex flex-col p-2.5 pb-5 xl:p-5 xl:pt-2.5 border border-primary rounded-primary gap-y-2.5 xl:gap-y-5"
      onSubmit={handleSubmit(submitForm)}
    >
      <h4 className="my-[5px] font-medium text-gray-primary">
        Lựa chọn thời gian sắp đặt lịch làm việc của bạn!
      </h4>
      <div className="flex gap-[10px] flex-wrap">
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
              options={LABEL_WORK.map((e) => e.label)}
              sx={{ flexGrow: 1, minWidth: '300px' }}
              ref={ref}
              renderInput={(params) => (
                <TextField
                  variant="filled"
                  {...params}
                  label="Việc liên quan đến Xã hội, tập thể"
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
            name="year"
            control={control}
            render={({
              field: { onChange, value, ref },
              fieldState: { invalid },
            }) => (
              <DatePicker
                label="Năm sinh"
                inputFormat="DD/MM/YYYY"
                components={{
                  OpenPickerIcon: IconDown,
                }}
                className="w-full"
                disableFuture
                value={value}
                onChange={onChange}
                ref={ref}
                renderInput={(params) => (
                  <TextField
                    variant="filled"
                    // type="date"
                    {...params}
                    error={invalid}
                  />
                )}
              />
            )}
          />
        </div>
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
