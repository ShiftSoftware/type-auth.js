import { ActionType } from "./constants"
import { Action, DynamicAction } from "./actions"

export class ReadWriteDeleteAction extends Action {
  constructor(name?: string, description?: string)

  constructor(name?: string, description?: string) {
    super(ActionType.ReadWriteDelete)

    if (name) this.name = name

    if (description) this.description = description
  }
}

export class DynamicReadWriteDeleteAction extends DynamicAction {
  constructor(name?: string, description?: string)

  constructor(name?: string, description?: string) {
    super(ActionType.ReadWriteDelete)

    if (name) this.name = name

    if (description) this.description = description
  }
}
