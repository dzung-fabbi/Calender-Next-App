import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

import type { TamNguyenTuBach } from '@/models'

interface TamNguyenTuBachTableProps {
  data: TamNguyenTuBach[]
}
function createData(
  nguyen: string,
  bach_1: string,
  bach_6: string,
  bach_8: string,
  tu_9: string
) {
  return { nguyen, bach_1, bach_6, bach_8, tu_9 }
}

export default function TamNguyenTuBachTable({
  data,
}: TamNguyenTuBachTableProps) {
  const rows: TamNguyenTuBach[] = data.map(
    ({ nguyen, bach_1, bach_6, bach_8, tu_9 }) =>
      createData(nguyen, bach_1, bach_6, bach_8, tu_9)
  )
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nguyên</TableCell>
            <TableCell align="right">1 bạch</TableCell>
            <TableCell align="right">6 bạch</TableCell>
            <TableCell align="right">8 bạch</TableCell>
            <TableCell align="right">9 tử</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.nguyen}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nguyen}
              </TableCell>
              <TableCell align="right">{row.bach_1}</TableCell>
              <TableCell align="right">{row.bach_6}</TableCell>
              <TableCell align="right">{row.bach_8}</TableCell>
              <TableCell align="right">{row.tu_9}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
