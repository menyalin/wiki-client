import api from '../api'
import { IGroup } from '../interfaces/Group'
 
class GroupService {
  async getAllGroups():Promise<IGroup[]>{
    const { data } = await api.get<IGroup[]>('groups')
    return data  
  }

  async create(group: IGroup): Promise<IGroup> {
    const { data } = await api.post('groups', group)
    return data
  }
}

export default new GroupService()