import { Access, AccessTree } from "../access"
import {
  Action,
  ActionTree,
  ActionBranch,
  ActionTreeNode,
  ActionBankItem,
  ActionBase,
  DynamicAction,
  TextAction,
  DecimalAction,
  BooleanAction,
} from "../action"

const recursiveActionAppending = (
  children: Array<ActionTree>,
  root: ActionTreeNode,
  keyBank: Array<string> = []
): ActionTreeNode => {
  children.forEach((actionParent: ActionTree | ActionBranch) => {
    // Object.entries(actionParent).forEach(
    //   ([key, value]: [string, ActionTree | ActionBranch]) => {
    //     const currentKeyBank = [...keyBank, key]
    //     const { DisplayDescription, DisplayName, ...rest } = value as ActionTree
    //     const childItem = new ActionTreeNode()
    //     childItem.typeName = key
    //     // @ts-ignore
    //     if (DisplayName) childItem.displayName = DisplayName
    //     if (DisplayDescription)
    //       // @ts-ignore
    //       childItem.displayDescription = DisplayDescription
    //     if (
    //       //@ts-ignore
    //       +rest?.type > -1 &&
    //       //@ts-ignore
    //       rest?.type !== null &&
    //       //@ts-ignore
    //       rest?.type !== undefined
    //     ) {
    //       const actionState = rest as unknown as Action
    //       childItem.type = [...currentKeyBank, value.constructor.name].join(
    //         " -> "
    //       )
    //       if (!childItem.displayName && actionState.name)
    //         childItem.displayName = actionState.name
    //       if (!childItem.displayDescription && actionState.description)
    //         childItem.displayDescription = actionState.description
    //       childItem.action = actionState
    //     } else {
    //       childItem.type = currentKeyBank.join(" -> ")
    //       recursiveActionAppending([rest], childItem, currentKeyBank)
    //     }
    //     root.actionTreeItems.push(childItem)
    //   }
    // )
  })

  return root
}

export class TypeAuthContextHelper {
  ActionBank: Array<ActionBankItem> = []
  //   private actionBank: Array<ActionBankItem> = []

  constructor() {
    // this.actionBank = []
  }

  private getActions(actionToMatch: ActionBase): ActionBankItem[] {
    // const targetActions = this.ActionBank.filter((item) => {
    //   const itemPath = item.type.split(" -> ")
    //   const targetPath = actionToMatch.actionPath
    //   if (!item.action) {
    //     const checkingDepth = Math.min(itemPath.length, targetPath.length)
    //     for (let idx = 0; idx < checkingDepth; idx++) {
    //       if (itemPath[idx] === targetPath[idx]) {
    //         if (Array.isArray(item.accessList) && item.accessList.length > 0)
    //           return true
    //       } else break
    //     }
    //   }
    //   return itemPath.slice(0, -1).join() === targetPath.join()
    // })
    return [new ActionBankItem({ action: new BooleanAction() })]
    // return targetActions
  }

  can(actionToMatch: ActionBase, accessTypeToCheck: Access): boolean {
    // const targetActions = this.getActions(actionToMatch)

    // for (let index = 0; index < targetActions.length; index++) {
    //   const targetAction = targetActions[index]

    //   if (targetAction.accessList.includes(accessTypeToCheck)) return true
    // }

    return false
  }

  private accessValueWildCard(
    targetAction: ActionBankItem,
    actionToMatch: ActionBase,
    actionTrees: ActionTree[] = []
  ): number | string {
    // let targetTextAction: TextAction | null = null
    // for (let i = 0; i < actionTrees.length; i++) {
    //   const actionTree = actionTrees[i]

    //   let subPaths: ActionTree = actionTree

    //   for (let y = 0; y < actionToMatch.actionPath.length; y++) {
    //     const targetField = actionToMatch.actionPath[y]

    //     if (subPaths[targetField])
    //       subPaths = subPaths[targetField] as ActionTree
    //   }
    //   if (subPaths instanceof TextAction) {
    //     targetTextAction = subPaths as TextAction
    //     break
    //   }
    // }

    // let returnValue: string | number

    // if (targetAction.accessList.includes(Access.Maximum))
    //   returnValue = targetTextAction?.maximumAccess || ""
    // else returnValue = targetTextAction?.minimumAccess || ""

    // return targetTextAction instanceof DecimalAction
    //   ? +returnValue
    //   : returnValue
    return ""
  }

  accessValue(
    actionToMatch: ActionBase,
    actionTrees: ActionTree[] = []
  ): number | string {
    const targetActions = this.getActions(actionToMatch)

    for (let idx = 0; idx < targetActions.length; idx++) {
      let targetAction = targetActions[idx]

      if (
        Array.isArray(targetAction.accessList) &&
        targetAction.accessList.length
      )
        return this.accessValueWildCard(
          targetAction,
          actionToMatch,
          actionTrees
        )

      if (targetAction) {
        const action = targetAction.actionBase as TextAction | DecimalAction
        const accessValue = targetAction.accessValue as string | number

        try {
          if (action.minimumAccess !== null && action.maximumAccess !== null) {
            const minimumValidation = Math.max(
              +action.minimumAccess,
              +accessValue
            )
            const maximumValidation = Math.min(
              minimumValidation,
              +action.maximumAccess
            )

            const validatedValue =
              typeof accessValue === "string"
                ? maximumValidation.toString()
                : maximumValidation

            return validatedValue
          }
          return accessValue
        } catch (error) {
          return action.minimumAccess ? action.minimumAccess : ""
        }
      }
    }

    return "0"
  }

  generateActionTree(
    actionTrees: Array<ActionTree>,
    rootActionTree?: ActionTreeNode
  ): ActionTreeNode {
    //   let root: ActionTreeNode

    //   if (rootActionTree) root = rootActionTree
    //   else {
    //     root = new ActionTreeNode()

    //     root.typeName = "Root"
    //   }

    //   return recursiveActionAppending(actionTrees, root)
    // }

    // populateActionBank(
    //   actionCursor: ActionTreeNode,
    //   accessCursor: Array<AccessTree>
    // ) {
    //   if (actionCursor.dynamicSubitem) return

    //   accessCursor.forEach((accessItem: AccessTree) => {
    //     Object.entries(accessItem).forEach(([key, value]) => {
    //       if (value === null || value === undefined) return

    //       if (actionCursor.typeName === "Root") {
    //         const selectedAction = actionCursor.actionTreeItems.find(
    //           (actionItem: ActionTreeNode) => actionItem.typeName === key
    //         )

    //         if (selectedAction)
    //           return this.populateActionBank(selectedAction, accessCursor)
    //       } else {
    //         if (Array.isArray(value) && key === actionCursor.typeName) {
    //           const itemAction = actionCursor.action as Action

    //           this.ActionBank.push(
    //             new ActionBankItem({
    //               action: itemAction,
    //               accessList: value,
    //               type: actionCursor.type,
    //             })
    //           )

    //           return
    //         } else if (
    //           (typeof value === "number" ||
    //             typeof value === "string" ||
    //             typeof value === "boolean" ||
    //             typeof value === "number") &&
    //           key === actionCursor.typeName
    //         ) {
    //           const itemAction = actionCursor.action as Action
    //           this.ActionBank.push(
    //             new ActionBankItem({
    //               action: itemAction,
    //               accessValue: value,
    //               type: actionCursor.type,
    //             })
    //           )

    //           return
    //         } else if (value) {
    //           Object.entries(value).forEach(([subKey, subValue]) => {
    //             const selectedSubAction = actionCursor.actionTreeItems.find(
    //               (subActionItem: ActionTreeNode) =>
    //                 subActionItem.typeName === subKey
    //             )

    //             if (selectedSubAction)
    //               this.populateActionBank(selectedSubAction, [
    //                 { [subKey]: subValue },
    //               ])
    //           })
    //         }
    //       }
    //     })
    //   })
    console.log(99)

    return new ActionTreeNode()
  }

  locateActionInBank(actionToCheck: ActionBase): Array<ActionBankItem> {
    // const filteredActions = this.ActionBank.filter(
    //   (item) => item.action === actionToCheck
    // )

    // filteredActions.forEach((item) => {
    //   actionMatches.push(item)
    //   if (actionToCheck instanceof DynamicAction) {
    //     actionMatches.push(
    //       ...item.subActionBankItems.filter((x) => {
    //         const action = x.action as DynamicAction

    //         return (
    //           action.id === id ||
    //           (id !== null &&
    //             selfId !== null &&
    //             selfId.includes(id || "") &&
    //             action.id === TypeAuthContext.selfReferenceKey)
    //         )
    //       })
    //     )
    //   }
    // })

    // return actionMatches.filter((act) => {
    //   const dynamicAct = act.action as DynamicAction
    //   if (
    //     id != null &&
    //     dynamicAct &&
    //     !dynamicAct.id &&
    //     act.accessList.length == 0
    //   )
    //     return true

    //   return false
    // })
    // return filteredActions
    return []
  }
}
