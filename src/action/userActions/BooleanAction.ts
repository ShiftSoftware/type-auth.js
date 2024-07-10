import { Action, DynamicAction, ActionType } from ".."

export class BooleanAction extends Action {
  constructor(name?: string, description?: string) {
    super({ type: ActionType.Boolean })

    if (name) this.name = name

    if (description) this.description = description
  }
}

export class DynamicBooleanAction extends DynamicAction {
  constructor(name?: string, description?: string) {
    super({ type: ActionType.Boolean })

    if (name) this.name = name

    if (description) this.description = description
  }
}
