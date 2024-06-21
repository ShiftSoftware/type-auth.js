import { Access } from "../access"
import { Action } from "."

export class ActionBankItem {
  action: Action
  accessValue?: string | number
  accessList: Array<Access> = []

  type: string

  subActionBankItems: Array<ActionBankItem> = []

  constructor({
    type,
    action,
    accessList,
    accessValue,
  }: {
    type: string
    action: Action
    accessList?: Array<Access>
    accessValue?: string | number
  }) {
    this.type = type
    this.action = action

    if (accessList) this.accessList = accessList
    if (accessValue) this.accessValue = accessValue
  }
}
