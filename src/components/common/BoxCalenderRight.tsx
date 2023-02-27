/* eslint-disable tailwindcss/no-custom-classname */
import { TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

import { Card } from '../card'
import { IconAkarChevronDown } from '../icon'

export default function BoxCalenderRight() {
  const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()))
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  const titleCalendar = useMemo(() => {
    return value?.format('dddd, D MMMM, YYYY')
  }, [value])
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section className="bg-[#F3F4F3] h-[100vh] py-10 px-5 rounded-l-30px min-w-[25.625rem] shrink-0">
        <Card>
          <DatePicker
            views={['year', 'month']}
            // minDate={dayjs('2012-03-01')}
            // maxDate={dayjs('2023-06-01')}
            value={value}
            onChange={(newValue) => {
              setValue(newValue)
            }}
            open={isOpenCalendar}
            onClose={() => setIsOpenCalendar(false)}
            renderInput={(params) => (
              <div
                className="flex items-center cursor-pointer hover:opacity-80 w-fit"
                onClick={() => setIsOpenCalendar(!isOpenCalendar)}
              >
                <p className="text-xl text-left">{titleCalendar}</p>
                <TextField
                  style={{ opacity: 0, width: 0, height: 0 }}
                  {...params}
                  InputProps={{ className: 'hidden-input-calendar' }}
                />
                <div className="p-1.5 hover:bg-[#E7E7E7] rounded-full transition-all duration-200">
                  <IconAkarChevronDown />
                </div>
              </div>
            )}
          />
          <div className="lvn-lichad-lichmain bg-[#FAFBFA] p-3 rounded-2xl mt-4">
            <div className="grid grid-cols-7 gap-2 mb-3">
              <div className="font-semibold">Hai</div>
              <div className="font-semibold">Ba</div>
              <div className="font-semibold">Bốn</div>
              <div className="font-semibold">Năm</div>
              <div className="font-semibold">Sáu</div>
              <div className="font-semibold">Bảy</div>
              <div className="font-semibold text-primary">CN</div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              <div className="lvn-lichad-col lvn-lichad-colhide">
                <a href="#" title="Xem lịch âm ngày 26 tháng 12 năm 2022">
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span>26</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    4
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col lvn-lichad-colhide">
                <a href="#" title="Xem lịch âm ngày 27 tháng 12 năm 2022">
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span>27</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    5
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col lvn-lichad-colhide">
                <a href="#" title="Xem lịch âm ngày 28 tháng 12 năm 2022">
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span>28</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    6
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col lvn-lichad-colhide">
                <a href="#" title="Xem lịch âm ngày 29 tháng 12 năm 2022">
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span>29</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    7
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col lvn-lichad-colhide">
                <a href="#" title="Xem lịch âm ngày 30 tháng 12 năm 2022">
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span>30</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    8
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col lvn-lichad-colhide">
                <a href="#" title="Xem lịch âm ngày 31 tháng 12 năm 2022">
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span>31</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    9
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=" holiday"
                  href="#"
                  title="Xem lịch âm ngày 1 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd lichad-sunday text-lg font-semibold">
                    <span className="day">1</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    10
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 2 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">2</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    11
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 3 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">3</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    12
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 4 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">4</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    13
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 5 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">5</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    14
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=" other"
                  href="#"
                  title="Xem lịch âm ngày 6 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">6</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    15
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 7 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">7</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    16
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 8 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd lichad-sunday text-lg font-semibold">
                    <span className="day">8</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    17
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=" other"
                  href="#"
                  title="Xem lịch âm ngày 9 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">9</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    18
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 10 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">10</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    19
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 11 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">11</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    20
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 12 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">12</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    21
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 13 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">13</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    22
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=" other"
                  href="#"
                  title="Xem lịch âm ngày 14 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">14</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    23
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 15 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd lichad-sunday text-lg font-semibold">
                    <span className="day">15</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    24
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 16 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">16</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    25
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 17 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">17</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    26
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col today">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 18 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">18</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    27
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 19 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">19</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    28
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 20 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">20</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    29
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=" holiday"
                  href="#"
                  title="Xem lịch âm ngày 21 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">21</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    30
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=" holiday"
                  href="#"
                  title="Xem lịch âm ngày 22 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd lichad-sunday text-lg font-semibold">
                    <span className="day">22</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    1/1
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=" holiday"
                  href="#"
                  title="Xem lịch âm ngày 23 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">23</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    2
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=" holiday"
                  href="#"
                  title="Xem lịch âm ngày 24 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">24</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    3
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 25 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">25</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    4
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 26 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">26</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    5
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 27 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">27</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    6
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 28 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">28</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    7
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 29 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd lichad-sunday text-lg font-semibold">
                    <span className="day">29</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    8
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=""
                  href="#"
                  title="Xem lịch âm ngày 30 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">30</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    9
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col">
                <a
                  className=" other"
                  href="#"
                  title="Xem lịch âm ngày 31 tháng 1 năm 2023"
                >
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span className="day">31</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    10
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col lvn-lichad-colhide">
                <a href="#" title="Xem lịch âm ngày 1 tháng 2 năm 2023">
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span>1</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    11
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col lvn-lichad-colhide">
                <a href="#" title="Xem lịch âm ngày 2 tháng 2 năm 2023">
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span>2</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    12
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col lvn-lichad-colhide">
                <a href="#" title="Xem lịch âm ngày 3 tháng 2 năm 2023">
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span>3</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    13
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col lvn-lichad-colhide">
                <a href="#" title="Xem lịch âm ngày 4 tháng 2 năm 2023">
                  <div className="lvn-lichad-dd text-lg font-semibold ">
                    <span>4</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    14
                  </span>
                </a>
              </div>
              <div className="lvn-lichad-col lvn-lichad-colhide">
                <a href="#" title="Xem lịch âm ngày 5 tháng 2 năm 2023">
                  <div className="lvn-lichad-dd lichad-sunday text-lg font-semibold">
                    <span>5</span>
                  </div>
                  <span className="lvn-lichad-da text-sm text-gray-primary">
                    15/1
                  </span>
                </a>
              </div>
            </div>
          </div>
          <p className="mt-4 text-lg font-semibold text-left">Chú thích</p>
          <div className="flex pl-2">
            <span className="good-day w-2/5 text-left">Ngày đẹp</span>
            <span className="ugly-day">Ngày xấu</span>
          </div>
          <p className="my-4 text-lg font-semibold text-left">
            Ngày này năm xưa
          </p>
          <div className="flex pl-2">
            <img className="mr-2" src="/images/celebrate.png" alt="" />
            <div className="flex flex-col">
              <span className="text-sm font-normal text-left text-gray-primary">
                26/12/1991
              </span>
              <span className="font-medium ">
                Liên bang Liên Xô tuyên bố tan rã
              </span>
            </div>
          </div>
        </Card>
      </section>
    </LocalizationProvider>
  )
}
