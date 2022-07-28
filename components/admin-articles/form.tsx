import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { IArticleWithoutId } from '../../interfaces/Article'
import { IGroup } from '../../interfaces/Group'

import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface IErrors {
  title?: string
  slug?: string
  description?: string
}

interface IProps {
  groups: IGroup[]
  setValidationStatus: (isValid: boolean) => void
  setFormState: (form: IArticleWithoutId) => void
  formState: IArticleWithoutId
}

const ArticleForm = ({
  groups,
  setFormState,
  formState,
  setValidationStatus,
}: IProps) => {
  const formik = useFormik({
    initialErrors: {
      title: 'Название группы обязательно для заполнения',
      slug: 'Поле не может быть пустым',
    },
    initialValues: formState,
    validate(values) {
      const errors: IErrors = {}
      if (!values.title)
        errors.title = 'Название группы обязательно для заполнения'
      if (!values.slug) errors.slug = 'slug не может быть пустым'
      if (!values.description)
        errors.description = 'Описание не может быть пустым'
      return errors
    },
    onSubmit: () => {
      // submitHandler()
    },
  })

  useEffect(() => {
    setFormState(formik.values)
  }, [formik.values, setFormState])

  useEffect(() => {
    setValidationStatus(formik.isValid)
  }, [formik.isValid, setValidationStatus])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack
        direction="row"
        spacing={3}
        sx={{ marginTop: '15px', alignContent: 'top' }}
      >
        <TextField
          id="title"
          error={!!formik.errors.title && formik.touched.title}
          helperText={formik.errors.title || null}
          name="title"
          label="Название статьи"
          variant="standard"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          sx={{ minWidth: 600 }}
        />
        <TextField
          id="slug"
          name="slug"
          label="Slug"
          error={!!formik.errors.slug && formik.touched.slug}
          helperText={formik.errors.slug || null}
          variant="standard"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.slug}
          sx={{ minWidth: '250px' }}
        />
        <TextField
          id="listIndex"
          type="number"
          name="listIndex"
          label="Индекс"
          variant="standard"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={+formik.values.listIndex}
          sx={{ maxWidth: '100px' }}
        />
        <FormControl sx={{ minWidth: 400 }} size="small" variant="standard">
          <InputLabel id="demo-select-small">Родитель</InputLabel>
          <Select
            labelId="demo-select-small"
            id="group"
            name="group"
            value={formik.values.group || ''}
            label="Родитель"
            onChange={formik.handleChange}
            defaultValue={''}
          >
            <MenuItem value="">
              <em>Отсутсвует</em>
            </MenuItem>
            {groups
              .sort((a, b) => a.listIndex - b.listIndex)
              .map((i) => (
                <MenuItem value={i._id} key={i._id}>
                  {i.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControlLabel
          label="Опубликовано"
          control={
            <Checkbox
              id="published"
              name="published"
              checked={formik.values.published}
              onChange={formik.handleChange}
            />
          }
        />
      </Stack>
      <TextField
        id="description"
        name="description"
        label="Описание"
        error={!!formik.errors.description && formik.touched.description}
        helperText={formik.errors.description || null}
        variant="standard"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        fullWidth
        sx={{ marginTop: '15px' }}
      />
      <Box sx={{ paddingTop: '15px', 'z-index': 1000 }}>
        <MDEditor
          id="content"
          value={formik.values.content}
          height={600}
          onChange={(val) => formik.setFieldValue('content', val)}
        />
      </Box>
    </form>
  )
}

export default ArticleForm
