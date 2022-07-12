// import { useEffect } from 'react'
import { useQuery } from 'react-query'
import MenuService from '../../services/menu.service'
// import MenuService from '../../services/menu.service'

const MainNav = () => {
  const menu = useQuery('menu', MenuService.getMenu)
  return <div>тут будет меню обучалки</div>
}

export default MainNav
