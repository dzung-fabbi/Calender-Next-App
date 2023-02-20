import * as React from 'react'

import BadgeDateStatus from './BadgeDateStatus'

export default function CalendarPreview() {
  return (
    <div>
      <section className="flex items-center py-7 rounded-primary bg-datePreview">
        <div className="w-2/4 flex flex-col gap-y-[6px] relative">
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
        <div className="flex flex-col flex-1 w-2/4">
          <div className="flex">
            <div className="flex flex-col w-2/5">
              <h1 className="font-bold text-[5rem] leading-none text-left text-orange-primary">
                25
              </h1>
              <span className="font-semibold text-left">
                Tháng 11 (Âm Lịch)
              </span>
            </div>
            <div className="flex flex-col justify-end flex-1">
              <span className="font-semibold text-left">Năm nhâm dần</span>
              <span className="font-semibold text-left">Ngày ất dậu</span>
              <span className="font-semibold text-left">Tháng mậu thân</span>
            </div>
          </div>
          <ul className="flex pt-5">
            <li className="w-2/5">
              Ngày: <span className="font-semibold text-left">Giáp Ngọ</span>
            </li>
            <li>
              Tháng: <span className="font-semibold text-left">Nhâm Tý</span>
            </li>
          </ul>
          <ul className="flex">
            <li className="w-2/5">
              Năm: <span className="font-semibold text-left">Nhâm Dần</span>
            </li>
            <li>
              Tiết: <span className="font-semibold text-left">Đại Tuyết</span>
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
      <section>
        <div className="mt-[30px] bg-[#FD7770] rounded-t-primary py-[10px] pl-[20px] text-white">
          Giờ tốt trong ngày
        </div>
        <div className="px-[30px]">
          <div className="flex pl-[20px] border-b-[#E2E2E2]">
            <div className="flex w-1/3 py-4">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col pl-1">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
            <div className="flex w-1/3 py-4">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col pl-1">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
            <div className="flex w-1/3 py-4">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col pl-1">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
          </div>
          <div className="flex pl-[20px]">
            <div className="flex w-1/3 py-4">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col pl-1">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
            <div className="flex w-1/3 py-4">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col pl-1">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
            <div className="flex w-1/3 py-4">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col pl-1">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-[30px] bg-[#B9CBDC] rounded-t-primary py-[10px] pl-[20px] text-black">
          Giờ Xấu trong ngày
        </div>
        <div className="px-[30px]">
          <div className="flex pl-[20px] border-b-[#E2E2E2]">
            <div className="flex w-1/3 py-4">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col pl-1">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
            <div className="flex w-1/3 py-4">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col pl-1">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
            <div className="flex w-1/3 py-4">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col pl-1">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
          </div>
          <div className="flex pl-[20px]">
            <div className="flex w-1/3 py-4">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col pl-1">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
            <div className="flex w-1/3 py-4">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col pl-1">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
            <div className="flex w-1/3 py-4">
              <img src="/images/mouse.png" alt="" />
              <div className="flex flex-col pl-1">
                <span className="font-semibold text-left">Tý</span>
                <span>23:00 - 01:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-[30px] bg-[#FD7770] rounded-t-primary py-[10px] pl-[20px] text-white">
          Sao tốt xấu
        </div>
        <div className="flex flex-col p-5">
          <div className="flex items-center mb-4">
            <div className="rounded-[10px] h-[43px] w-[6px] bg-[#FD7770] mr-2"></div>
            <span className="font-semibold text-[#FD7770] mr-2">Sao tốt: </span>
            <span className="text-[#13A2FA] text-sm">
              Tứ tướng, Ô phệ, Kính an, Nguyệt không, Giải thần
            </span>
          </div>
          <div className="flex items-center">
            <div className="rounded-[10px] h-[43px] w-[6px] bg-[#B9CBDC] mr-2"></div>
            <span className="font-semibold text-[#292D32] mr-2">Sao xấu: </span>
            <span className="text-[#13A2FA] text-sm">
              Ngũ hư, Đại thời, Đại bại, Hàm trì, Nguyệt hại, Tiểu hao, Thiên
              lao
            </span>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-[30px] bg-[#FD7770] rounded-t-primary py-[10px] pl-[20px] text-white">
          Việc nên - Không nên làm
        </div>
        <div className="flex flex-col p-5">
          <div className="flex items-center mb-4">
            <div className="rounded-[10px] h-[43px] w-[6px] bg-[#FD7770] mr-2"></div>
            <span className="font-semibold text-[#FD7770] mr-2">Nên: </span>
            <span className="text-[#596370] text-sm">
              Cúng tế, tắm gội, chặt cây, săn bắn, cắt may, đuổi bắt, cắt tóc
              sửa móng
            </span>
          </div>
          <div className="flex items-center">
            <div className="rounded-[10px] h-[92px] min-w-[6px] bg-[#B9CBDC] mr-2"></div>
            <div className="font-semibold text-[#292D32] mr-2">
              Không nên:{' '}
              <span className="text-[#596370] text-sm font-normal">
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
