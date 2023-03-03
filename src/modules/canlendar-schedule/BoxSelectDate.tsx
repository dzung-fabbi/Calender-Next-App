import * as React from 'react'

import { BadgePrimary } from '@/components/badge'

import { CalendarPreview } from '../home'

export default function BoxSelectDate() {
  return (
    <div className="flex flex-col gap-y-30px">
      <div className="flex flex-col gap-y-5">
        <h4 className="text-lg font-medium text-gray-primary">Chọn ngày</h4>

        {/* button group */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-6">
          {/* active button */}
          <BadgePrimary className="text-white bg-green-btn">
            12/2/2023
          </BadgePrimary>

          {/* Default button */}
          <BadgePrimary>15/2/2023</BadgePrimary>
          <BadgePrimary>16/2/2023</BadgePrimary>
          <BadgePrimary>19/2/2023</BadgePrimary>
          <BadgePrimary>24/2/2023</BadgePrimary>
          <BadgePrimary>15/2/2023</BadgePrimary>
        </div>
        <CalendarPreview />
      </div>
    </div>
  )
}
