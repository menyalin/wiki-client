import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { IArticle } from '../../interfaces/Article'

interface IProps {
  articles: IArticle[]
  chooseArticle: (id: string) => void
}

const SearchResult = ({ articles, chooseArticle }: IProps) => {
  if (!articles || articles.length === 0) return <>no data...</>

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {articles.map((i) => (
        <ListItem
          key={i._id}
          onClick={() => chooseArticle(i._id)}
          style={{ cursor: 'pointer' }}
        >
          <ListItemText primary={i.title} secondary={i.description} />
        </ListItem>
      ))}
    </List>
  )
}

export default SearchResult
