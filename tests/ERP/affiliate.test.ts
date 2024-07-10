import { describe, expect, it } from "vitest"

import { getTypeAuthContext } from "../../src/core"

import { Affiliates, CRMActions } from "../../examples"
import { timeWithinRange } from "../../src/utils/timeWithinRange"
import { timeSpan } from "../../src/utils"

describe("Affiliate", () => {
  it("Read only on customer.", () => {
    const tAuth = getTypeAuthContext(Affiliates)

    expect(tAuth.canRead(CRMActions.Customers)).toBe(true)
    expect(tAuth.canWrite(CRMActions.Customers)).toBe(false)
    expect(tAuth.canDelete(CRMActions.Customers)).toBe(false)
  })

  it("2% Discount value.", () => {
    const tAuth = getTypeAuthContext(Affiliates)

    expect(tAuth.accessValue(CRMActions.DiscountValue)).toBe("2")
  })

  it("2.5% Decimal discount value.", () => {
    const tAuth = getTypeAuthContext(Affiliates)

    expect(tAuth.accessValue(CRMActions.DecimalDiscount)).toBe(2.5)
  })

  it("No access on tickets.", () => {
    const tAuth = getTypeAuthContext(Affiliates)

    expect(tAuth.canRead(CRMActions.Tickets)).toBe(false)
    expect(tAuth.canWrite(CRMActions.Tickets)).toBe(false)
  })

  it("No access on comments", () => {
    const tAuth = getTypeAuthContext(Affiliates)

    expect(tAuth.canRead(CRMActions.SocialMediaComments)).toBe(false)
  })

  it("Work at 20 to 21", () => {
    expect(timeWithinRange(timeSpan(20, 15, 0), Affiliates)).toBe(true)
  })

  it("Can't work outside 20 to 21", () => {
    expect(timeWithinRange(timeSpan(17, 0, 0), Affiliates)).toBe(false)
  })
})
