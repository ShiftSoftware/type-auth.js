import { describe, expect, it } from "vitest"

import CRMActions from "../shared/CRMActions"
import { timeWithinRange } from "../shared/helper"
import { CRMAgent } from "../shared/AccessTreeExamples"
import { getTypeAuthContext } from "../shared/getTypeAuthContext"

import { timeSpan } from "../../src/utils"
import { actionProxy } from "../../src/action"

const CRM = actionProxy(CRMActions).CRMActions

describe("CRM Agent", () => {
  it("10% Discount value.", () => {
    const tAuth = getTypeAuthContext(CRMAgent)

    expect(tAuth.accessValue(CRM.DiscountValue)).toBe("10")
  })

  it("15% Decimal discount value.", () => {
    const tAuth = getTypeAuthContext(CRMAgent)

    expect(tAuth.accessValue(CRM.DecimalDiscount)).toBe(15)
  })

  it("Read/Write tickets.", () => {
    const tAuth = getTypeAuthContext(CRMAgent)

    expect(tAuth.canRead(CRM.Tickets)).toBe(true)
    expect(tAuth.canWrite(CRM.Tickets)).toBe(true)
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
