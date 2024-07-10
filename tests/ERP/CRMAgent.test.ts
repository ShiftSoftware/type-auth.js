import { describe, expect, it } from "vitest"
import { CRMActions, CRMAgent } from "../../examples"

import { getTypeAuthContext } from "../../src/core"
import { timeSpan, timeWithinRange } from "../../src/utils"

describe("CRM Agent", () => {
  it("10% Discount value.", () => {
    const tAuth = getTypeAuthContext(CRMAgent)

    expect(tAuth.accessValue(CRMActions.DiscountValue)).toBe("10")
  })

  it("15% Decimal discount value.", () => {
    const tAuth = getTypeAuthContext(CRMAgent)

    expect(tAuth.accessValue(CRMActions.DecimalDiscount)).toBe(15)
  })

  it("Read/Write tickets.", () => {
    const tAuth = getTypeAuthContext(CRMAgent)

    expect(tAuth.canRead(CRMActions.Tickets)).toBe(true)
    expect(tAuth.canWrite(CRMActions.Tickets)).toBe(true)
  })

  it("Morning shift.", () => {
    expect(timeWithinRange(timeSpan(9, 45, 0), CRMAgent)).toBe(true)
  })

  it("Afternoon break.", () => {
    expect(timeWithinRange(timeSpan(13, 15, 0), CRMAgent)).toBe(false)
  })

  it("After work.", () => {
    expect(timeWithinRange(timeSpan(18, 0, 1), CRMAgent)).toBe(false)
  })
})
