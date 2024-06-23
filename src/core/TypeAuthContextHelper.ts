import { Access, AccessTree } from "../access"
import {
  Action,
  ActionTree,
  ActionBranch,
  ActionTreeItem,
  ActionBankItem,
  baseAction,
  DynamicAction,
  TextAction,
  DecimalAction,
} from "../action"
import { TypeAuthContext } from "./TypeAuthContext"

const recursiveActionAppending = (
  children: Array<ActionTree>,
  root: ActionTreeItem,
  keyBank: Array<string> = []
): ActionTreeItem => {
  children.forEach((actionParent: ActionTree | ActionBranch) => {
    Object.entries(actionParent).forEach(
      ([key, value]: [string, ActionTree | ActionBranch]) => {
        const currentKeyBank = [...keyBank, key]
        const { DisplayDescription, DisplayName, ...rest } = value as ActionTree

        const childItem = new ActionTreeItem()

        childItem.typeName = key

        if (DisplayName) childItem.displayName = DisplayName
        if (DisplayDescription)
          childItem.displayDescription = DisplayDescription

        if (
          //@ts-ignore
          +rest?.type > -1 &&
          //@ts-ignore
          rest?.type !== null &&
          //@ts-ignore
          rest?.type !== undefined
        ) {
          const actionState = rest as unknown as Action

          childItem.type = [...currentKeyBank, value.constructor.name].join(
            " -> "
          )

          if (!childItem.displayName && actionState.name)
            childItem.displayName = actionState.name
          if (!childItem.displayDescription && actionState.description)
            childItem.displayDescription = actionState.description

          childItem.action = actionState
        } else {
          childItem.type = currentKeyBank.join(" -> ")
          recursiveActionAppending([rest], childItem, currentKeyBank)
        }

        root.actionTreeItems.push(childItem)
      }
    )
  })

  return root
}

export class TypeAuthContextHelper {
  ActionBank: Array<ActionBankItem> = []
  //   private actionBank: Array<ActionBankItem> = []

  constructor() {
    // this.actionBank = []
  }

  private getAction(actionToMatch: baseAction): ActionBankItem | undefined {
    const targetAction = this.ActionBank.find(
      (item) =>
        item.type.split(" -> ").slice(0, -1).join() ===
        actionToMatch.actionPath.join()
    )

    return targetAction
  }

  can(actionToMatch: baseAction, accessTypeToCheck: Access): boolean {
    const targetAction = this.getAction(actionToMatch)

    if (targetAction) return targetAction.accessList.includes(accessTypeToCheck)

    return false
  }

  accessValue(actionToMatch: baseAction): number | string {
    const targetAction = this.getAction(actionToMatch)

    if (targetAction) {
      const action = targetAction.action as TextAction | DecimalAction
      const accessValue = targetAction.accessValue as string | number
      try {
        const minimumValidation = Math.max(+action.minimumAccess, +accessValue)
        const maximumValidation = Math.min(
          minimumValidation,
          +action.maximumAccess
        )

        const validatedValue =
          typeof accessValue === "string"
            ? maximumValidation.toString()
            : maximumValidation

        return validatedValue
      } catch (error) {
        return action.minimumAccess
      }
    }

    return "0"
  }

  generateActionTree(
    actionTrees: Array<ActionTree>,
    rootActionTree?: ActionTreeItem
  ): ActionTreeItem {
    let root: ActionTreeItem

    if (rootActionTree) root = rootActionTree
    else {
      root = new ActionTreeItem()

      root.typeName = "Root"
    }

    return recursiveActionAppending(actionTrees, root)
  }

  populateActionBank(
    actionCursor: ActionTreeItem,
    accessCursor: Array<AccessTree>
  ) {
    if (actionCursor.dynamicSubitem) return

    accessCursor.forEach((accessItem: AccessTree) => {
      Object.entries(accessItem).forEach(([key, value]) => {
        if (value === null || value === undefined) return

        if (actionCursor.typeName === "Root") {
          const selectedAction = actionCursor.actionTreeItems.find(
            (actionItem: ActionTreeItem) => actionItem.typeName === key
          )

          if (selectedAction)
            return this.populateActionBank(selectedAction, accessCursor)
        } else {
          if (Array.isArray(value) && key === actionCursor.typeName) {
            const itemAction = actionCursor.action as Action

            this.ActionBank.push(
              new ActionBankItem({
                action: itemAction,
                accessList: value,
                type: actionCursor.type,
              })
            )

            return
          } else if (
            (typeof value === "number" ||
              typeof value === "string" ||
              typeof value === "boolean" ||
              typeof value === "number") &&
            key === actionCursor.typeName
          ) {
            const itemAction = actionCursor.action as Action
            this.ActionBank.push(
              new ActionBankItem({
                action: itemAction,
                accessValue: value,
                type: actionCursor.type,
              })
            )

            return
          } else if (value) {
            Object.entries(value).forEach(([subKey, subValue]) => {
              const selectedSubAction = actionCursor.actionTreeItems.find(
                (subActionItem: ActionTreeItem) =>
                  subActionItem.typeName === subKey
              )

              if (selectedSubAction)
                this.populateActionBank(selectedSubAction, [
                  { [subKey]: subValue },
                ])
            })
          }
        }
      })
    })
  }

  locateActionInBank(actionToCheck: baseAction): Array<ActionBankItem> {
    const filteredActions = this.ActionBank.filter(
      (item) => item.action === actionToCheck
    )

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
    return filteredActions
  }
}
