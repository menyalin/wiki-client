import Head from 'next/head'
import React, { useState } from 'react'
import AdminLayout from '../../../layouts/admin.layout'
import ArticleForm from '../../../components/admin-articles/form'
import ButtonsPanel from '../../../components/admin-articles/buttonsPanel'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { IGroup } from '../../../interfaces/Group'
import groupService from '../../../services/group.service'
import { IArticleWithoutId } from '../../../interfaces/Article'
import articleService from '../../../services/article.service'
import { Alert, Snackbar } from '@mui/material'

const initFormState: IArticleWithoutId = {
  title: '',
  slug: '',
  listIndex: 50,
  published: true,
  description: '',
  content: '',
  group: '',
}

const NewArticlePage = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [formState, setFormState] = useState<IArticleWithoutId>(initFormState)
  const [isValidForm, setValidationStatus] = useState<boolean>(false)

  const createGroupMutation = useMutation(
    (article: IArticleWithoutId) => articleService.create(article),
    {
      onSuccess: (data) => {
        const articles = queryClient.getQueryData<IGroup[]>('allArticles')
        if (articles)
          queryClient.setQueryData('allArticles', [...articles, data])
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
    createGroupMutation.mutate(formState)
  }

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
      <ArticleForm
        groups={groups || []}
        setFormState={setFormState}
        formState={formState}
        setValidationStatus={setValidationStatus}
      />
    </>
  )
}

NewArticlePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <Head>
        <title>Новая статья</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>{page}</AdminLayout>
    </>
  )
}

export default NewArticlePage
