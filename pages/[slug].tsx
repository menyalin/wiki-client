import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'
import { MainLayout } from '../layouts/main.layout'
import { useQuery } from 'react-query'
import articleService from '../services/article.service'
import { IArticle } from '../interfaces/Article'
import { Box, Divider, Typography } from '@mui/material'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const ArticleWrapper = styled.main({
  padding: '15px',
})

const ArticlePage = (): React.ReactNode => {
  const router = useRouter()

  const {
    data: article,
    isError,
    error,
  } = useQuery<IArticle>(
    ['article', router.query.slug],
    async () => await articleService.getBySlug(router.query.slug as string),
    {
      enabled: !!router.query.slug,
      staleTime: 1000 * 5,
    }
  )
  if (!article) return <div>Запрашиваемая статья не найдена</div>
  if (isError)
    return (
      <div>
        <>Error: {error}</>{' '}
      </div>
    )

  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>
      <ArticleWrapper>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          textAlign="center"
          sx={{ paddingTop: '20px' }}
        >
          {article.title}
        </Typography>
        <Divider />
        <Box sx={{ maxWidth: '800px' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </Box>
      </ArticleWrapper>
    </>
  )
}

ArticlePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <Head>
        <title>Wiki Client: </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>{page}</MainLayout>
    </>
  )
}

export default ArticlePage
