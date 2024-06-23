import { baseAction } from "./actions"

function actionPathProxy<T extends object>(obj: T, path: string[] = []): T {
  const handler: ProxyHandler<T> = {
    get(target: any, prop: string, receiver) {
      path.push(prop)
      if (target[prop] instanceof baseAction) {
        target[prop].actionPath = [...path]
        while (path.length !== 0) path.pop()
        return target[prop]
      }
      const value = Reflect.get(target, prop, receiver) as T

      return actionPathProxy(value, path)
    },
  }

  const proxy = new Proxy(obj, handler)

  return proxy as T
}

export function actionProxy<T extends object>(obj: T): T {
  return actionPathProxy(obj)
}
