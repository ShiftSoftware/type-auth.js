import { ActionType } from "./constants"

type ActionBaseConstructorProps = {
  name?: string
  type: ActionType
  description?: string
}

// Abstraction for all type of actions
export class ActionBase {
  // Friendly name for identifying the Action.
  name?: string

  path: string = ""

  // Not all actions are the same. They could be a bool, Read/Write combo, or a more complicated data structure represented as a String.
  type: ActionType

  // Additional description about the Action
  description?: string

  constructor({ name, type, description }: ActionBaseConstructorProps) {
    this.type = type
    if (name) this.name = name
    if (description) this.description = description
  }
}

// Action is the smallest unit that can be used in the TypeAuth Access Control System
export class Action extends ActionBase {}

type ItemsStructure = { key: string; value: string }[]

type DynamicActionExpandProps = {
  addSelf: boolean
  items: ItemsStructure
  addEmptyOrNull: boolean
}

export class DynamicAction extends ActionBase {
  // The unique identifier for the data item (or Row). This is useful for Dynamic Actions
  id?: string

  items: ItemsStructure = []

  expand({ items, addSelf, addEmptyOrNull }: DynamicActionExpandProps): void {
    this.items = [...items]

    if (addEmptyOrNull)
      this.items.unshift({ key: "EmptyOrNullKey", value: "Unassigned" })

    if (addSelf) this.items.unshift({ key: "SelfReferenceKey", value: "Self" })
  }
}
