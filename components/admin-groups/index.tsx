import React, { useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import groupService from '../../services/group.service'
import { useQuery } from 'react-query'
import { IGroup } from '../../interfaces/Group'
import { Box, Button, Stack } from '@mui/material'
import GroupDialog from './groupDialog'

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Название группы', width: 200 },
  { field: 'listIndex', headerName: 'Индекс', width: 80, align: 'right' },
  { field: 'published', headerName: 'Опубл', width: 100, align: 'right' },
  { field: 'group', headerName: 'Родитель', width: 200 },
]

const Groups = (): React.ReactElement => {
  const [isOpen, setOpen] = useState(false)

  const {
    data: allGroups,
    isError,
    isLoading,
  } = useQuery<IGroup[]>('allGroups', groupService.getAllGroups, {
    initialData: [],
  })

  const addGroupHandler = () => {
    setOpen(true)
  }

  if (isError) return <div>Ошибка получении списка групп</div>

  return (
    <Box>
      <Stack direction="row">
        <Button size="small" onClick={addGroupHandler}>
          Создать группу
        </Button>
      </Stack>
      <DataGrid
        rows={allGroups || []}
        columns={columns}
        density="compact"
        loading={isLoading}
        getRowId={(row) => row._id}
        style={{ height: 600, width: '100%' }}
      />
      <GroupDialog isOpen={isOpen} setOpen={setOpen} groups={allGroups || []} />
    </Box>
  )
}

export default Groups
