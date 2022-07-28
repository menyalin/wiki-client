import Head from 'next/head'
import React, { useState } from 'react'
import AdminLayout from '../../../layouts/admin.layout'
import ArticleForm from '../../../components/admin-articles/form'
import ButtonsPanel from '../../../components/admin-articles/buttonsPanel'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { IGroup } from '../../../interfaces/Group'
import groupService from '../../../services/group.service'
import { IArticle, IArticleWithoutId } from '../../../interfaces/Article'
import articleService from '../../../services/article.service'
import { Alert, Button, Snackbar } from '@mui/material'

interface IUpdateArticle {
  id: string
  article: IArticleWithoutId
}

const initFormState: IArticleWithoutId = {
  title: '',
  slug: '',
  listIndex: 50,
  published: true,
  description: '',
  content: '',
  group: '',
}

const EditArticlePage = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const articleId = router.query.id

  const { data: article } = useQuery<IArticle>(
    ['article', articleId],
    async () => await articleService.getById(articleId as string),
    {
      enabled: !!articleId && typeof articleId === 'string',
      staleTime: 1000 * 5,
      onSuccess(data) {
        setFormState(data)
      },
    }
  )

  const [error, setError] = useState<string | null>(null)
  const [formState, setFormState] = useState<IArticleWithoutId>(
    article || initFormState
  )
  const [isValidForm, setValidationStatus] = useState<boolean>(false)

  const updateArticleMutation = useMutation(
    (variables: IUpdateArticle) =>
      articleService.update(variables.id, variables.article),
    {
      onSuccess: (data) => {
        const articles = queryClient.getQueryData<IArticle[]>('allArticles')
        if (articles) {
          const idx = articles.findIndex((i) => i._id === data._id)
          articles.splice(idx, 1, data)
          queryClient.setQueryData('allArticles', [...articles])
        } else queryClient.setQueryData('allArticles', [data])
        router.push('/admin')
      },
      onError: (error: Error) => {
        if (error && error?.message) {
          setError(error.message)
        }
      },
    }
  )

  const deleteArticleMutation = useMutation(
    (id: string) => articleService.delete(id),
    {
      onSuccess: (data, variables) => {
        const articles = queryClient.getQueryData<IArticle[]>('allArticles')
        if (articles) {
          queryClient.setQueryData('allArticles', [
            ...articles.filter((i) => i._id !== variables),
          ])
        }
        router.push('/admin')
      },
      onError: (error: Error) => {
        if (error && error?.message) {
          setError(error.message)
        }
      },
    }
  )

  const cancelHandler = () => {
    router.back()
  }

  const {
    data: groups,
    // isError,
    // isLoading,
  } = useQuery<IGroup[]>('allGroups', groupService.getAllGroups, {
    initialData: [],
  })

  const saveHandler = () => {
    updateArticleMutation.mutate({
      id: articleId as string,
      article: formState,
    })
  }

  if (!articleId || typeof articleId !== 'string')
    return <h3>error: bad parama</h3>

  return (
    <>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
      <ButtonsPanel
        cancelHandler={cancelHandler}
        saveHandler={saveHandler}
        saveDisabled={!isValidForm}
      />
      {article && (
        <ArticleForm
          groups={groups || []}
          setFormState={setFormState}
          formState={formState}
          setValidationStatus={setValidationStatus}
        />
      )}
      <Button
        color="error"
        variant="contained"
        sx={{ mt: '15px' }}
        size="small"
        onClick={() => deleteArticleMutation.mutate(articleId)}
      >
        Удалить статью
      </Button>
    </>
  )
}

EditArticlePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <Head>
        <title>Редактирование статьи</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>{page}</AdminLayout>
    </>
  )
}

export default EditArticlePage
