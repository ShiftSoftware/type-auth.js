import { Action } from "."
import { Access } from "../access"

export class ActionBankItem {
  path = ""
  actionBase?: Action
  accessList: Access[] = []
  accessValue?: string | number
  subActionBankItems: ActionBankItem[] = []

  constructor({
    path,
    action,
    accessList,
    accessValue,
  }: {
    path?: string
    action?: Action
    accessList?: Access[]
    accessValue?: string | number
  }) {
    if (path) this.path = path
    if (action) this.actionBase = action
    if (accessList) this.accessList = accessList
    if (accessValue) this.accessValue = accessValue
  }
}
