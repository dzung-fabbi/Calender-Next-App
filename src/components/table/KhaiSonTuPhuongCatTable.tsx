import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

import type { KhaiSonTuPhuongCat } from '@/models'

interface KhaiSonTuPhuongCatTableProps {
  data: KhaiSonTuPhuongCat[]
}
function createData(star_name: string, direction: string) {
  return { star_name, direction }
}

export default function KhaiSonTuPhuongCatTable({
  data,
}: KhaiSonTuPhuongCatTableProps) {
  const rows: KhaiSonTuPhuongCat[] = data.map(({ star_name, direction }) =>
    createData(star_name, direction)
  )
  return (
    <TableContainer component={Paper}>
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>Tên sao</TableCell>
            <TableCell align="right">Phương hướng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.star_name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.star_name}
              </TableCell>
              <TableCell align="right">{row.direction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
