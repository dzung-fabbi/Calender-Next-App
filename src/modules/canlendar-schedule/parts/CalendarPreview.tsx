import * as React from 'react'

import BadgeDateStatus from './BadgeDateStatus'

export default function CalendarPreview() {
  return (
    <section className="flex items-center py-7 rounded-primary bg-datePreview">
      <div className="w-2/5 flex flex-col gap-y-[6px] relative">
        <h4 className="font-medium text-[1.625rem] text-center">
          Tháng 02 năm 2023
        </h4>
        <h1 className="font-bold text-[8.75rem] text-primary leading-none text-center relative">
          18
          <div className="absolute left-2/3 top-0 rotate-[-31.24deg]">
            <BadgeDateStatus />
          </div>
        </h1>

        <span className="uppercase font-semibold text-[1.625rem] text-center">
          CHỦ NHẬT
        </span>
      </div>
      <div className="flex-1"></div>
    </section>
  )
}
