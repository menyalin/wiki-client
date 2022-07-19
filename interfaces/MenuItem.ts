export interface IMenuItem {
  _id: string
  listIndex: number
  title: string
  slug?: string
  subItems?: IMenuItem[]
}