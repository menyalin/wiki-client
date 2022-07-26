export interface IGroup {
  _id: string,
  title: string,
  listIndex: number,
  published: boolean,
  group?: 'string' | null
}

export type IGroupWithoutId = Omit<IGroup, '_id'>