import { AccessTree } from "../access"
import { TypeAuthContext } from "./TypeAuthContext"

export class TypeAuthContextBuilder<T> {
  private actionTrees: T[]
  private accessTrees: AccessTree[]

  constructor() {
    this.accessTrees = []
    this.actionTrees = []
  }

  addAccessTree(newAccess: AccessTree): TypeAuthContextBuilder<T> {
    this.accessTrees.push(newAccess)
    return this
  }

  addActionTree(actionTreeType: T): TypeAuthContextBuilder<T> {
    this.actionTrees.push(actionTreeType)
    return this
  }

  build(): TypeAuthContext<T> {
    return new TypeAuthContext(this.accessTrees, this.actionTrees)
  }
}
