import { List } from '@mui/material'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { IMenuItem } from '../../interfaces/MenuItem'
import { MenuItem } from './menuItem'

const allMenuItems: IMenuItem[] = [
  {
    _id: '1',
    listIndex: 1,
    slug: 'introduction',
    title: 'Введение',
  },
  {
    _id: '2',
    listIndex: 3,
    slug: 'about',
    title: 'О системе',
  },
  {
    listIndex: 10,
    _id: 'group1',
    title: 'Первая группа',
    subItems: [
      {
        _id: '3',
        listIndex: 2,
        slug: 'nested-items',
        title: 'Вложенная статья',
      },
      {
        listIndex: 12,
        _id: 'group2',
        title: 'Вложенная группа',
        subItems: [
          {
            _id: '5',
            listIndex: 2,
            slug: 'nested-items',
            title: 'Вложенная статья',
          },
          {
            listIndex: 12,
            _id: 'group32',
            title: 'Вложенная группа',
          },
        ],
      },
    ],
  },
]

interface IMenuContext {
  selectedId: string
  selectHandler: (id: string, slug: string) => void
  openedIds: string[]
  toggleHandler: (id: string) => void
}
export const MenuContext = React.createContext<IMenuContext | undefined>(
  undefined
)

const Menu = () => {
  const [openedIds, setOpenedIds] = useState<Array<string>>([])
  const [selectedId, setSelectedId] = useState<string>('')
  const router = useRouter()
  const toggleHandler = (id: string) => {
    if (openedIds.includes(id)) setOpenedIds(openedIds.filter((i) => i !== id))
    else setOpenedIds(openedIds.concat([id]))
  }

  const selectHandler = (id: string, slug: string) => {
    router.push('/' + slug)
    setSelectedId(id)
  }

  return (
    <MenuContext.Provider
      value={{ openedIds, toggleHandler, selectedId, selectHandler }}
    >
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {allMenuItems.map((item, idx) => (
          <MenuItem item={item} key={idx} level={0} />
        ))}
        {openedIds.length}
      </List>
    </MenuContext.Provider>
  )
}

export default Menu
