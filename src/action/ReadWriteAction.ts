import { ActionType } from "./constants"
import { Action, DynamicAction } from "./Action"

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
