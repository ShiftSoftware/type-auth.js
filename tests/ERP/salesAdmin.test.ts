import { describe, expect, it } from "vitest"

import CRMActions from "../shared/CRMActions"
import { systemActions } from "../shared/SystemActions"
import { salesAdmin } from "../shared/AccessTreeExamples"
import { getTypeAuthContext } from "../shared/getTypeAuthContext"

import { actionProxy } from "../../src/action"

const CRM = actionProxy(CRMActions).CRMActions
const SystemActions = actionProxy(systemActions).SystemActions

describe("Sales admin", () => {
  it("Full discount via wild card.", () => {
    const tAuth = getTypeAuthContext(salesAdmin)

    expect(tAuth.accessValue(CRM.DiscountValue)).toBe("100")
  })

  it("Full decimal discount via wild card.", () => {
    const tAuth = getTypeAuthContext(salesAdmin)

    expect(tAuth.accessValue(CRM.DecimalDiscount)).toBe(100)
  })

  it("Only read/write users.", () => {
    const tAuth = getTypeAuthContext(salesAdmin)

    expect(tAuth.canRead(SystemActions.UserModule.Users)).toBe(true)
    expect(tAuth.canWrite(SystemActions.UserModule.Users)).toBe(true)
    expect(tAuth.canDelete(SystemActions.UserModule.Users)).toBe(false)
  })

  it("Full access on discount voucher.", () => {
    const tAuth = getTypeAuthContext(salesAdmin)

    expect(tAuth.canRead(CRM.DiscountVouchers)).toBe(true)
    expect(tAuth.canWrite(CRM.DiscountVouchers)).toBe(true)
    expect(tAuth.canDelete(CRM.DiscountVouchers)).toBe(true)
  })

  it("Full access on tickets & comments.", () => {
    const tAuth = getTypeAuthContext(salesAdmin)

    expect(tAuth.canRead(CRM.Tickets)).toBe(true)
    expect(tAuth.canWrite(CRM.Tickets)).toBe(true)
    expect(tAuth.canDelete(CRM.SocialMediaComments)).toBe(true)
  })
})
