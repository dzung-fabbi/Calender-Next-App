import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

import type { TuPhuongHung } from '@/models'

interface TuPhuongHungTableProps {
  data: TuPhuongHung
}

export default function TuPhuongHungTable({ data }: TuPhuongHungTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="tau ma luc nham">
        <TableBody>
          <TableRow>
            <TableCell>Thiên quan phù: {data.thien_quan_phu}</TableCell>
            <TableCell>Đại sát:{data.dai_sat} </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Đại tướng quân: {data.dai_tuong_quan}</TableCell>
            <TableCell>Tàm Thất: {data.tam_that}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Địa quan phù:{data.dia_quan_phu} </TableCell>
            <TableCell>Bạch hổ: {data.bach_ho}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lực sĩ: {data.luc_si}</TableCell>
            <TableCell>Ngũ quỉ: {data.ngu_qui}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tàm mệnh: {data.tam_menh}</TableCell>
            <TableCell>Độc hỏa: {data.doc_hoa}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tuế hình:{data.tue_hinh} </TableCell>
            <TableCell>Phá bại ngũ quỉ: {data.pha_bai_ngu_qui}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Phi liêm: {data.phi_liem}</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tàm quan: {data.tam_quan}</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Hoàng phan: {data.hoang_phan}</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tang môn: {data.tang_mon}</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cẩu vĩ: {data.cau_vi}</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Điếu khách: {data.dieu_khach}</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kim thần: {data.kim_than}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
