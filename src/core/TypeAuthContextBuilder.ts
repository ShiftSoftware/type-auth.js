import { AccessTree } from "../access"
import { ActionTree } from "../action"
import { TypeAuthContext } from "./TypeAuthContext"

export class TypeAuthContextBuilder {
  private actionTrees: Array<ActionTree>
  private accessTrees: Array<AccessTree>

  constructor() {
    this.accessTrees = []
    this.actionTrees = []
  }

  public addAccessTree(newAccess: AccessTree = {}): TypeAuthContextBuilder {
    const validatedAccessTree = Object.keys(newAccess).length ? newAccess : {}
    this.accessTrees.push(validatedAccessTree)
    return this
  }

  public addActionTree(actionTreeType: ActionTree): TypeAuthContextBuilder {
    this.actionTrees.push(actionTreeType)
    return this
  }

  public build(): TypeAuthContext {
    return new TypeAuthContext(this.accessTrees, this.actionTrees)
  }
}
