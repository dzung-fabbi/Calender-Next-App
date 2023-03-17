import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

import type { AmPhuThaiTue } from '@/models'

interface AmPhuThaiTueTableProps {
  data: AmPhuThaiTue
}

export default function AmPhuThaiTueTable({ data }: AmPhuThaiTueTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="am phu thai tue">
        <TableHead>
          <TableRow>
            <TableCell>Âm phủ Thái tuế</TableCell>
            <TableCell align="right">lục hại</TableCell>
            <TableCell align="right">Tử phù</TableCell>
            <TableCell align="right">Cứu thoái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              {data.am_phu_thai_tue}
            </TableCell>
            <TableCell align="right">{data.luc_hai}</TableCell>
            <TableCell align="right">{data.tu_phu}</TableCell>
            <TableCell align="right">{data.cuu_thoai}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
