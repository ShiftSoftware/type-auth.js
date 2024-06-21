import CRMActions from "./CRMActions"
import { systemActions } from "./SystemActions"

import { TypeAuthContext } from "../../src/core/TypeAuthContext"
import { AccessTree } from "../../src/access"
import { TypeAuthContextBuilder } from "../../src/core/TypeAuthContextBuilder"

export const getTypeAuthContext = (accessTree: AccessTree): TypeAuthContext => {
  const typeAuthContext = new TypeAuthContextBuilder()
    .addAccessTree(accessTree)
    .addActionTree(systemActions)
    .addActionTree(CRMActions)
    .build()

  return typeAuthContext
}
