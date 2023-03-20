import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

import type { ThongThienKhieu } from '@/models'

interface ThongThienKhieuTableProps {
  data: ThongThienKhieu
}

export default function ThongThienKhieuTable({
  data,
}: ThongThienKhieuTableProps) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Trước phương tam hợp</TableCell>
              <TableCell>Sau phương tam hợp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {data.truoc_phuong_tam_hop}
              </TableCell>
              <TableCell>{data.sau_phuong_tam_hop}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <p className="pt-4">• {data.note}</p>
    </>
  )
}
