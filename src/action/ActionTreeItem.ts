import { Access } from "../access"
import { baseAction } from "./actions"

export class ActionTreeItem {
  id?: string
  typeName!: string
  displayName?: string
  additionalData?: any
  displayDescription?: string

  type: string = ""
  action?: baseAction
  dynamicSubitem: boolean = false
  wildCardAccess: Array<Access> = []
  actionTreeItems: Array<ActionTreeItem> = []
}
