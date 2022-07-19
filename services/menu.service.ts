import { AxiosResponse } from 'axios'
import api from '../api'
 
class MenuService {

  async getMenu():Promise<AxiosResponse>{
    const { data } = await api.get<AxiosResponse>('groups')
    return data  
  }
}

export default new MenuService()