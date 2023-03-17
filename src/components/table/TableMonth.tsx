import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

import type { KhaiSonHungThang } from '@/models'

/**
 * Table For
 * KHAI SƠN , LẬP HƯỚNG , TU PHƯƠNG CÁT Tháng
 * Khai sơn hung Tháng
 * TU  PHƯƠNG HUNG Tháng
 */
interface Props {
  data: KhaiSonHungThang[]
}
function createData(item: KhaiSonHungThang) {
  return item
}

const TABLE_HEAD = [
  'Tên sao \\ Tháng',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
]

export default function TableMonth({ data }: Props) {
  const rows: KhaiSonHungThang[] = data.map((item) => createData(item))
  return (
    <TableContainer component={Paper}>
      <Table aria-label="table common">
        <TableHead>
          <TableRow>
            {TABLE_HEAD.map((title, idx) => (
              <TableCell align={idx !== 0 ? 'right' : 'left'} key={idx}>
                {title}
              </TableCell>
            ))}
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
              <TableCell align="right">{row.month_1}</TableCell>
              <TableCell align="right">{row.month_2}</TableCell>
              <TableCell align="right">{row.month_3}</TableCell>
              <TableCell align="right">{row.month_4}</TableCell>
              <TableCell align="right">{row.month_5}</TableCell>
              <TableCell align="right">{row.month_6}</TableCell>
              <TableCell align="right">{row.month_7}</TableCell>
              <TableCell align="right">{row.month_8}</TableCell>
              <TableCell align="right">{row.month_9}</TableCell>
              <TableCell align="right">{row.month_10}</TableCell>
              <TableCell align="right">{row.month_11}</TableCell>
              <TableCell align="right">{row.month_12}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
