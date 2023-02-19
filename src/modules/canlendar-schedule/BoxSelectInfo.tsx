import * as React from 'react'

export default function BoxSelectInfo() {
  return (
    <div className="flex flex-col p-5 pt-3 border border-primary rounded-primary gap-y-5">
      <h4 className="font-medium text-gray-primary">
        Lựa chọn thời gian sắp đặt lịch làm việc của bạn!
      </h4>
      <div>
        <input type="text" className="input input-secondary h-[62px]" />
      </div>
      <div className="flex justify-end">
        <button className="btn btn-primary">Gửi</button>
      </div>
    </div>
  )
}
