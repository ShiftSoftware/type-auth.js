import { AccessTree } from "../access"

import { CRMActions, SystemActions } from "../../examples/actions"

import { TypeAuthContext, TypeAuthContextBuilder } from "../core"

export const getTypeAuthContext = (accessTree: AccessTree): TypeAuthContext => {
  const typeAuthContext = new TypeAuthContextBuilder()
    .addAccessTree(accessTree)
    .addActionTree({ SystemActions })
    .addActionTree({ CRMActions })
    .build()

  return typeAuthContext
}
