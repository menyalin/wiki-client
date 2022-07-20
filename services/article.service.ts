// import { AxiosResponse } from 'axios'
import api from '../api'
import { IArticle } from '../interfaces/Article'
// import { object, string, number, required } from 'yup'

//  let articleSchema = object({
//   _id: string().required(),
//   title:  string().required(),
//   slug: string().required(),
//   description: string(),
//   listIndex: number(),
//   content: string(),   
//   parent: string(),
//  })


// class Article implements IArticle {
//   _id: string
//   title: string
//   slug: string
//   description?: string
//   listIndex: number
//   content: string   
//   parent?: string

//   constructor({ _id, title, slug, listIndex, content, parent, description }: IArticle) {
//     this._id =_id
//     this.title = title
//     this.slug = slug
//     this.description = description
//     this.listIndex = listIndex
//     this.content = content
//     this.parent = parent
//   }
// }


class ArticleService {
  async getBySlug(slug =''):Promise<IArticle>{
    if (!slug) throw new Error('No slug param')
    const { data } = await api.get<IArticle>(`/articles/?slug=${slug}`)
    return data
  }
}

export default new ArticleService()