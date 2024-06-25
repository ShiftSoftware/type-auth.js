import { describe, expect, it } from "vitest"

import CRMActions from "../shared/CRMActions"
import { systemActions } from "../shared/SystemActions"
import { superAdmin } from "../shared/AccessTreeExamples"
import { getTypeAuthContext } from "../shared/getTypeAuthContext"

import { actionProxy } from "../../src/action"
import { TypeAuthContext } from "../../src/core/TypeAuthContext"

const CRM = actionProxy(CRMActions).CRMActions
const SystemActions = actionProxy(systemActions).SystemActions

describe("Affiliate", () => {
  it("Login via wildcard.", () => {
    const tAuth = getTypeAuthContext(superAdmin)

    expect(tAuth.canAccess(SystemActions.Login.MultipleSession)).toBe(true)
  })

  it("No login.", () => {
    const tAuth = new TypeAuthContext(superAdmin)

    expect(tAuth.canAccess(SystemActions.Login.MultipleSession)).toBe(false)
  })

  it("Customer via wildcard.", () => {
    const tAuth = getTypeAuthContext(superAdmin)

    expect(tAuth.canDelete(CRM.Customers)).toBe(true)
  })
})
