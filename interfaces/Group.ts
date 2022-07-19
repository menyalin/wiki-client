export interface IGroup {
  _id?: string,
  title: string,
  listIndex: number,
  parent?: 'string' | null
}