import { AccessTree } from "../access"
import { ActionTree } from "../action"

export class TypeAuthContext {
  constructor(
    private accessTrees: Array<AccessTree>,
    private actionTrees: Array<ActionTree>
  ) {}
}
