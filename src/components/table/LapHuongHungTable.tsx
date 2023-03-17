import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

import type { LapHuongHung } from '@/models'

interface LapHuongHungTableProps {
  data: LapHuongHung
}

export default function LapHuongHungTable({ data }: LapHuongHungTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>Tuần sơn La hầu</TableCell>
            <TableCell align="right">Bệnh phù</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              {data.tuan_son_la_hau}
            </TableCell>
            <TableCell align="right">{data.benh_phu}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
