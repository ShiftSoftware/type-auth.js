import { DynamicTextAction, TextAction } from "./text"

type Configuration = {
  description?: string
  minimumAccess?: number
  maximumAccess?: number
}

export class DecimalAction extends TextAction {
  constructor(name?: string, configuration?: Configuration) {
    if (configuration) {
      const { description, maximumAccess, minimumAccess } = configuration

      super(name, {
        description,
        maximumAccess: maximumAccess?.toString(),
        minimumAccess: minimumAccess?.toString(),
        comparer: (a, b) => (a && b ? Math.max(+a, +b).toString() : null),
      })
    } else super(name)
  }
}

export class DynamicDecimalAction extends DynamicTextAction {
  constructor(name?: string, configuration?: Configuration) {
    if (configuration) {
      const { description, maximumAccess, minimumAccess } = configuration

      super(name, {
        description,
        maximumAccess: maximumAccess?.toString(),
        minimumAccess: minimumAccess?.toString(),
        comparer: (a, b) => (a && b ? Math.max(+a, +b).toString() : null),
      })
    } else super(name)
  }
}
