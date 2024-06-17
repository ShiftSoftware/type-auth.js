import { ActionType } from "./constants"
import { Action, DynamicAction } from "./actions"

export class ReadAction extends Action {
  constructor(name?: string, description?: string)

  constructor(name?: string, description?: string) {
    super(ActionType.Read)

    if (name) this.name = name

    if (description) this.description = description
  }
}

export class DynamicReadAction extends DynamicAction {
  constructor(name?: string, description?: string)

  constructor(name?: string, description?: string) {
    super(ActionType.Read)

    if (name) this.name = name

    if (description) this.description = description
  }
}
