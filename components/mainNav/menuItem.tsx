import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import { IMenuItem } from '../../interfaces/MenuItem'
import { MenuContext } from './menu'

const article = (
  item: IMenuItem,
  key: string,
  level: number
): React.ReactElement => (
  <MenuContext.Consumer>
    {(context) => (
      <ListItemButton
        key={key}
        sx={{ pl: level * 4 }}
        selected={context?.selectedId === item._id}
        onClick={() =>
          item?.slug && context?.selectHandler(item._id, item.slug)
        }
      >
        <ListItemText primary={item.title} />
      </ListItemButton>
    )}
  </MenuContext.Consumer>
)

const group = (item: IMenuItem, level: number): React.ReactElement => {
  return (
    <MenuContext.Consumer>
      {(context) => (
        <React.Fragment key={item._id}>
          <ListItemButton
            onClick={() => context?.toggleHandler(item._id)}
            sx={{ pl: level * 4 }}
          >
            <ListItemText primary={item.title} />
            {context?.openedIds.includes(item._id) ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItemButton>
          <Collapse
            in={context?.openedIds.includes(item._id)}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {item.subItems?.map((child, idx) => (
                <MenuItem item={child} key={idx} level={level + 1} />
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      )}
    </MenuContext.Consumer>
  )
}

interface IItemProp {
  item: IMenuItem
  level: number
}

export const MenuItem = ({ item, level }: IItemProp) => {
  if (item.subItems) {
    return group(item, level)
  } else return article(item, item._id, level)
}
