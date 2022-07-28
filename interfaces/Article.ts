export interface IArticle {
  _id: string,
  title: string,
  slug: string,
  description?: string,
  published: boolean,
  listIndex: number,
  content: string,    
  group?: string | null,
}

export type IArticleWithoutId = Omit<IArticle, '_id'>