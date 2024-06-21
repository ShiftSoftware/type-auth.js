import { Action, DynamicAction } from "./actions"
import { DynamicTextAction, TextAction } from "./text"
import { DynamicReadAction, ReadAction } from "./read"
import { BooleanAction, DynamicBooleanAction } from "./boolean"
import { DecimalAction, DynamicDecimalAction } from "./decimal"
import { DynamicReadWriteAction, ReadWriteAction } from "./readWrite"
import {
  ReadWriteDeleteAction,
  DynamicReadWriteDeleteAction,
} from "./readWriteDelete"

export enum ActionType {
  Read = 0,
  ReadWrite = 1,
  ReadWriteDelete = 2,
  Boolean = 3,
  Text = 4,
}
type action = Action | DynamicAction

type text = TextAction | DynamicTextAction

type read = ReadAction | DynamicReadAction

type bool = BooleanAction | DynamicBooleanAction

type decimal = DecimalAction | DynamicDecimalAction

type readWrite = ReadWriteAction | DynamicReadWriteAction

type readWriteDelete = ReadWriteDeleteAction | DynamicReadWriteDeleteAction

export type ActionBranch =
  | (text | read | bool | action | decimal | readWrite | readWriteDelete)
  | branchInfo

type branchInfo = {
  DisplayName?: string
  DisplayDescription?: string
}

export type ActionTree = {
  [key: string]: ActionBranch | ActionTree
}
