import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import GroupForm from './groupForm'
import { IGroup } from '../../interfaces/Group'
import { useMutation, useQueryClient } from 'react-query'
import groupService from '../../services/group.service'
import { LoadingButton } from '@mui/lab'
// import { Alert,  Snackbar} from '@mui/material'

interface IDialogProps {
  isOpen: boolean
  groups: IGroup[]
  setOpen: (open: boolean) => void
}

const FormDialog = ({ isOpen, setOpen, groups }: IDialogProps) => {
  const queryClient = useQueryClient()

  // const [error, setError] = useState<string | null>(null)

  const createGroupMutation = useMutation(
    (newGroup: IGroup) => groupService.create(newGroup),
    {
      onSuccess: (data) => {
        const groups = queryClient.getQueryData<IGroup[]>('allGroups')
        if (groups) queryClient.setQueryData('allGroups', [...groups, data])
        setOpen(false)
      },
      onError: () => {
        console.log('error!!!')
      },
    }
  )

  const [isValidForm, setValidationStatus] = useState<boolean>(false)

  const [formState, setFormState] = useState<IGroup>()

  const handleClose = () => {
    setOpen(false)
  }

  const submitHandler = (): void => {
    if (!isValidForm || !formState) return
    createGroupMutation.mutate(formState)
  }

  return (
    <>
      {/* <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar> */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle>Новая группа</DialogTitle>
        <DialogContent>
          <GroupForm
            groups={groups}
            submitHandler={submitHandler}
            setValidationStatus={setValidationStatus}
            setFormState={setFormState}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <LoadingButton
            onClick={submitHandler}
            disabled={!isValidForm || createGroupMutation.isLoading}
            loading={createGroupMutation.isLoading}
          >
            Сохранить
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default FormDialog
