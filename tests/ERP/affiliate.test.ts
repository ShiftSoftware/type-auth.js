import { describe, expect, it } from "vitest"

import CRMActions from "../shared/CRMActions"
import { timeWithinRange } from "../shared/helper"
import { affiliates } from "../shared/AccessTreeExamples"
import { getTypeAuthContext } from "../shared/getTypeAuthContext"

import { timeSpan } from "../../src/utils"
import { actionProxy } from "../../src/action"
import { TypeAuthContext } from "../../src/core"

const CRM = actionProxy(CRMActions).CRMActions

describe("Affiliate", () => {
  it("Read only on customer.", () => {
    const tAuth: TypeAuthContext = getTypeAuthContext(affiliates)

    expect(tAuth.canRead(CRM.Customers)).toBe(true)
    expect(tAuth.canWrite(CRM.Customers)).toBe(false)
    expect(tAuth.canDelete(CRM.Customers)).toBe(false)
  })

  it("2% Discount value.", () => {
    const tAuth: TypeAuthContext = getTypeAuthContext(affiliates)

    expect(tAuth.accessValue(CRM.DiscountValue)).toBe("2")
  })

  it("2.5% Decimal discount value.", () => {
    const tAuth: TypeAuthContext = getTypeAuthContext(affiliates)

    expect(tAuth.accessValue(CRM.DecimalDiscount)).toBe(2.5)
  })

  it("No access on tickets.", () => {
    const tAuth: TypeAuthContext = getTypeAuthContext(affiliates)

    expect(tAuth.canRead(CRM.Tickets)).toBe(false)
    expect(tAuth.canWrite(CRM.Tickets)).toBe(false)
  })

  it("No access on comments", () => {
    const tAuth: TypeAuthContext = getTypeAuthContext(affiliates)

    expect(tAuth.canRead(CRM.SocialMediaComments)).toBe(false)
  })

  it("Work at 20 to 21", () => {
    expect(timeWithinRange(timeSpan(20, 15, 0), affiliates)).toBe(true)
  })

  it("Can't work outside 20 to 21", () => {
    expect(timeWithinRange(timeSpan(17, 0, 0), affiliates)).toBe(false)
  })
})
