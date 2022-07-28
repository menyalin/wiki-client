import axios, { AxiosError } from 'axios'
import api from '../api'
import { IArticle, IArticleWithoutId } from '../interfaces/Article'


class ArticleService {
  async getBySlug(slug =''):Promise<IArticle>{
    if (!slug) throw new Error('No slug param')
    const { data } = await api.get<IArticle>(`/articles/?slug=${slug}`)
    return data
  }

  async getFirst():Promise<IArticle> {
    const { data } = await api.get<IArticle>(`/articles/first`)
    return data
  }

  async getById(id: string):Promise<IArticle>{
    if (!id) throw new Error('No id param')
    const { data } = await api.get<IArticle>(`/articles/`+id)
    return data
  }

  async getAll(): Promise<IArticle[]> {
    const { data } = await api.get<IArticle[]>('/articles')
    return data
  }

  async create(article: IArticleWithoutId): Promise<IArticle> {
    try {
      const { data } = await api.post('articles', article)
      return data
    } catch (err) {
      if (axios.isAxiosError(err)  /*&& err.response?.data.message*/) {
        const error = err as AxiosError<{message: string}>
        throw new Error(error.response?.data?.message)  
      } else throw err 
    }
  }

  async update(id: string, article: IArticleWithoutId): Promise<IArticle> {
    try {
      const { data } = await api.put(`articles/${id}`, { ...article, group: article.group ? article.group : null })
      return data
    } catch (err) {
      if (axios.isAxiosError(err)  /*&& err.response?.data.message*/) {
        const error = err as AxiosError<{message: string}>
        throw new Error(error.response?.data?.message)  
      } else throw err 
    }
  }

}

export default new ArticleService()