/**
 * Copyright 2004 Ho Ngoc Duc [http://come.to/duc]. All Rights Reserved.<p>
 * Permission to use, copy, modify, and redistribute this software and its
 * documentation for personal, non-commercial use is hereby granted provided that
 * this copyright notice appears in all copies.
 */

import dayjs from 'dayjs'

export const ABOUT =
  '\u00C2m l\u1ECBch Vi\u1EC7t Nam - Version 0.8' +
  '\n\u00A9 2004 H\u1ED3 Ng\u1ECDc \u0110\u1EE9c [http://come.to/duc]'
export const TK19 = [
  0x30baa3, 0x56ab50, 0x422ba0, 0x2cab61, 0x52a370, 0x3c51e8, 0x60d160,
  0x4ae4b0, 0x376926, 0x58daa0, 0x445b50, 0x3116d2, 0x562ae0, 0x3ea2e0,
  0x28e2d2, 0x4ec950, 0x38d556, 0x5cb520, 0x46b690, 0x325da4, 0x5855d0,
  0x4225d0, 0x2ca5b3, 0x52a2b0, 0x3da8b7, 0x60a950, 0x4ab4a0, 0x35b2a5,
  0x5aad50, 0x4455b0, 0x302b74, 0x562570, 0x4052f9, 0x6452b0, 0x4e6950,
  0x386d56, 0x5e5aa0, 0x46ab50, 0x3256d4, 0x584ae0, 0x42a570, 0x2d4553,
  0x50d2a0, 0x3be8a7, 0x60d550, 0x4a5aa0, 0x34ada5, 0x5a95d0, 0x464ae0,
  0x2eaab4, 0x54a4d0, 0x3ed2b8, 0x64b290, 0x4cb550, 0x385757, 0x5e2da0,
  0x4895d0, 0x324d75, 0x5849b0, 0x42a4b0, 0x2da4b3, 0x506a90, 0x3aad98,
  0x606b50, 0x4c2b60, 0x359365, 0x5a9370, 0x464970, 0x306964, 0x52e4a0,
  0x3cea6a, 0x62da90, 0x4e5ad0, 0x392ad6, 0x5e2ae0, 0x4892e0, 0x32cad5,
  0x56c950, 0x40d4a0, 0x2bd4a3, 0x50b690, 0x3a57a7, 0x6055b0, 0x4c25d0,
  0x3695b5, 0x5a92b0, 0x44a950, 0x2ed954, 0x54b4a0, 0x3cb550, 0x286b52,
  0x4e55b0, 0x3a2776, 0x5e2570, 0x4852b0, 0x32aaa5, 0x56e950, 0x406aa0,
  0x2abaa3, 0x50ab50,
] /* Years 2000-2099 */

export const TK20 = [
  0x3c4bd8, 0x624ae0, 0x4ca570, 0x3854d5, 0x5cd260, 0x44d950, 0x315554,
  0x5656a0, 0x409ad0, 0x2a55d2, 0x504ae0, 0x3aa5b6, 0x60a4d0, 0x48d250,
  0x33d255, 0x58b540, 0x42d6a0, 0x2cada2, 0x5295b0, 0x3f4977, 0x644970,
  0x4ca4b0, 0x36b4b5, 0x5c6a50, 0x466d50, 0x312b54, 0x562b60, 0x409570,
  0x2c52f2, 0x504970, 0x3a6566, 0x5ed4a0, 0x48ea50, 0x336a95, 0x585ad0,
  0x442b60, 0x2f86e3, 0x5292e0, 0x3dc8d7, 0x62c950, 0x4cd4a0, 0x35d8a6,
  0x5ab550, 0x4656a0, 0x31a5b4, 0x5625d0, 0x4092d0, 0x2ad2b2, 0x50a950,
  0x38b557, 0x5e6ca0, 0x48b550, 0x355355, 0x584da0, 0x42a5b0, 0x2f4573,
  0x5452b0, 0x3ca9a8, 0x60e950, 0x4c6aa0, 0x36aea6, 0x5aab50, 0x464b60,
  0x30aae4, 0x56a570, 0x405260, 0x28f263, 0x4ed940, 0x38db47, 0x5cd6a0,
  0x4896d0, 0x344dd5, 0x5a4ad0, 0x42a4d0, 0x2cd4b4, 0x52b250, 0x3cd558,
  0x60b540, 0x4ab5a0, 0x3755a6, 0x5c95b0, 0x4649b0, 0x30a974, 0x56a4b0,
  0x40aa50, 0x29aa52, 0x4e6d20, 0x39ad47, 0x5eab60, 0x489370, 0x344af5,
  0x5a4970, 0x4464b0, 0x2c74a3, 0x50ea50, 0x3d6a58, 0x6256a0, 0x4aaad0,
  0x3696d5, 0x5c92e0,
] /* Years 1900-1999 */

export const TK21 = [
  0x46c960, 0x2ed954, 0x54d4a0, 0x3eda50, 0x2a7552, 0x4e56a0, 0x38a7a7,
  0x5ea5d0, 0x4a92b0, 0x32aab5, 0x58a950, 0x42b4a0, 0x2cbaa4, 0x50ad50,
  0x3c55d9, 0x624ba0, 0x4ca5b0, 0x375176, 0x5c5270, 0x466930, 0x307934,
  0x546aa0, 0x3ead50, 0x2a5b52, 0x504b60, 0x38a6e6, 0x5ea4e0, 0x48d260,
  0x32ea65, 0x56d520, 0x40daa0, 0x2d56a3, 0x5256d0, 0x3c4afb, 0x6249d0,
  0x4ca4d0, 0x37d0b6, 0x5ab250, 0x44b520, 0x2edd25, 0x54b5a0, 0x3e55d0,
  0x2a55b2, 0x5049b0, 0x3aa577, 0x5ea4b0, 0x48aa50, 0x33b255, 0x586d20,
  0x40ad60, 0x2d4b63, 0x525370, 0x3e49e8, 0x60c970, 0x4c54b0, 0x3768a6,
  0x5ada50, 0x445aa0, 0x2fa6a4, 0x54aad0, 0x4052e0, 0x28d2e3, 0x4ec950,
  0x38d557, 0x5ed4a0, 0x46d950, 0x325d55, 0x5856a0, 0x42a6d0, 0x2c55d4,
  0x5252b0, 0x3ca9b8, 0x62a930, 0x4ab490, 0x34b6a6, 0x5aad50, 0x4655a0,
  0x2eab64, 0x54a570, 0x4052b0, 0x2ab173, 0x4e6930, 0x386b37, 0x5e6aa0,
  0x48ad50, 0x332ad5, 0x582b60, 0x42a570, 0x2e52e4, 0x50d160, 0x3ae958,
  0x60d520, 0x4ada90, 0x355aa6, 0x5a56d0, 0x462ae0, 0x30a9d4, 0x54a2d0,
  0x3ed150, 0x28e952,
] /* Years 2000-2099 */

export const TK22 = [
  0x4eb520, 0x38d727, 0x5eada0, 0x4a55b0, 0x362db5, 0x5a45b0, 0x44a2b0,
  0x2eb2b4, 0x54a950, 0x3cb559, 0x626b20, 0x4cad50, 0x385766, 0x5c5370,
  0x484570, 0x326574, 0x5852b0, 0x406950, 0x2a7953, 0x505aa0, 0x3baaa7,
  0x5ea6d0, 0x4a4ae0, 0x35a2e5, 0x5aa550, 0x42d2a0, 0x2de2a4, 0x52d550,
  0x3e5abb, 0x6256a0, 0x4c96d0, 0x3949b6, 0x5e4ab0, 0x46a8d0, 0x30d4b5,
  0x56b290, 0x40b550, 0x2a6d52, 0x504da0, 0x3b9567, 0x609570, 0x4a49b0,
  0x34a975, 0x5a64b0, 0x446a90, 0x2cba94, 0x526b50, 0x3e2b60, 0x28ab61,
  0x4c9570, 0x384ae6, 0x5cd160, 0x46e4a0, 0x2eed25, 0x54da90, 0x405b50,
  0x2c36d3, 0x502ae0, 0x3a93d7, 0x6092d0, 0x4ac950, 0x32d556, 0x58b4a0,
  0x42b690, 0x2e5d94, 0x5255b0, 0x3e25fa, 0x6425b0, 0x4e92b0, 0x36aab6,
  0x5c6950, 0x4674a0, 0x31b2a5, 0x54ad50, 0x4055a0, 0x2aab73, 0x522570,
  0x3a5377, 0x6052b0, 0x4a6950, 0x346d56, 0x585aa0, 0x42ab50, 0x2e56d4,
  0x544ae0, 0x3ca570, 0x2864d2, 0x4cd260, 0x36eaa6, 0x5ad550, 0x465aa0,
  0x30ada5, 0x5695d0, 0x404ad0, 0x2aa9b3, 0x50a4d0, 0x3ad2b7, 0x5eb250,
  0x48b540, 0x33d556,
] /* Years 2100-2199 */

export const TIETKHI = [
  'Xuân Phân',
  'Thanh Minh',
  'Cốc Vũ',
  'Lập Hạ',
  'Tiểu Mãn',
  'Mang Chủng',
  'Hạ Chí',
  'Tiểu Thử',
  'Đại Thử',
  'Lập Thu',
  'Xử Thử',
  'Bạch Lộ',
  'Thu Phân',
  'Hàn Lộ',
  'Sương Giáng',
  'Lập Đông',
  'Tiểu Tuyết',
  'Đại Tuyết',
  'Đông Chí',
  'Tiểu Hàn',
  'Đại Hàn',
  'Lập Xuân',
  'Vũ Thủy',
  'Kinh Trập',
]

export const CAN = [
  'Giáp',
  'Ất',
  'Bính',
  'Đinh',
  'Mậu',
  'Kỷ',
  'Canh',
  'Tân',
  'Nhâm',
  'Quý',
]

export const CHI = [
  'Tý',
  'Sửu',
  'Dần',
  'Mão',
  'Thìn',
  'Tỵ',
  'Ngọ',
  'Mùi',
  'Thân',
  'Dậu',
  'Tuất',
  'Hợi',
]

export const HOURS = [
  {
    min: 0,
    max: 2,
    chi: 'Tý',
  },
  {
    min: 2,
    max: 4,
    chi: 'Sửu',
  },
  {
    min: 4,
    max: 6,
    chi: 'Dần',
  },
  {
    min: 6,
    max: 8,
    chi: 'Mão',
  },
  {
    min: 8,
    max: 10,
    chi: 'Thìn',
  },
  {
    min: 10,
    max: 12,
    chi: 'Tị',
  },
  {
    min: 12,
    max: 14,
    chi: 'Ngọ',
  },
  {
    min: 14,
    max: 16,
    chi: 'Mùi',
  },
  {
    min: 16,
    max: 18,
    chi: 'Thân',
  },
  {
    min: 18,
    max: 20,
    chi: 'Dậu',
  },
  {
    min: 20,
    max: 22,
    chi: 'Tuất',
  },
  {
    min: 22,
    max: 24,
    chi: 'Hợi',
  },
]

export const ICON_CHI = [
  '/images/chi/ty.png',
  '/images/chi/suu.png',
  '/images/chi/dan.png',
  '/images/chi/mao.png',
  '/images/chi/thin.png',
  '/images/chi/ti.png',
  '/images/chi/ngo.png',
  '/images/chi/mui.png',
  '/images/chi/than.png',
  '/images/chi/dau.png',
  '/images/chi/tuat.png',
  '/images/chi/hoi.png',
]

export const DAYS = [
  'CHỦ NHẬT',
  'THỨ HAI',
  'THỨ BA',
  'THỨ TƯ',
  'THỨ NĂM',
  'THỨ SÁU',
  'THỨ BẢY',
]

export const LOWER_DAYS = [
  'Chủ Nhật',
  'Thứ Hai',
  'Thứ Ba',
  'Thứ Tư',
  'Thứ Năm',
  'Thứ Sáu',
  'Thứ Bảy',
]

export const GIO_HD = [
  '110100101100',
  '001101001011',
  '110011010010',
  '101100110100',
  '001011001101',
  '010010110011',
]

export const DIRECTIONS: any = {
  Nhâm: 'Bắc',
  Tý: 'Bắc',
  Quý: 'Bắc',
  Sửu: 'Đông Bắc',
  Cấn: 'Đông Bắc',
  Dần: 'Đông Bắc',
  Giáp: 'Đông',
  Mão: 'Đông',
  Ất: 'Đông',
  Thìn: 'Đông Nam',
  Tốn: 'Đông Nam',
  Tỵ: 'Đông Nam',
  Bính: 'Nam',
  Ngọ: 'Nam',
  Đinh: 'Nam',
  Mùi: 'Tây Nam',
  Khôn: 'Tây Nam',
  Thân: 'Tây Nam',
  Canh: 'Tây',
  Dậu: 'Tây',
  Tân: 'Tây',
  Tuất: 'Tây Bắc',
  Càn: 'Tây Bắc',
  Hợi: 'Tây Bắc',
}

export const TIME_DATA: any = {
  Tý: {
    img: '/images/chi/ty.png',
    time: '23:00 - 01:00',
  },
  Sửu: {
    img: '/images/chi/suu.png',
    time: '01:00 - 03:00',
  },
  Dần: {
    img: '/images/chi/dan.png',
    time: '03:00 - 05:00',
  },
  Mão: {
    img: '/images/chi/mao.png',
    time: '05:00 - 07:00',
  },
  Thìn: {
    img: '/images/chi/thin.png',
    time: '07:00 - 09:00',
  },
  Tỵ: {
    img: '/images/chi/ti.png',
    time: '09:00 - 11:00',
  },
  Ngọ: {
    img: '/images/chi/ngo.png',
    time: '11:00 - 13:00',
  },
  Mùi: {
    img: '/images/chi/mui.png',
    time: '13:00 - 15:00',
  },
  Thân: {
    img: '/images/chi/than.png',
    time: '15:00 - 17:00',
  },
  Dậu: {
    img: '/images/chi/dau.png',
    time: '17:00 - 19:00',
  },
  Tuất: {
    img: '/images/chi/tuat.png',
    time: '19:00 - 21:00',
  },
  Hợi: {
    img: '/images/chi/hoi.png',
    time: '21:00 - 23:00',
  },
}

export const MODE_TAB_HEADER = {
  PREVIEW: 1,
  CALENDAR_CHANGE: 2,
  THAN_SAT: 3,
}
export const DATE_FORMAT = 'DD/MM/YYYY'
export const isValidDate = (date: string) =>
  dayjs(date, DATE_FORMAT, true).isValid()
