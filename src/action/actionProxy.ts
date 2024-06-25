import { baseAction } from "./actions"

const isReturnable = <T>(value: T): boolean => {
  return (
    Array.isArray(value) ||
    typeof value === "number" ||
    typeof value === "string" ||
    value === null ||
    value === undefined
  )
}

const proxyHandler = {
  typeAuthPath: [],
  get(target: any, property: string) {
    const newTypeAuthPath = [...this.typeAuthPath, property]

    const value = Reflect.get(target, property)
    if (isReturnable(value)) return value
    else if (value instanceof baseAction) {
      value.actionPath = newTypeAuthPath
      return value
    }

    return new Proxy(value, {
      ...proxyHandler,
      // @ts-ignore
      typeAuthPath: newTypeAuthPath,
    })
  },
}

export function actionProxy<T extends object>(obj: T): T {
  return new Proxy<T>(obj, proxyHandler)
}
