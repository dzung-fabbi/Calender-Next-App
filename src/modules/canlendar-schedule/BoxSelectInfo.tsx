import { Autocomplete, TextField } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useState } from 'react'

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
  const [filter, setFilter] = useState<FormValue>({
    work: LABEL_WORK[0]?.label || 'abc',
    year: dayjs('1998-08-18T21:11:54'),
    startDate: dayjs(new Date()),
    endDate: dayjs(new Date()),
  })
  return (
    <div className="flex flex-col p-5 pt-3 border border-primary rounded-primary gap-y-5">
      <h4 className="font-medium text-gray-primary">
        Lựa chọn thời gian sắp đặt lịch làm việc của bạn!
      </h4>
      <div className="flex gap-[10px] flex-wrap">
        <Autocomplete
          disablePortal
          id="work-id"
          options={LABEL_WORK.map((e) => e.label)}
          sx={{ flexGrow: 1, minWidth: '300px' }}
          renderInput={(params) => (
            <TextField
              variant="filled"
              {...params}
              label="Việc liên quan đến Xã hội, tập thể"
            />
          )}
          value={filter.work}
          clearIcon={null}
          onChange={(_, v) => {
            setFilter({ ...filter, work: v })
          }}
          popupIcon={<IconDown />}
        />

        <div className="w-full lg:w-[11.25rem] 2xl:w-52">
          <DesktopDatePicker
            label="Năm sinh"
            inputFormat="DD/MM/YYYY"
            components={{
              OpenPickerIcon: IconDown,
            }}
            value={filter.year}
            onChange={(newYear) => setFilter({ ...filter, year: newYear })}
            renderInput={(params) => <TextField variant="filled" {...params} />}
          />
        </div>
        <div className="w-full lg:w-[11.25rem] 2xl:w-52">
          <DesktopDatePicker
            label="Ngày bắt đầu"
            inputFormat="DD/MM/YYYY"
            components={{
              OpenPickerIcon: IconCalendar,
            }}
            value={filter.startDate}
            onChange={(newStartDate) =>
              setFilter({ ...filter, startDate: newStartDate })
            }
            renderInput={(params) => <TextField variant="filled" {...params} />}
          />
        </div>
        <div className="w-full lg:w-[11.25rem] 2xl:w-52">
          <DesktopDatePicker
            label="Ngày kết thúc"
            inputFormat="DD/MM/YYYY"
            components={{
              OpenPickerIcon: IconCalendar,
            }}
            value={filter.endDate}
            onChange={(newEndDate) =>
              setFilter({ ...filter, endDate: newEndDate })
            }
            renderInput={(params) => <TextField variant="filled" {...params} />}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button primary className="">
          Gửi
        </Button>
      </div>
    </div>
  )
}
