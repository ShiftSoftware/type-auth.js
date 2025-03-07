import saveToFile from "../../saveToFile"
import { Access, AccessTree } from "../access"
import { TypeAuthContextHelper } from "./TypeAuthContextHelper"
import { ActionTree, ActionTreeItem, baseAction } from "../action"

export class TypeAuthContext {
  private actionTrees: Array<ActionTree>
  private accessTree: Array<AccessTree>

  private actionTree: ActionTreeItem

  private contextHelper: TypeAuthContextHelper

  static selfReferenceKey = "_shift_software_type_auth_core_self_reference"

  constructor(
    accessTrees: Array<AccessTree> | AccessTree,
    actionTrees: Array<ActionTree> | ActionTree = []
  ) {
    if (!Array.isArray(accessTrees)) accessTrees = [accessTrees]
    if (!Array.isArray(actionTrees)) actionTrees = [actionTrees]

    this.contextHelper = new TypeAuthContextHelper()
    this.accessTree = accessTrees
    this.actionTrees = actionTrees

    this.actionTree = this.contextHelper.generateActionTree(actionTrees)

    this.contextHelper.populateActionBank(this.actionTree, accessTrees)
  }

  canAccess(action: baseAction): boolean {
    return this.contextHelper.can(action, Access.Maximum)
  }

  canRead(action: baseAction): boolean {
    return this.contextHelper.can(action, Access.Read)
  }

  canWrite(action: baseAction): boolean {
    return this.contextHelper.can(action, Access.Write)
  }

  canDelete(action: baseAction): boolean {
    return this.contextHelper.can(action, Access.Delete)
  }

  accessValue(action: baseAction): string | number {
    return this.contextHelper.accessValue(action, this.actionTrees)
  }

  public generateAccessTree(
    reducer: TypeAuthContext,
    preserver?: TypeAuthContext
  ): AccessTree {
    const reducedActionTreeItems: Array<ActionTreeItem> = []

    this.flattenActionTree(reducedActionTreeItems, reducer.actionTree)

    let preservedActionTreeItems: Array<ActionTreeItem> | null = null

    if (preserver) {
      preservedActionTreeItems = []
      this.flattenActionTree(preservedActionTreeItems, preserver.actionTree)
    }

    return this.traverseActionTree(
      this.actionTree,
      {},
      reducer,
      reducedActionTreeItems,
      preserver,
      preservedActionTreeItems
    )
  }

  private flattenActionTree(
    flattenedActionTreeItems: Array<ActionTreeItem>,
    root: ActionTreeItem
  ) {
    root.actionTreeItems.forEach((item) => {
      this.flattenActionTree(flattenedActionTreeItems, item)
    })

    if (!root.dynamicSubitem) flattenedActionTreeItems.push(root)
  }

  private traverseActionTree(
    actionTreeItem: ActionTreeItem,
    accessTree: AccessTree,
    reducer: TypeAuthContext,
    reducedActionTreeItems: Array<ActionTreeItem>,
    preserver?: TypeAuthContext,
    preservedActionTreeItems?: Array<ActionTreeItem> | null
  ): AccessTree {
    // let preserverActionTreeItem: ActionTreeItem | null = null

    // if (preservedActionTreeItems) {
    //   preserverActionTreeItem =
    //     preservedActionTreeItems.find((x) => x.type === actionTreeItem.type) ||
    //     null
    // }

    // if (
    //   actionTreeItem.wildCardAccess.length > 0 ||
    //   (preserverActionTreeItem &&
    //     preserverActionTreeItem?.wildCardAccess?.length > 0)
    // ) {
    //   const reducerActionTreeItem = reducedActionTreeItems.find(
    //     (x) => x.type == actionTreeItem.type
    //   )

    //   if (reducerActionTreeItem) {
    //     const access = actionTreeItem.wildCardAccess.filter((x) =>
    //       reducerActionTreeItem.wildCardAccess.includes(x)
    //     )

    //     if (preserverActionTreeItem) {
    //       for (const item of preserverActionTreeItem.wildCardAccess) {
    //         if (
    //           !reducerActionTreeItem.wildCardAccess.includes(item) &&
    //           !access.includes(item)
    //         ) {
    //           access.push(item)
    //         }
    //       }
    //     }

    //     // @ts-ignore
    //     if (access.length > 0) return access
    //   }
    // }

    // actionTreeItem.actionTreeItems.forEach((subActionTreeItem) => {
    //   const value = this.traverseActionTree(
    //     subActionTreeItem,
    //     {},
    //     reducer,
    //     reducedActionTreeItems,
    //     preserver,
    //     preservedActionTreeItems
    //   )
    //   if (value) accessTree[subActionTreeItem.typeName] = value
    // })

    // if (actionTreeItem.action) {
    //   const dynamicAction = actionTreeItem.action as DynamicAction

    //   if (dynamicAction && !stopTraversing) {
    //     const actionBankItems =
    //       this.contextHelper.locateActionInBank(dynamicAction)

    //     const subItems = actionBankItems.flatMap((x) => [
    //       ...x.subActionBankItems,
    //     ])

    //   }
    // }

    const generatedAccessList = {}

    reducer.contextHelper.ActionBank.forEach((actionAccess) => {
      const objOrder = actionAccess.type.split(" -> ")

      const possibleValues = actionAccess.accessValue || actionAccess.accessList
      this.createPath(generatedAccessList, objOrder, possibleValues, 0)
    })

    return generatedAccessList
  }

  createPath(parent: any, path: string[], value: any, idx: number) {
    if ((idx === 0 && path.length === 1) || idx === path.length - 2) {
      parent[path[idx]] = value
      return
    } else if (!parent[path[idx]]) {
      parent[path[idx]] = {}
    }
    this.createPath(parent[path[idx]], path, value, idx + 1)
  }
}
