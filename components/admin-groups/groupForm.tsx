import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material'
import { IGroup } from '../../interfaces/Group'

interface IFormProps {
  groups: IGroup[]
  submitHandler: () => void
  setValidationStatus: (isValid: boolean) => void
  setFormState: (group: IGroup) => void
}
interface IValidateErrors {
  title?: string
}

const GroupForm = ({
  groups,
  submitHandler,
  setValidationStatus,
  setFormState,
}: IFormProps): React.ReactElement => {
  const formik = useFormik({
    initialErrors: {
      title: 'Название группы обязательно для заполнения',
    },
    initialValues: {
      title: '',
      listIndex: 50,
      published: true,
      group: null,
    },
    validate(values): IValidateErrors {
      const errors: IValidateErrors = {}
      if (!values.title)
        errors.title = 'Название группы обязательно для заполнения'
      return errors
    },
    onSubmit: () => {
      submitHandler()
    },
  })

  useEffect(() => {
    setValidationStatus(formik.isValid)
  }, [formik.isValid, setValidationStatus])

  useEffect(() => {
    setFormState(formik.values)
  }, [formik.values, setFormState])

  return (
    <form onSubmit={formik.handleSubmit}>
      {JSON.stringify(formik.values)}
      <TextField
        id="title"
        error={!!formik.errors.title && formik.touched.title}
        helperText={formik.errors.title || null}
        name="title"
        fullWidth={true}
        label="Название группы"
        variant="standard"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        sx={{ marginBottom: '15px' }}
      />
      <TextField
        id="listIndex"
        type="number"
        name="listIndex"
        fullWidth={true}
        label="Индекс"
        variant="standard"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={+formik.values.listIndex}
        sx={{ marginBottom: '15px' }}
      />

      <Autocomplete
        fullWidth
        onChange={(_e, val) => {
          formik.setFieldValue('group', val?.id)
        }}
        options={groups?.map((i) => ({
          id: i._id || '',
          label: i.title,
        }))}
        getOptionLabel={(option) => option?.label}
        renderOption={(props, option) => <li {...props}> {option.label} </li>}
        isOptionEqualToValue={(option, value) => option?.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            id="group"
            name={'group'}
            label="Родитель"
            variant="standard"
            value={formik.values.group}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ marginBottom: '15px' }}
          />
        )}
      />
      <FormControlLabel
        label="Опубликовано"
        sx={{ marginBottom: '15px' }}
        control={
          <Checkbox
            id="published"
            name="published"
            checked={formik.values.published}
            onChange={formik.handleChange}
          />
        }
      />
    </form>
  )
}

export default GroupForm
