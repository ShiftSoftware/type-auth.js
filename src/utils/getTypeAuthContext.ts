import { AccessTree } from "../access"
import { CRMActions } from "../../examples/actions/CRMActions"

import { SystemActions } from "../../examples/actions/SystemActions"

import { TypeAuthContext } from "../core/TypeAuthContext"
import { TypeAuthContextBuilder } from "../core/TypeAuthContextBuilder"

export const getTypeAuthContext = (accessTree: AccessTree): TypeAuthContext => {
  const typeAuthContext = new TypeAuthContextBuilder()
    .addAccessTree(accessTree)
    .addActionTree(SystemActions)
    .addActionTree(CRMActions)
    .build()

  return typeAuthContext
}
