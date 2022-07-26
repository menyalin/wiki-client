import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { IGroup, IGroupWithoutId } from '../../interfaces/Group'

interface IFormProps {
  groups: IGroup[]
  submitHandler: () => void
  setValidationStatus: (isValid: boolean) => void
  formState: IGroupWithoutId
  setFormState: (group: Omit<IGroup, '_id'>) => void
  editedItem: string | null
}
interface IValidateErrors {
  title?: string
}

const GroupForm = ({
  groups,
  submitHandler,
  setValidationStatus,
  formState,
  setFormState,
  editedItem,
}: IFormProps): React.ReactElement => {
  const formik = useFormik({
    initialErrors: {
      title: 'Название группы обязательно для заполнения',
    },
    initialValues: formState,
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

      <FormControl sx={{ width: '100%' }} size="small" variant="standard">
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
            .filter((i) => i._id !== editedItem)
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
