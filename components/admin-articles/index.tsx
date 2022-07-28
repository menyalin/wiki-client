import { Box, Typography, Stack, Button } from '@mui/material'
import React from 'react'
import { IArticle } from '../../interfaces/Article'
import { useQuery } from 'react-query'
import articleService from '../../services/article.service'
import ArticleTable from './table'
import groupService from '../../services/group.service'
import { IGroup } from '../../interfaces/Group'
import { useRouter } from 'next/router'

const Articles = (): JSX.Element => {
  const router = useRouter()
  // const [isOpen, setOpen] = useState(false)

  const {
    data: allArticles,
    isError,
    // isLoading,
  } = useQuery<IArticle[]>('allArticles', articleService.getAll, {
    initialData: [],
  })

  const { data: allGroups } = useQuery<IGroup[]>(
    'allGroups',
    groupService.getAllGroups,
    {
      initialData: [],
    }
  )

  const addArticleHandler = () => {
    router.push('/admin/new_article')
  }

  if (isError) return <div>Ошибка получении списка групп</div>
  return (
    <Box>
      <Typography variant="h5">Статьи:</Typography>
      <Stack direction="row">
        <Button size="small" onClick={addArticleHandler}>
          Создать статью
        </Button>
      </Stack>
      <ArticleTable articles={allArticles || []} groups={allGroups || []} />
      {/* <ArticleDialog
        isOpen={isOpen}
        setOpen={setOpen}
        groups={allArticles || []}
        setEditedItem={setActiveItem}
        editedItem={activeItem}
      /> */}
    </Box>
  )
}

export default Articles
