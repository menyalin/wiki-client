import api from '../api'
import { IMenuItem } from '../interfaces/MenuItem'
 
class MenuService {

  async getMenu():Promise<IMenuItem[]>{
    const { data } = await api.get<IMenuItem[]>('menus')
    return data  
  }
}

export default new MenuService()