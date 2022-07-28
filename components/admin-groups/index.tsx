import React, { useState } from 'react'
import groupService from '../../services/group.service'
import { useQuery } from 'react-query'
import { IGroup } from '../../interfaces/Group'
import { Box, Button, Stack } from '@mui/material'
import GroupDialog from './groupDialog'
import GroupTable from './groupTable'
import { Typography } from '@mui/material'

const Groups = (): React.ReactElement => {
  const [isOpen, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const {
    data: allGroups,
    isError,
    // isLoading,
  } = useQuery<IGroup[]>('allGroups', groupService.getAllGroups, {
    initialData: [],
  })

  const addGroupHandler = () => {
    setActiveItem(null)
    setOpen(true)
  }

  if (isError) return <div>Ошибка получении списка групп</div>

  return (
    <Box>
      <Typography variant="h5">Группы:</Typography>
      <Stack direction="row">
        <Button size="small" onClick={addGroupHandler}>
          Создать группу
        </Button>
      </Stack>
      <GroupTable groups={allGroups || []} setActiveItem={setActiveItem} />
      <GroupDialog
        isOpen={isOpen}
        setOpen={setOpen}
        groups={allGroups || []}
        setEditedItem={setActiveItem}
        editedItem={activeItem}
      />
    </Box>
  )
}

export default Groups
