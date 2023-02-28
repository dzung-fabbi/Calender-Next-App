import * as React from 'react'

import { BadgeDateStatus } from '@/components/badge'
import { useStore } from '@/store/useStore'
import { DAYS, TIETKHI } from '@/utils/constant'
import {
  addZero,
  getDayName,
  getGioHoangDao,
  getLunarDate,
  getSunLongitude,
} from '@/utils/helpers'

export default function CalendarPreview() {
  const currentDate = useStore((state) => state.currentDate)
  const dayOfWeek = currentDate.day()
  const day = currentDate.format('DD')
  const month = currentDate.format('MM')
  const year = currentDate.format('YYYY')
  const currentLunarDate = getLunarDate(+day, +month, +year)
  const dayName = getDayName(currentLunarDate)
  const arrGioHD: any = getGioHoangDao(currentLunarDate.jd)

  return (
    <div>
      <p className="text-xl font-bold">Lịch tháng {month}</p>
      <section className="flex items-center py-7 rounded-primary bg-datePreview">
        <div className="w-5/12 flex flex-col gap-y-[6px] relative">
          <h4 className="font-medium text-[1.625rem] text-center">
            Tháng {month} năm {year}
          </h4>
          <h1 className="font-bold text-[8.75rem] text-primary leading-none text-center relative">
            {day}
            <div className="absolute left-2/3 top-0 rotate-[-31.24deg]">
              <BadgeDateStatus />
            </div>
          </h1>

          <span className="uppercase font-semibold text-[1.625rem] text-center">
            {DAYS[dayOfWeek]}
          </span>
        </div>
        <div className="w-1/6"></div>
        <div className="flex flex-col flex-1 w-5/12">
          <div className="flex">
            <div className="flex flex-col w-2/5">
              <h1 className="font-bold text-[5rem] leading-none text-left text-orange-primary">
                {addZero(currentLunarDate.day)}
              </h1>
              <span className="font-semibold text-left">
                Tháng {addZero(currentLunarDate.month)}{' '}
                {currentLunarDate.leap === 1 && 'Nhuận'} (Âm Lịch)
              </span>
            </div>
            <div className="flex flex-col justify-end flex-1">
              <span className="font-semibold text-left">Năm {dayName[2]}</span>
              <span className="font-semibold text-left">Ngày {dayName[0]}</span>
              <span className="font-semibold text-left">
                Tháng {dayName[1]}
              </span>
            </div>
          </div>
          <ul className="flex pt-5">
            <li className="w-2/5">
              Ngày:{' '}
              <span className="font-semibold text-left">{dayName[0]}</span>
            </li>
            <li>
              Tháng:{' '}
              <span className="font-semibold text-left">{dayName[1]}</span>
            </li>
          </ul>
          <ul className="flex">
            <li className="w-2/5">
              Năm: <span className="font-semibold text-left">{dayName[2]}</span>
            </li>
            <li>
              Tiết:{' '}
              <span className="font-semibold text-left">
                {TIETKHI[getSunLongitude(currentLunarDate.jd + 1, 7.0)]}
              </span>
            </li>
          </ul>
          <ul className="flex">
            <li>
              Ngày khởi tiết:{' '}
              <span className="font-semibold text-left">
                10:41 ngày 07/12/2022
              </span>
            </li>
          </ul>
          <ul className="flex">
            <li>
              Ngày chuyển tiết:{' '}
              <span className="font-semibold text-left">
                04:40 ngày 22/12/2022
              </span>
            </li>
          </ul>
        </div>
      </section>
      <section className="bg-[#FFFAF9] mt-30px rounded-primary">
        <div className="bg-primary rounded-t-primary py-[10px] pl-5 text-white">
          Giờ tốt trong ngày
        </div>
        <div className="px-[30px]">
          <div className="flex pl-5 border-b border-[#E2E2E2]">
            {[0, 1, 2].map((e: number) => {
              return (
                <div key={e} className="flex items-center w-1/3 py-4 gap-2.5">
                  <img src={arrGioHD[e].img} alt="" className="" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-left">
                      {arrGioHD[e].name}
                    </span>
                    <span>{arrGioHD[e].time}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex pl-5">
            {[3, 4, 5].map((e: number) => {
              return (
                <div key={e} className="flex items-center w-1/3 py-4 gap-2.5">
                  <img src={arrGioHD[e].img} alt="" className="" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-left">
                      {arrGioHD[e].name}
                    </span>
                    <span>{arrGioHD[e].time}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section className="bg-[#F2F7FC] mt-30px rounded-primary">
        <div className="bg-[#B9CBDC] rounded-t-primary py-[10px] pl-5 text-black">
          Giờ Xấu trong ngày
        </div>
        <div className="px-[30px]">
          <div className="flex pl-5 border-b border-[#E2E2E2]">
            <div className="flex items-center w-1/3 py-4 gap-2.5">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
            <div className="flex items-center w-1/3 py-4 gap-2.5">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
            <div className="flex items-center w-1/3 py-4 gap-2.5">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
          </div>
          <div className="flex pl-5">
            <div className="flex items-center w-1/3 py-4 gap-2.5">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
            <div className="flex items-center w-1/3 py-4 gap-2.5">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
            <div className="flex items-center w-1/3 py-4 gap-2.5">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#FFFAF9] mt-30px rounded-primary">
        <div className=" bg-primary rounded-t-primary py-[10px] pl-5 text-white">
          Sao tốt xấu
        </div>
        <div className="flex flex-col p-5">
          <div className="flex items-center mb-4">
            <div className="rounded-primary h-[43px] w-[6px] bg-primary mr-2"></div>
            <span className="mr-2 font-semibold text-primary">Sao tốt: </span>
            <span className="text-sm text-blue-tag">
              Tứ tướng, Ô phệ, Kính an, Nguyệt không, Giải thần
            </span>
          </div>
          <div className="flex items-center">
            <div className="rounded-primary h-[43px] w-[6px] bg-[#B9CBDC] mr-2"></div>
            <span className="mr-2 font-semibold">Sao xấu: </span>
            <span className="text-sm text-blue-tag">
              Ngũ hư, Đại thời, Đại bại, Hàm trì, Nguyệt hại, Tiểu hao, Thiên
              lao
            </span>
          </div>
        </div>
      </section>
      <section className="bg-[#FFFAF9] mt-30px rounded-primary">
        <div className="bg-primary rounded-t-primary py-[10px] pl-5 text-white">
          Việc nên - Không nên làm
        </div>
        <div className="flex flex-col p-5">
          <div className="flex items-center mb-4">
            <div className="rounded-primary h-[43px] w-[6px] bg-primary mr-2"></div>
            <span className="mr-2 font-semibold text-primary">Nên: </span>
            <span className="text-sm text-gray-primary">
              Cúng tế, tắm gội, chặt cây, săn bắn, cắt may, đuổi bắt, cắt tóc
              sửa móng
            </span>
          </div>
          <div className="flex items-center">
            <div className="rounded-primary h-[92px] min-w-[6px] bg-[#B9CBDC] mr-2"></div>
            <div className="mr-2 font-semibold">
              Không nên:
              <span className="text-sm font-normal text-gray-primary">
                Đội mũ cài trâm, đính hôn, ăn hỏi, cưới gả, thu nạp người, mời
                thầy chữa bệnh, đan dệt, nấu rượu, mở kho xuất tiền hàng, đánh
                cá, phá thổ, an táng, cải táng, Họp thân hữu, giải trừ, dựng cột
                gác xà, nạp tài, chăn nuôi, nạp gia súc, dâng biểu sớ, nhận
                phong tước vị, lên quan nhậm chức, gặp dân, di chuyển, đắp đê,
                tu tạo động thổ, sửa kho, xếp đặt buồng đẻ, gieo trồng, cầu phúc
                cầu tự, khai trương, đi thuyền, xuất hành, kê giường, lợp mái,
                lập ước, giao dịch
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
