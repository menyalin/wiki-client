import { List } from '@mui/material'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { IMenuItem } from '../../interfaces/MenuItem'
import { MenuItem } from './menuItem'
import { useQuery } from 'react-query'
import menuService from '../../services/menu.service'

interface IMenuContext {
  selectedId: string
  selectHandler: (id: string, slug: string) => void
  openedIds: string[]
  toggleHandler: (id: string) => void
}
export const MenuContext = React.createContext<IMenuContext | undefined>(
  undefined
)

const Menu = (): JSX.Element => {
  const [openedIds, setOpenedIds] = useState<Array<string>>([])
  const [selectedId, setSelectedId] = useState<string>('')
  const {
    data: allMenuItems,
    isLoading,
    isError,
    error,
  } = useQuery<IMenuItem[]>('menu', menuService.getMenu, {
    staleTime: 15 * 1000,
  })

  const router = useRouter()
  const toggleHandler = (id: string) => {
    if (openedIds.includes(id)) setOpenedIds(openedIds.filter((i) => i !== id))
    else setOpenedIds(openedIds.concat([id]))
  }

  const selectHandler = (id: string, slug: string) => {
    router.push('/' + slug)
    setSelectedId(id)
  }
  if (isLoading) return <div>...loading menu</div>
  if (isError)
    return (
      <div>
        <>Something went wrong..., error: {error}</>
      </div>
    )
  else
    return (
      <MenuContext.Provider
        value={{ openedIds, toggleHandler, selectedId, selectHandler }}
      >
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {allMenuItems
            ?.sort((a, b) => a.listIndex - b.listIndex)
            .map((item, idx) => (
              <MenuItem item={item} key={idx} level={0} />
            ))}
        </List>
      </MenuContext.Provider>
    )
}

export default Menu
