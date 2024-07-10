import { DynamicTextAction, TextAction } from "./TextAction"

type Configuration = {
  name?: string
  description?: string
  minimumAccess?: number
  maximumAccess?: number
}

export class DecimalAction extends TextAction {
  constructor({
    name,
    description,
    maximumAccess,
    minimumAccess,
  }: Configuration) {
    super({
      name,
      description,
      maximumAccess: maximumAccess?.toString(),
      minimumAccess: minimumAccess?.toString(),
      comparer: (a, b) => (a && b ? Math.max(+a, +b).toString() : null),
    })
  }
}

export class DynamicDecimalAction extends DynamicTextAction {
  constructor({
    name,
    description,
    maximumAccess,
    minimumAccess,
  }: Configuration) {
    super({
      name,
      description,
      maximumAccess: maximumAccess?.toString(),
      minimumAccess: minimumAccess?.toString(),
      comparer: (a, b) => (a && b ? Math.max(+a, +b).toString() : null),
    })
  }
}
