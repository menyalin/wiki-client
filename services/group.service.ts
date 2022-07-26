
import axios, { AxiosError } from 'axios'
import api from '../api'
import { IGroup, IGroupWithoutId } from '../interfaces/Group'
 
class GroupService {
  async getAllGroups():Promise<IGroup[]>{
    const { data } = await api.get<IGroup[]>('groups')
    return data  
  }

  async create(group: IGroupWithoutId): Promise<IGroup> {
    try {
      const { data } = await api.post('groups', group)
      return data
    } catch (err) {
      if (axios.isAxiosError(err)  /*&& err.response?.data.message*/) {
        const error = err as AxiosError<{message: string}>
        throw new Error(error.response?.data?.message)  
      } else throw err 
    }
  }

  async update(id: string, group: IGroupWithoutId): Promise<IGroup> {
    try {
      const { data } = await api.put(`groups/${id}`, { ...group, group: group.group ? group.group : null })
      return data
    } catch (err) {
      if (axios.isAxiosError(err)  /*&& err.response?.data.message*/) {
        const error = err as AxiosError<{message: string}>
        throw new Error(error.response?.data?.message)  
      } else throw err 
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`groups/${id}`)
      return
    } catch (err) {
      if (axios.isAxiosError(err)  /*&& err.response?.data.message*/) {
        const error = err as AxiosError<{message: string}>
        throw new Error(error.response?.data?.message)  
      } else throw err 
    }
  }
}

export default new GroupService()