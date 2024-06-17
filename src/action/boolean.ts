import { ActionType } from "./constants"
import { Action, DynamicAction } from "./actions"

export class BooleanAction extends Action {
  constructor(name?: string, description?: string)

  constructor(name?: string, description?: string) {
    super(ActionType.Boolean)

    if (name) this.name = name

    if (description) this.description = description
  }
}

export class DynamicBooleanAction extends DynamicAction {
  constructor(name?: string, description?: string)

  constructor(name?: string, description?: string) {
    super(ActionType.Boolean)

    if (name) this.name = name

    if (description) this.description = description
  }
}
