import { Action } from "."
import { Access } from "../access"

export class ActionBankItem {
  actionBase?: Action
  accessList: Access[] = []
  accessValue?: string | number

  subActionBankItems: ActionBankItem[] = []

  constructor({
    action,
    accessList,
    accessValue,
  }: {
    action?: Action
    accessList?: Access[]
    accessValue?: string | number
  }) {
    if (action) this.actionBase = action
    if (accessList) this.accessList = accessList
    if (accessValue) this.accessValue = accessValue
  }
}
