import { Button, Stack } from '@mui/material'
import React from 'react'

interface IProps {
  cancelHandler: () => void
  saveHandler: () => void
  saveDisabled: boolean
}

const ButtonsPanel = ({ cancelHandler, saveHandler, saveDisabled }: IProps) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button onClick={cancelHandler}>Отмена</Button>
      <Button
        onClick={saveHandler}
        color="primary"
        variant="contained"
        disabled={saveDisabled}
      >
        Сохранить
      </Button>
    </Stack>
  )
}

export default ButtonsPanel
