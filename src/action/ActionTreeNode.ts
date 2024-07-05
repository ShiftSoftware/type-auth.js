import { Access } from "../access"
import { ActionBase } from "./Action"

export class ActionTreeNode {
  id?: string
  path: string = ""
  //additionalData?: any  // TODO: Not used

  displayName?: string
  displayDescription?: string

  isDynamicSubitem: boolean = false

  action?: ActionBase
  wildCardAccess: Access[] = []
  actionTreeItems: ActionTreeNode[] = []

  constructor(path?: string) {
    if (path) this.path = path
  }
}
