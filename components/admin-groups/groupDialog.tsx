import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import GroupForm from './groupForm'
import { IGroup, IGroupWithoutId } from '../../interfaces/Group'
import { useMutation, useQueryClient } from 'react-query'
import groupService from '../../services/group.service'
import { LoadingButton } from '@mui/lab'
import { Alert, IconButton, Snackbar, Stack } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'

interface IDialogProps {
  isOpen: boolean
  groups: IGroup[]
  setOpen: (open: boolean) => void
  setEditedItem: (id: string | null) => void
  editedItem: string | null
}

const initFormState = {
  title: '',
  published: true,
  listIndex: 50,
  group: null,
}

const FormDialog = ({
  isOpen,
  setOpen,
  groups,
  editedItem,
  setEditedItem,
}: IDialogProps) => {
  const queryClient = useQueryClient()
  const [formState, setFormState] = useState<IGroupWithoutId>(initFormState)
  const [isValidForm, setValidationStatus] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const createGroupMutation = useMutation(
    (newGroup: IGroupWithoutId) => groupService.create(newGroup),
    {
      onSuccess: (data) => {
        const groups = queryClient.getQueryData<IGroup[]>('allGroups')
        if (groups) queryClient.setQueryData('allGroups', [...groups, data])
        setFormState(initFormState)
        setOpen(false)
      },
      onError: (error: Error) => {
        if (error && error?.message) {
          setError(error.message)
        }
      },
    }
  )

  const updateGroupMutation = useMutation(
    ({ id, state }: { id: string; state: IGroupWithoutId }) =>
      groupService.update(id, state),
    {
      onSuccess: (data) => {
        const groups = queryClient.getQueryData<IGroup[]>('allGroups')
        if (groups) {
          const idx = groups.findIndex((i) => i._id === data._id)
          groups.splice(idx, 1, data)
          queryClient.setQueryData('allGroups', [...groups])
        } else queryClient.setQueryData('allGroups', [data])
        setEditedItem(null)
        setOpen(false)
      },
      onError: (error: Error) => {
        if (error && error?.message) {
          setError(error.message)
        }
      },
    }
  )

  const deleteGroupMutation = useMutation(
    (id: string) => groupService.delete(id),
    {
      onSuccess: (__data, variables) => {
        const groups = queryClient.getQueryData<IGroup[]>('allGroups')
        if (groups)
          queryClient.setQueryData('allGroups', [
            ...groups.filter((i) => i._id !== variables),
          ])
        setEditedItem(null)
        setOpen(false)
      },
      onError: (error: Error) => {
        if (error && error?.message) {
          setError(error.message)
        }
      },
    }
  )

  const handleClose = () => {
    setOpen(false)
    setEditedItem(null)
  }

  const submitHandler = (): void => {
    if (!isValidForm || !formState) return
    if (editedItem)
      updateGroupMutation.mutate({ id: editedItem, state: formState })
    else createGroupMutation.mutate(formState)
  }

  useEffect(() => {
    if (editedItem) {
      const allGroups = queryClient.getQueryData<IGroup[]>('allGroups')
      const res = allGroups?.find((i) => i._id === editedItem)
      setFormState({
        title: res?.title || '',
        published: res?.published || true,
        listIndex: res?.listIndex || 50,
        group: res?.group || null,
      })
      setOpen(true)
    } else setFormState(initFormState)
  }, [editedItem, queryClient, setFormState, setOpen])

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
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle>
          {editedItem ? 'Обновить группу' : 'Новая группа'}
        </DialogTitle>
        <DialogContent>
          <GroupForm
            groups={groups}
            editedItem={editedItem}
            submitHandler={submitHandler}
            setValidationStatus={setValidationStatus}
            formState={formState}
            setFormState={setFormState}
          />
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: editedItem ? 'space-between' : 'flex-end',
          }}
        >
          {editedItem ? (
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => deleteGroupMutation.mutate(editedItem)}
            >
              <DeleteIcon />
            </IconButton>
          ) : null}

          <Stack direction="row" spacing={1}>
            <Button onClick={handleClose}>Отмена</Button>
            <LoadingButton
              onClick={submitHandler}
              disabled={!isValidForm || createGroupMutation.isLoading}
              loading={createGroupMutation.isLoading}
            >
              Сохранить
            </LoadingButton>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default FormDialog
