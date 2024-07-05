import { Action, DynamicAction } from "./Action"
import { DynamicTextAction, TextAction } from "./TextAction"
import { DynamicReadAction, ReadAction } from "./ReadAction"
import { BooleanAction, DynamicBooleanAction } from "./BooleanAction"
import { DecimalAction, DynamicDecimalAction } from "./DecimalAction"
import { DynamicReadWriteAction, ReadWriteAction } from "./ReadWriteAction"
import {
  ReadWriteDeleteAction,
  DynamicReadWriteDeleteAction,
} from "./ReadWriteDeleteAction"

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
  | text | read | bool | action | decimal | readWrite | readWriteDelete
