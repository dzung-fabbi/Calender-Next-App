import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

import type { CaiSonHoangDao } from '@/models'

interface CaiSonHoangDaoTableProps {
  data: CaiSonHoangDao
}

export default function CaiSonHoangDaoTable({
  data,
}: CaiSonHoangDaoTableProps) {
  return data ? (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ fontWeight: '700' }}>
            <TableCell>Tham lang</TableCell>
            <TableCell align="right">Cự môn</TableCell>
            <TableCell align="right">Vũ khúc</TableCell>
            <TableCell align="right">Văn khúc</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              {data.tham_lang}
            </TableCell>
            <TableCell align="right">{data.cu_mon}</TableCell>
            <TableCell align="right">{data.vu_khuc}</TableCell>
            <TableCell align="right">{data.van_khuc}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ) : null
}
