import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
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
        <TableHead>
          <TableRow>
            <TableCell>Thiên quan phù</TableCell>
            <TableCell align="right">Đại tướng quân</TableCell>
            <TableCell align="right">Địa quan phù</TableCell>
            <TableCell align="right">Lực sĩ </TableCell>
            <TableCell align="right">Tàm mệnh</TableCell>
            <TableCell align="right">Tuế hình</TableCell>
            <TableCell align="right">Đại sát</TableCell>
            <TableCell align="right">Phi liêm</TableCell>
            <TableCell align="right">Hoàng phan</TableCell>
            <TableCell align="right">Tang môn</TableCell>
            <TableCell align="right">Kim thần</TableCell>
            <TableCell align="right">Độc hỏa</TableCell>
            <TableCell align="right">Cẩu vĩ</TableCell>
            <TableCell align="right">Phá bại ngũ quỉ </TableCell>
            <TableCell align="right">Ngũ quỉ</TableCell>
            <TableCell align="right">Tàm quan</TableCell>
            <TableCell align="right">Tàm Thất</TableCell>
            <TableCell align="right">Bạch hổ</TableCell>
            <TableCell align="right">Điếu khách</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              {data.thien_quan_phu}
            </TableCell>
            <TableCell align="right">{data.dai_tuong_quan}</TableCell>
            <TableCell align="right">{data.dia_quan_phu}</TableCell>
            <TableCell align="right">{data.luc_si}</TableCell>
            <TableCell align="right">{data.tam_menh}</TableCell>
            <TableCell align="right">{data.tue_hinh}</TableCell>
            <TableCell align="right">{data.dai_sat}</TableCell>
            <TableCell align="right">{data.phi_liem}</TableCell>
            <TableCell align="right">{data.hoang_phan}</TableCell>
            <TableCell align="right">{data.tang_mon}</TableCell>
            <TableCell align="right">{data.kim_than}</TableCell>
            <TableCell align="right">{data.doc_hoa}</TableCell>
            <TableCell align="right">{data.cau_vi}</TableCell>
            <TableCell align="right">{data.pha_bai_ngu_qui}</TableCell>
            <TableCell align="right">{data.ngu_qui}</TableCell>
            <TableCell align="right">{data.tam_quan}</TableCell>
            <TableCell align="right">{data.tam_that}</TableCell>
            <TableCell align="right">{data.bach_ho}</TableCell>
            <TableCell align="right">{data.dieu_khach}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
