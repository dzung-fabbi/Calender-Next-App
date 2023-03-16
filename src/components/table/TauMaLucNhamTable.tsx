import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

import type { TauMaLucNham } from '@/models'

interface TauMaLucNhamTableProps {
  data: TauMaLucNham
}

export default function TauMaLucNhamTable({ data }: TauMaLucNhamTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="tau ma luc nham">
        <TableHead>
          <TableRow>
            <TableCell>Thần hậu</TableCell>
            <TableCell align="right">Công tào</TableCell>
            <TableCell align="right">Thiên cương</TableCell>
            <TableCell align="right">Thắng quang</TableCell>
            <TableCell align="right">Truyền tống</TableCell>
            <TableCell align="right">Hà khôi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              {data.than_hau}
            </TableCell>
            <TableCell align="right">{data.cong_tao}</TableCell>
            <TableCell align="right">{data.thien_cuong}</TableCell>
            <TableCell align="right">{data.thang_quang}</TableCell>
            <TableCell align="right">{data.truyen_tong}</TableCell>
            <TableCell align="right">{data.ha_khoi}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
