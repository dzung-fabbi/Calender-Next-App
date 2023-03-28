import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useEffect, useState } from 'react'

import homeApi from '@/api/home.api'
import type { ThanSatFormValue } from '@/models'
import { useStore } from '@/store/useStore'
import { getDayName, getLunarDate } from '@/utils/helpers'

function ThanSat() {
  const currentDate = useStore((state) => state.currentDate)
  const day = currentDate.format('DD')
  const month = currentDate.format('MM')
  const year = currentDate.format('YYYY')
  const currentLunarDate = getLunarDate(+day, +month, +year)
  const dayName = getDayName(currentLunarDate)

  const [thanSatInfo, setThanSatInfo] = useState<ThanSatFormValue>()
  useEffect(() => {
    ;(async () => {
      try {
        const responseData = await homeApi.getThanSatInfo(dayName[2] || '')
        setThanSatInfo(responseData)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    })()
  }, [currentDate])
  if (!thanSatInfo) return null
  return (
    <div className="flex flex-col gap-y-10">
      <TableContainer component={Paper}>
        <Table aria-label="am phu thai tue">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Khảm
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Cấn
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" colSpan={3}>
                Bắc{' '}
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Đông bắc{' '}
              </TableCell>
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" colSpan={3}>
                337,5 độ{' '}
              </TableCell>
              <TableCell align="center" colSpan={3}>
                22,5 độ{' '}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center" colSpan={6}></TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" colSpan={1}>
                Nhâm
              </TableCell>
              <TableCell align="center" colSpan={1}>
                Tý
              </TableCell>
              <TableCell align="center" colSpan={1}>
                Quý
              </TableCell>
              <TableCell align="center" colSpan={1}>
                Sửu
              </TableCell>
              <TableCell align="center" colSpan={1}>
                Cấn
              </TableCell>
              <TableCell align="center" colSpan={1}>
                Dần
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left" colSpan={1}>
                337,5 độ
              </TableCell>
              <TableCell align="left" colSpan={1}>
                352,5 độ
              </TableCell>
              <TableCell align="left" colSpan={1}>
                7,5 độ
              </TableCell>
              <TableCell align="left" colSpan={1}>
                22,5 độ
              </TableCell>
              <TableCell align="left" colSpan={1}>
                37,5 độ
              </TableCell>
              <TableCell align="left" colSpan={1}>
                52,5 độ
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div>
        <h1 className="text-xl font-semibold capitalize">
          Khai sơn , lập hướng , tu phương cát
        </h1>
        {thanSatInfo.khai_son_tu_phuong_cat.length > 0 && (
          <KhaiSonTuPhuongCatTable data={thanSatInfo.khai_son_tu_phuong_cat} />
        )}
      </div>

      <div>
        <h1 className="text-xl font-semibold capitalize">Tam nguyên Tử bạch</h1>
        {thanSatInfo.tam_nguyen_tu_bach.length > 0 && (
          <TamNguyenTuBachTable data={thanSatInfo.tam_nguyen_tu_bach} />
        )}
      </div>

      <div>
        <h1 className="text-xl font-semibold capitalize">Cai sơn Hoàng đạo</h1>
        {thanSatInfo.cai_son_hoang_dao && (
          <CaiSonHoangDaoTable data={thanSatInfo.cai_son_hoang_dao} />
        )}
      </div>

      <div>
        <h1 className="text-xl font-semibold capitalize">Thông thiên khiếu</h1>
        {thanSatInfo.thong_thien_khieu && (
          <ThongThienKhieuTable data={thanSatInfo.thong_thien_khieu} />
        )}
      </div>

      <div>
        <h1 className="text-xl font-semibold capitalize">Tẩu mã lục Nhâm</h1>
        {thanSatInfo.tau_ma_luc_nham && (
          <TauMaLucNhamTable data={thanSatInfo.tau_ma_luc_nham} />
        )}
      </div>

      <div>
        <h1 className="text-xl font-semibold capitalize">
          Khai sơn , lập hướng , tu phương hung
        </h1>
        {thanSatInfo.khai_son_tu_phuong_hung && (
          <KhaiSonTuPhuongHungTable
            data={thanSatInfo.khai_son_tu_phuong_hung}
          />
        )}
      </div>
      <div>
        <h1 className="text-xl font-semibold capitalize">Khai sơn hung</h1>
        <div className="flex items-center my-2">
          <div className="flex mr-2 font-semibold border-left-infor ugly good">
            <div className="py-3 pl-3">
              Niên khắc sơn gia:
              <span className="ml-1 italic font-normal text-gray-primary">
                {thanSatInfo.khai_son_hung?.nien_khac_son_gia}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-semibold capitalize">Âm phủ Thái tuế</h1>
        {thanSatInfo.am_phu_thai_tue && (
          <AmPhuThaiTueTable data={thanSatInfo.am_phu_thai_tue} />
        )}
      </div>

      <div>
        <h1 className="text-xl font-semibold capitalize">Lập hướng hung</h1>
        {thanSatInfo.lap_huong_hung && (
          <LapHuongHungTable data={thanSatInfo.lap_huong_hung} />
        )}
      </div>

      <div>
        <h1 className="text-xl font-semibold capitalize">Tu phương hung</h1>
        {thanSatInfo.tu_phuong_hung && (
          <TuPhuongHungTable data={thanSatInfo.tu_phuong_hung} />
        )}
      </div>
      <div>
        <h1 className="text-xl font-semibold capitalize">
          khai sơn, lập hướng, tu phương cát
        </h1>
        {thanSatInfo.lap_huong_hung_thang.length > 0 && (
          <TableMonth data={thanSatInfo.lap_huong_hung_thang} />
        )}
      </div>

      <div>
        <h1 className="text-xl font-semibold capitalize">Khai sơn hung</h1>
        {thanSatInfo.khai_son_hung_thang.length > 0 && (
          <TableMonth data={thanSatInfo.khai_son_hung_thang} />
        )}
      </div>

      <div>
        <h1 className="text-xl font-semibold capitalize">Tu Phương Hung</h1>
        {thanSatInfo.tu_phuong_hung_thang.length > 0 && (
          <TableMonth data={thanSatInfo.tu_phuong_hung_thang} />
        )}
      </div> */}
    </div>
  )
}

export default ThanSat
