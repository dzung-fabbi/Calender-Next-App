import * as React from 'react'

import { IconCalendar, IconDown } from '@/components/icon'
import { Input } from '@/components/input'

export default function BoxSelectInfo() {
  return (
    <div className="flex flex-col p-5 pt-3 border border-primary rounded-primary gap-y-5">
      <h4 className="font-medium text-gray-primary">
        Lựa chọn thời gian sắp đặt lịch làm việc của bạn!
      </h4>
      <div className="flex gap-[10px] flex-wrap">
        <Input
          label="Chọn công việc"
          containerClass="grow"
          className="w-full min-w-[385px]"
          value={'Việc liên quan đến Xã hội, tập thể'}
        >
          <IconDown />
        </Input>
        <Input
          label="Năm sinh"
          className="w-[180px] xl:w-[200px]"
          value={'12/02/1994'}
        >
          <IconDown />
        </Input>
        <Input
          label="Ngày bắt đầu"
          className="w-[180px] xl:w-[200px]"
          value={'12/02/2023'}
        >
          <IconCalendar />
        </Input>
        <Input
          label="Ngày kết thúc"
          className="w-[180px] xl:w-[200px]"
          value={'12/03/2023'}
        >
          <IconCalendar />
        </Input>
      </div>
      <div className="flex justify-end">
        <button className="btn btn-primary">Gửi</button>
      </div>
    </div>
  )
}
