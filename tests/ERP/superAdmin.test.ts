import { describe, expect, it } from "vitest"

import { CRMActions, SuperAdmin, SystemActions } from "../../examples"
import { getTypeAuthContext, TypeAuthContext } from "../../src/core"

describe("Affiliate", () => {
  it("Login via wildcard.", () => {
    const tAuth = getTypeAuthContext(SuperAdmin)

    expect(tAuth.canAccess(SystemActions.Login.MultipleSession)).toBe(true)
  })

  it("No login.", () => {
    const tAuth = new TypeAuthContext(SuperAdmin)

    expect(tAuth.canAccess(SystemActions.Login.MultipleSession)).toBe(false)
  })

  it("Customer via wildcard.", () => {
    const tAuth = getTypeAuthContext(SuperAdmin)

    expect(tAuth.canDelete(CRMActions.Customers)).toBe(true)
  })
})
