import saveToFile from "../../saveToFile"
import { Access, AccessTree } from "../access"
import { ActionTreeNode, ActionBase } from "../action"
import { TypeAuthContextHelper } from "./TypeAuthContextHelper"

export class TypeAuthContext<T> {
  private accessTrees: AccessTree[] // TODO: Not used yet
  private actionTrees: T[]

  private actionTree: ActionTreeNode

  private typeAuthContextHelper: TypeAuthContextHelper<T>

  constructor(
    accessTrees: AccessTree[] | AccessTree,
    actionTrees: T[] | T = []
  ) {
    if (Array.isArray(accessTrees)) this.accessTrees = accessTrees
    else this.accessTrees = [accessTrees]

    if (Array.isArray(actionTrees)) this.actionTrees = actionTrees
    else this.actionTrees = [actionTrees]

    this.typeAuthContextHelper = new TypeAuthContextHelper()

    this.actionTree = this.typeAuthContextHelper.generateActionTree(
      this.actionTrees
    )

    // this.typeAuthContextHelper.populateActionBank(
    //   this.actionTree,
    //   this.accessTrees
    // )
  }

  canAccess(action: ActionBase): boolean {
    return this.typeAuthContextHelper.can(action, Access.Maximum)
  }

  canRead(action: ActionBase): boolean {
    return this.typeAuthContextHelper.can(action, Access.Read)
  }

  canWrite(action: ActionBase): boolean {
    return this.typeAuthContextHelper.can(action, Access.Write)
  }

  canDelete(action: ActionBase): boolean {
    return this.typeAuthContextHelper.can(action, Access.Delete)
  }

  accessValue(action: ActionBase): string | number {
    return this.typeAuthContextHelper.accessValue(action, this.actionTrees)
  }
}
