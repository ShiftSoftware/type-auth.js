import { Access, AccessTree } from "../access"
import {
  TextAction,
  ActionBase,
  ActionTree,
  DecimalAction,
  ActionTreeNode,
  ActionBankItem,
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

    return recursiveActionAppending(actionTrees, root)
  }

  private getActions(actionToMatch: ActionBase): ActionBankItem[] {
    const targetActions = this.actionBank.filter((item) => {
      if (
        !item.actionBase &&
        item.path &&
        actionToMatch.path.startsWith(item.path)
      )
        return true

      if (item.actionBase) return item.actionBase.path === actionToMatch.path
    })
    return targetActions
  }

  can(actionToMatch: ActionBase, accessTypeToCheck: Access): boolean {
    const targetActions = this.getActions(actionToMatch)

    for (let index = 0; index < targetActions.length; index++) {
      const targetAction = targetActions[index]

      if (targetAction.accessList.includes(accessTypeToCheck)) return true
    }

    return false
  }

  private accessValueWildCard(
    targetAction: ActionBankItem,
    actionToMatch: ActionBase,
    actionTrees: ActionTree[] = []
  ): number | string {
    const actionPath = actionToMatch.path.split(".")

    let targetTextAction: TextAction | null = null

    for (let i = 0; i < actionTrees.length; i++) {
      const actionTree = actionTrees[i]

      let subPaths: ActionTree = actionTree
      for (let y = 0; y < actionPath.length; y++) {
        const targetField = actionPath[y]
        if (subPaths[targetField])
          subPaths = subPaths[targetField] as ActionTree
      }
      if (subPaths instanceof TextAction) {
        targetTextAction = subPaths as TextAction
        break
      }
    }

    let returnValue: string | number

    if (targetAction.accessList.includes(Access.Maximum))
      returnValue = targetTextAction?.maximumAccess || ""
    else returnValue = targetTextAction?.minimumAccess || ""

    return targetTextAction instanceof DecimalAction
      ? +returnValue
      : returnValue
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
          const newBankItem = new ActionBankItem({
            path: treeNode.path,
            action: treeNode.action,
          })
          if (Array.isArray(accessValue))
            newBankItem.accessList = [...accessValue]
          else newBankItem.accessValue = accessValue

          this.actionBank.push(newBankItem)
        }
      })
    })
  }
}
