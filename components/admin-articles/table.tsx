import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { IArticle } from '../../interfaces/Article'
import { IGroup } from '../../interfaces/Group'

interface IProps {
  articles: IArticle[]
  groups: IGroup[]
}

const ArticleTable = ({ articles, groups }: IProps): JSX.Element => {
  const router = useRouter()
  const dblRowClickHandler = (id: string) => {
    router.push('/admin/articles/' + id)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%' }} size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Название</TableCell>
            <TableCell align="center">slug</TableCell>
            <TableCell align="center">Индекс в списке</TableCell>
            <TableCell align="center">Опубликована</TableCell>
            <TableCell align="center">Родитель</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ padding: '10px' }}>
          {articles.map((row) => (
            <TableRow
              key={row._id}
              onDoubleClick={() => dblRowClickHandler(row._id)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.slug}</TableCell>
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

export default ArticleTable
