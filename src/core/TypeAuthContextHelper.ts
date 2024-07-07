import saveToFile from "../../saveToFile"
import { Access, AccessTree } from "../access"
import {
  Action,
  ActionBranch,
  ActionTreeNode,
  ActionBankItem,
  ActionBase,
  DynamicAction,
  TextAction,
  DecimalAction,
  BooleanAction,
  ActionTree,
} from "../action"
import { flatObject } from "../utils"
import { recursiveActionAppending } from "./recursiveActionAppending"

export class TypeAuthContextHelper {
  actionBank: ActionBankItem[] = []

  generateActionTree(
    actionTrees: ActionTree[],
    rootActionTree?: ActionTreeNode
  ): ActionTreeNode {
    let root: ActionTreeNode

    if (rootActionTree) root = rootActionTree
    else {
      root = new ActionTreeNode()
      root.id = "Root"
    }

    const gg = recursiveActionAppending(actionTrees, root)

    saveToFile(gg)

    return gg
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

  private getActionNodeByPath(
    actionCursor: ActionTreeNode,
    actionPath: string
  ): ActionTreeNode | null {
    if (actionCursor.path === actionPath) return actionCursor

    if (actionPath.startsWith(actionCursor.path))
      for (
        let index = 0;
        index < actionCursor.actionTreeItems.length;
        index++
      ) {
        const foundedTreeNode = this.getActionNodeByPath(
          actionCursor.actionTreeItems[index],
          actionPath
        )

        if (foundedTreeNode) return foundedTreeNode
      }

    return null
  }

  populateActionBank(actionCursor: ActionTreeNode, accessCursor: AccessTree[]) {
    accessCursor.forEach((accessTree) => {
      const flattedAccessTree = flatObject(accessTree) as {
        [key: string]: Access[] | number | string
      }

      Object.entries(flattedAccessTree).forEach(([accessPath, accessValue]) => {
        const treeNode = this.getActionNodeByPath(actionCursor, accessPath)

        if (treeNode) {
          const newBankItem = new ActionBankItem({ action: treeNode.action })
          if (Array.isArray(accessValue))
            newBankItem.accessList = [...accessValue]
          else newBankItem.accessValue = accessValue

          this.actionBank.push(newBankItem)
        }
      })
    })
  }

  locateActionInBank(actionToCheck: ActionBase): ActionBankItem[] {
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
