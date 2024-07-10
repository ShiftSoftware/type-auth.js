import { ActionBase } from "./Action"

import { DynamicTextAction, TextAction } from "./userActions"

export enum ActionType {
  Read = 0,
  ReadWrite = 1,
  ReadWriteDelete = 2,
  Boolean = 3,
  Text = 4,
}

type text = TextAction | DynamicTextAction

export type ActionBranch = (ActionBase | text) | branchInfo

type branchInfo = {
  Name?: string
  Description?: string
}

export type ActionTree = {
  [key: string]: ActionBranch | ActionTree
}
