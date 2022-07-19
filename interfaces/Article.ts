export interface IArticle {
  _id?: string,
  title: string,
  slug: string,
  description?: string,
  listIndex: number,
  content: string,    
  parent?: string | null,
}

