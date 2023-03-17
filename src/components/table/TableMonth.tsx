import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

import type { KhaiSonHungThang } from '@/models'
import { useStore } from '@/store/useStore'
import { MONTH_PROPERTY } from '@/utils/constant'

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

export default function TableMonth({ data }: Props) {
  const currentDate = useStore((state) => state.currentDate)
  const month = currentDate.format('M')
  const rows: KhaiSonHungThang[] = data.map((item) => createData(item))
  const TABLE_HEAD = ['Tên sao', `Tháng ${month}`]

  const getDataByMonth = (monthSelected: number, rowData: KhaiSonHungThang) => {
    type K = keyof KhaiSonHungThang
    const property =
      MONTH_PROPERTY[monthSelected as keyof typeof MONTH_PROPERTY]
    return rowData[property as K]
  }
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
              <TableCell align="right">
                {getDataByMonth(Number(month), row)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
