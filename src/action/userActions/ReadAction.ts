import { Action, DynamicAction, ActionType } from ".."

export class ReadAction extends Action {
  constructor(name?: string, description?: string) {
    super({ type: ActionType.Read })

    if (name) this.name = name

    if (description) this.description = description
  }
}

export class DynamicReadAction extends DynamicAction {
  constructor(name?: string, description?: string) {
    super({ type: ActionType.Read })

    if (name) this.name = name

    if (description) this.description = description
  }
}
