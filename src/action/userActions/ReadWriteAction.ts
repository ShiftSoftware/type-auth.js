import { Action, DynamicAction, ActionType } from ".."

export class ReadWriteAction extends Action {
  constructor(name?: string, description?: string) {
    super({ type: ActionType.ReadWrite })

    if (name) this.name = name

    if (description) this.description = description
  }
}

export class DynamicReadWriteAction extends DynamicAction {
  constructor(name?: string, description?: string) {
    super({ type: ActionType.ReadWrite })

    if (name) this.name = name

    if (description) this.description = description
  }
}
