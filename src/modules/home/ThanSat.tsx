import { useEffect, useState } from 'react'

import homeApi from '@/api/home.api'
import {
  CaiSonHoangDaoTable,
  KhaiSonTuPhuongCatTable,
  KhaiSonTuPhuongHungTable,
  LapHuongHungTable,
  TamNguyenTuBachTable,
  TauMaLucNhamTable,
  ThongThienKhieuTable,
  TuPhuongHungTable,
} from '@/components/table'
import KhaiSonHungTable from '@/components/table/KhaiSonHungTable'
import type { ThanSatFormValue } from '@/models'

function ThanSat() {
  const [thanSatInfo, setThanSatInfo] = useState<ThanSatFormValue>()
  useEffect(() => {
    ;(async () => {
      try {
        const responseData = await homeApi.getThanSatInfo('quy mao')
        setThanSatInfo(responseData)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    })()
  }, [])
  if (!thanSatInfo) return null
  return (
    <div className="flex flex-col gap-y-10">
      <div>
        <h1 className="text-xl font-semibold capitalize">
          Khai sơn , lập hướng , tu phương cát
        </h1>
        <KhaiSonTuPhuongCatTable data={thanSatInfo.khai_son_tu_phuong_cat} />
      </div>

      <div>
        <h1 className="text-xl font-semibold capitalize">Tam nguyên Tử bạch</h1>
        <TamNguyenTuBachTable data={thanSatInfo.tam_nguyen_tu_bach} />
      </div>

      <div>
        <h1 className="text-xl font-semibold capitalize">Cai sơn Hoàng đạo</h1>
        <CaiSonHoangDaoTable data={thanSatInfo.cai_son_hoang_dao} />
      </div>

      <div>
        <h1 className="text-xl font-semibold capitalize">Thông thiên khiếu</h1>
        <ThongThienKhieuTable data={thanSatInfo.thong_thien_khieu} />
      </div>

      <div>
        <h1 className="text-xl font-semibold capitalize">Tẩu mã lục Nhâm</h1>
        <TauMaLucNhamTable data={thanSatInfo.tau_ma_luc_nham} />
      </div>

      <div>
        <h1 className="text-xl font-semibold capitalize">
          Khai sơn , lập hướng , tu phương hung
        </h1>
        <KhaiSonTuPhuongHungTable data={thanSatInfo.khai_son_tu_phuong_hung} />
      </div>
      <div>
        <h1 className="text-xl font-semibold capitalize">Khai sơn hung</h1>
        <KhaiSonHungTable data={thanSatInfo.khai_son_hung} />
      </div>

      <div>
        <h1 className="text-xl font-semibold capitalize">Lập hướng hung</h1>
        <LapHuongHungTable data={thanSatInfo.lap_huong_hung} />
      </div>

      <div>
        <h1 className="text-xl font-semibold capitalize">Tu phương hung</h1>
        <TuPhuongHungTable data={thanSatInfo.tu_phuong_hung} />
      </div>
    </div>
  )
}

export default ThanSat
