export enum Access {
  Read = "r",
  Write = "w",
  Delete = "d",
  Maximum = "m",
}

export type AccessTree = {
  [key: string]: AccessTree | Array<Access> | string | number
}
