import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React from 'react'
import { IGroup } from '../../interfaces/Group'

interface IProps {
  groups: IGroup[]
  setActiveItem: (id: string | null) => void
}

const GroupTable = ({ groups, setActiveItem }: IProps): JSX.Element => {
  const dblRowClickHandler = (id: string) => {
    setActiveItem(id)
  }

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, padding: '10px' }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">Название</TableCell>
            <TableCell align="center">Индекс в списке</TableCell>
            <TableCell align="center">Опубликована</TableCell>
            <TableCell align="center">Родитель</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ padding: '10px' }}>
          {groups.map((row) => (
            <TableRow
              key={row._id}
              onDoubleClick={() => dblRowClickHandler(row._id)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.listIndex}</TableCell>
              <TableCell align="right">
                {row.published ? 'Да' : 'Нет'}
              </TableCell>
              <TableCell align="right">
                {groups.find((i) => i._id === row.group)?.title}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default GroupTable
