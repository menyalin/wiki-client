import { AxiosPromise, AxiosResponse } from 'axios'
import api from '../api'

 
class MenuService {
  constructor(){}

  async getMenu():Promise<AxiosResponse>{
    const { data, status } = await api.get<AxiosResponse>('groups')
    return data  
  }
}

export default new MenuService()