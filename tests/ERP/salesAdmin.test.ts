import { describe, expect, it } from "vitest"

import { getTypeAuthContext } from "../../src/core"
import { CRMActions, SalesAdmin, SystemActions } from "../../examples"

describe("Sales admin", () => {
  it("Full discount via wild card.", () => {
    const tAuth = getTypeAuthContext(SalesAdmin)

    expect(tAuth.accessValue(CRMActions.DiscountValue)).toBe("100")
  })

  it("Full decimal discount via wild card.", () => {
    const tAuth = getTypeAuthContext(SalesAdmin)

    expect(tAuth.accessValue(CRMActions.DecimalDiscount)).toBe(100)
  })

  it("Only read/write users.", () => {
    const tAuth = getTypeAuthContext(SalesAdmin)

    expect(tAuth.canRead(SystemActions.UserModule.Users)).toBe(true)
    expect(tAuth.canWrite(SystemActions.UserModule.Users)).toBe(true)
    expect(tAuth.canDelete(SystemActions.UserModule.Users)).toBe(false)
  })

  it("Full access on discount voucher.", () => {
    const tAuth = getTypeAuthContext(SalesAdmin)

    expect(tAuth.canRead(CRMActions.DiscountVouchers)).toBe(true)
    expect(tAuth.canWrite(CRMActions.DiscountVouchers)).toBe(true)
    expect(tAuth.canDelete(CRMActions.DiscountVouchers)).toBe(true)
  })

  it("Full access on tickets & comments.", () => {
    const tAuth = getTypeAuthContext(SalesAdmin)

    expect(tAuth.canRead(CRMActions.Tickets)).toBe(true)
    expect(tAuth.canWrite(CRMActions.Tickets)).toBe(true)
    expect(tAuth.canDelete(CRMActions.SocialMediaComments)).toBe(true)
  })
})
