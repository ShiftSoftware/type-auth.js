import { ActionType } from "./constants"

// Abstraction for all type of actions
export class baseAction {
  // Friendly name for identifying the Action.
  name?: string

  actionPath: string[] = []

  // Not all actions are the same. They could be a bool, Read/Write combo, or a more complicated data structure represented as a String.
  type: ActionType

  // Additional description about the Action
  description?: string

  constructor(type: ActionType)

  constructor(name: string, type: ActionType)

  constructor(name: string, type: ActionType, description: string)

  constructor(
    nameOrType: string | ActionType,
    type?: ActionType,
    description?: string
  ) {
    if (typeof nameOrType === "string") {
      this.type = type!
      this.name = nameOrType
      if (description) this.description = description
    } else {
      this.type = nameOrType
    }
  }
}

// Action is the smallest unit that can be used in the TypeAuth Access Control System
export class Action extends baseAction {}

type ItemsStructure = Array<{ key: string; value: string }>

export class DynamicAction extends baseAction {
  // The unique identifier for the data item (or Row). This is useful for Dynamic Actions
  id?: string

  items: ItemsStructure = []

  isDynamic = true

  expand(items: ItemsStructure, addSelf = false, addEmptyOrNull = false): void {
    this.items = [...items]

    if (addEmptyOrNull) {
      this.items.unshift({ key: "EmptyOrNullKey", value: "Unassigned" })
    }

    if (addSelf) {
      this.items.unshift({ key: "SelfReferenceKey", value: "Self" })
    }
  }
}
