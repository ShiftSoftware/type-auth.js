import { AccessTree } from "../access"
import { ActionTree } from "../action"
import { TypeAuthContext } from "./TypeAuthContext"

export class TypeAuthContextBuilder {
  private actionTrees: ActionTree[]
  private accessTrees: AccessTree[]

  constructor() {
    this.accessTrees = []
    this.actionTrees = []
  }

  addAccessTree(newAccess: AccessTree): TypeAuthContextBuilder {
    this.accessTrees.push(newAccess)
    return this
  }

  addActionTree(actionTreeType: ActionTree): TypeAuthContextBuilder {
    this.actionTrees.push(actionTreeType)
    return this
  }

  build(): TypeAuthContext {
    return new TypeAuthContext(this.accessTrees, this.actionTrees)
  }
}
