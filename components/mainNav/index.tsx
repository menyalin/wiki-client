import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Menu from './menu'
import SearchIcon from '@mui/icons-material/Search'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputAdornment,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useFormik } from 'formik'
import articleService from '../../services/article.service'
import { IArticle } from '../../interfaces/Article'
import SearchResult from './searchResult'
import { useRouter } from 'next/router'

interface IMenuProps {
  children: JSX.Element | JSX.Element[]
}

const MainNav = () => {
  const router = useRouter()
  const theme = useTheme()
  const [articles, setArticles] = useState<IArticle[]>([])
  const formik = useFormik({
    initialValues: {
      term: '',
    },
    onSubmit: async () => {
      const res = await articleService.searchByTerm(formik.values.term)
      setArticles(res)
    },
  })
  const isSmall: boolean = useMediaQuery(theme.breakpoints.down('md'))

  const MenuWrapper = ({ children }: IMenuProps): JSX.Element => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Меню</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    )
  }

  const chooseArtice = (id: string) => {
    const tmpArticle = articles.find((i) => i._id === id)
    if (!tmpArticle) return
    formik.setFieldValue('term', '')
    setArticles([])
    router.push('/' + tmpArticle.slug)
  }

  return (
    <Box marginTop={5}>
      <form onSubmit={formik.handleSubmit}>
        <OutlinedInput
          fullWidth
          size="small"
          label="Поиск"
          id="term"
          name="term"
          sx={{ mb: 1 }}
          value={formik.values.term}
          onChange={formik.handleChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </form>

      {formik.values.term && (
        <SearchResult articles={articles} chooseArticle={chooseArtice} />
      )}
      {!formik.values.term && isSmall && (
        <MenuWrapper>
          <Menu />
        </MenuWrapper>
      )}
      {!formik.values.term && !isSmall && <Menu />}
    </Box>
  )
}

export default MainNav
