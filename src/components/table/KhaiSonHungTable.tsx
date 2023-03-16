import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

import type { KhaiSonHung } from '@/models'

interface KhaiSonHungTableProps {
  data: KhaiSonHung
}

export default function KhaiSonHungTable({ data }: KhaiSonHungTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="tau ma luc nham">
        <TableHead>
          <TableRow>
            <TableCell>Niên khắc sơn gia</TableCell>
            <TableCell align="right">Âm phủ Thái tuế</TableCell>
            <TableCell align="right">lục hại</TableCell>
            <TableCell align="right">Tử phù</TableCell>
            <TableCell align="right">Cứu thoái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              {data.nien_khac_son_gia}
            </TableCell>
            <TableCell align="right">{data.am_phu_thai_tue}</TableCell>
            <TableCell align="right">{data.luc_hai}</TableCell>
            <TableCell align="right">{data.tu_phu}</TableCell>
            <TableCell align="right">{data.cuu_thoai}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
