import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

import type { KhaiSonTuPhuongHung } from '@/models'

interface KhaiSonTuPhuongHungTableProps {
  data: KhaiSonTuPhuongHung
}

export default function KhaiSonTuPhuongHungTable({
  data,
}: KhaiSonTuPhuongHungTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="than sat">
        <TableHead>
          <TableRow>
            <TableCell>Thái tuế</TableCell>
            <TableCell align="right">Tuế phá</TableCell>
            <TableCell align="right">Tam sát</TableCell>
            <TableCell align="right">Tọa sát hướng sát</TableCell>
            <TableCell align="right">Phù thiên không vong </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              {data.thai_tue}
            </TableCell>
            <TableCell align="right">{data.tue_pha}</TableCell>
            <TableCell align="right">{data.tam_sat}</TableCell>
            <TableCell align="right">{data.toa_sat_huong_sat}</TableCell>
            <TableCell align="right">{data.phu_thien_khong_vong}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
