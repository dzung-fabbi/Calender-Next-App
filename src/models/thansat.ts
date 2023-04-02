export interface KhaiSonTuPhuongCat {
  star_name: string
  direction: string
}
export interface TamNguyenTuBach {
  nguyen: string
  bach_1: string
  bach_6: string
  bach_8: string
  tu_9: string
}
export interface CaiSonHoangDao {
  tham_lang: string
  cu_mon: string
  vu_khuc: string
  van_khuc: string
}

export interface ThongThienKhieu {
  truoc_phuong_tam_hop: string
  sau_phuong_tam_hop: string
  note: string
}

export interface TauMaLucNham {
  than_hau: string
  cong_tao: string
  thien_cuong: string
  thang_quang: string
  truyen_tong: string
  ha_khoi: string
  note: string
}
export interface KhaiSonTuPhuongHung {
  thai_tue: string
  tue_pha: string
  tam_sat: string
  toa_sat_huong_sat: string
  phu_thien_khong_vong: string
}

export interface KhaiSonHung {
  nien_khac_son_gia: string
}

export interface AmPhuThaiTue {
  am_phu_thai_tue: string
  luc_hai: string
  tu_phu: string
  cuu_thoai: string
}

export interface LapHuongHung {
  tuan_son_la_hau: string
  benh_phu: string
}

export interface TuPhuongHung {
  thien_quan_phu: string
  dai_tuong_quan: string
  dia_quan_phu: string
  luc_si: string
  tam_that: string
  tam_menh: string
  tue_hinh: string
  hoang_phan: string
  phi_liem: string
  tang_mon: string
  tam_quan: string
  dieu_khach: string
  kim_than: string
  doc_hoa: string
  pha_bai_ngu_qui: string
  dai_sat: string
  bach_ho: string
  ngu_qui: string
  cau_vi: string
}

export interface MonthOfYear {
  month_1: string
  month_2: string
  month_3: string
  month_4: string
  month_5: string
  month_6: string
  month_7: string
  month_8: string
  month_9: string
  month_10: string
  month_11: string
  month_12: string
}
export type KhaiSonHungThang = {
  star_name: string
} & MonthOfYear

export type TamKyThang = {
  tam_ky: string
} & MonthOfYear

export interface ThanSatFormValue {
  khai_son_tu_phuong_cat: KhaiSonTuPhuongCat[]
  tam_nguyen_tu_bach: TamNguyenTuBach[]
  cai_son_hoang_dao: CaiSonHoangDao | null
  thong_thien_khieu: ThongThienKhieu | null
  tau_ma_luc_nham: TauMaLucNham | null
  khai_son_tu_phuong_hung: KhaiSonTuPhuongHung | null
  khai_son_hung: KhaiSonHung | null
  am_phu_thai_tue: AmPhuThaiTue | null
  lap_huong_hung: LapHuongHung | null
  tu_phuong_hung: TuPhuongHung | null
  lap_huong_hung_thang: KhaiSonHungThang[]
  khai_son_hung_thang: KhaiSonHungThang[]
  tu_phuong_hung_thang: KhaiSonHungThang[]
  than_sat_by_month: []
  than_sat_by_year: []
}
