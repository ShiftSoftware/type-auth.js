import { ActionType } from "./constants"
import { Action, DynamicAction } from "./actions"

export class ReadWriteAction extends Action {
  constructor(name?: string, description?: string)

  constructor(name?: string, description?: string) {
    super(ActionType.ReadWrite)

    if (name) this.name = name

    if (description) this.description = description
  }
}

export class DynamicReadWriteAction extends DynamicAction {
  constructor(name?: string, description?: string)

  constructor(name?: string, description?: string) {
    super(ActionType.ReadWrite)

    if (name) this.name = name

    if (description) this.description = description
  }
}
