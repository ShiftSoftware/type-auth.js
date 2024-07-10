import { Action, DynamicAction, ActionType } from ".."

export class ReadWriteDeleteAction extends Action {
  constructor(name?: string, description?: string) {
    super({ type: ActionType.ReadWriteDelete })

    if (name) this.name = name

    if (description) this.description = description
  }
}

export class DynamicReadWriteDeleteAction extends DynamicAction {
  constructor(name?: string, description?: string) {
    super({ type: ActionType.ReadWriteDelete })

    if (name) this.name = name

    if (description) this.description = description
  }
}
