import { ActionBase, ActionBranch, ActionTree, ActionTreeNode } from "../action"

export const recursiveActionAppending = (
  children: ActionTree[],
  root: ActionTreeNode,
  referencePath: string = ""
): ActionTreeNode => {
  children.forEach((actionParent: ActionTree | ActionBranch) => {
    Object.entries(actionParent).forEach(
      ([key, value]: [string, ActionTree | ActionBranch]) => {
        const currentPath = referencePath ? `${referencePath}.${key}` : key
        const { Description, Name, ...rest } = value as ActionTree

        const childItem = new ActionTreeNode(currentPath)

        childItem.id = key
        if (Name && typeof Name === "string") childItem.displayName = Name
        if (Description && typeof Description === "string")
          childItem.displayDescription = Description

        if (value instanceof ActionBase) {
          if (!childItem.displayName && value.name)
            childItem.displayName = value.name
          if (!childItem.displayDescription && value.description)
            childItem.displayDescription = value.description

          value.path = currentPath
          childItem.action = value
        } else recursiveActionAppending([rest], childItem, currentPath)

        root.actionTreeItems.push(childItem)
      }
    )
  })

  return root
}
