import * as React from 'react'
import { useEffect, useState } from 'react'

import { BadgePrimary } from '@/components/badge'

import { CalendarPreview } from '../home'

export default function BoxSelectDate(props: any) {
  const [chooseDay, setChooseDay] = useState<any>({})

  useEffect(() => {
    if (props.goodDays.length > 0) {
      setChooseDay({
        idx: 0,
        day: props.goodDays[0].lunar_day,
      })
    }
  }, [props.goodDays])

  return (
    <div className="flex flex-col gap-y-30px">
      <div className="flex flex-col gap-y-5">
        <h4 className="text-lg font-medium text-gray-primary">Chọn ngày</h4>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-6">
          {props.goodDays.map((el: any, ids: number) => {
            if (chooseDay.idx === ids) {
              return (
                <BadgePrimary
                  key={ids}
                  isActive
                  onClick={() =>
                    setChooseDay({
                      idx: ids,
                      day: el.lunar_day,
                    })
                  }
                >
                  {el.lunar_day}
                </BadgePrimary>
              )
            }
            return (
              <BadgePrimary
                key={ids}
                onClick={() =>
                  setChooseDay({
                    idx: ids,
                    day: el.lunar_day,
                  })
                }
              >
                {el.lunar_day}
              </BadgePrimary>
            )
          })}
        </div>
        {props.goodDays.length > 0 && <CalendarPreview day={chooseDay.day} />}
      </div>
    </div>
  )
}
