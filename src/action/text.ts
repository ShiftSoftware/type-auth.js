import { ActionType } from "./constants"
import { Action, DynamicAction } from "./actions"

type UserDefinedFunctions = (
  a: string | null,
  b: string | null
) => string | null

type Configuration = {
  description?: string
  minimumAccess?: string
  maximumAccess?: string
  comparer?: UserDefinedFunctions
  merger?: UserDefinedFunctions
}

/*
    maximumAccess:
    For non-standard Action Types the Maximum (Or Full Access) should be specified.
    Example: When defining an Action for Discount Percentage. The MaximumAccess is 100.
    This is especially important for determining the Access of a child Action when it's Parent Action Tree is Granted.
  */

/*
    minimumAccess:
    For non-standard Action Types the Minimum (Or No Access) should be specified.
    Example: When defining an Action for Discount Percentage. The MinimumAccess is 0.
  */

export class TextAction extends Action {
  maximumAccess?: string
  minimumAccess?: string

  merger?: UserDefinedFunctions
  comparer?: UserDefinedFunctions

  constructor(name?: string, configuration?: Configuration)
  constructor(name?: string, configuration?: Configuration) {
    super(ActionType.Text)

    if (name) this.name = name

    if (configuration) {
      const { description, minimumAccess, maximumAccess, comparer, merger } =
        configuration

      if (description) this.description = description

      if (minimumAccess) this.minimumAccess = minimumAccess

      if (maximumAccess) this.maximumAccess = maximumAccess

      if (comparer) this.comparer = comparer

      if (merger) this.merger = merger

      if (this.merger && this.comparer) {
        throw new Error(
          "Comparer and Merger can not be specified for the same action. Only one is allowed at a time."
        )
      }
    }
  }
}

export class DynamicTextAction extends DynamicAction {
  maximumAccess?: string
  minimumAccess?: string

  merger?: UserDefinedFunctions
  comparer?: UserDefinedFunctions

  constructor(name?: string, configuration?: Configuration)
  constructor(name?: string, configuration?: Configuration) {
    super(ActionType.Text)

    if (name) this.name = name

    if (configuration) {
      const { description, minimumAccess, maximumAccess, comparer, merger } =
        configuration

      if (description) this.description = description

      if (minimumAccess) this.minimumAccess = minimumAccess

      if (maximumAccess) this.maximumAccess = maximumAccess

      if (comparer) this.comparer = comparer

      if (merger) this.merger = merger

      if (this.merger && this.comparer) {
        throw new Error(
          "Comparer and Merger can not be specified for the same action. Only one is allowed at a time."
        )
      }
    }
  }
}
