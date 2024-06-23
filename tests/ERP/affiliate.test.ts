import { describe, expect, it } from "vitest"

import { TypeAuthContext } from "../../src/core/TypeAuthContext"

import { actionProxy } from "../../src/action"
import { affiliates } from "../shared/AccessTreeExamples"
import { getTypeAuthContext } from "../shared/getTypeAuthContext"

import CRMActions from "../shared/CRMActions"

const CRM = actionProxy(CRMActions).CRMActions

describe("Affiliate", () => {
  it("Read only on customer.", () => {
    const tAuth: TypeAuthContext = getTypeAuthContext(affiliates)

    expect(tAuth.canRead(CRM.Customers)).toBe(true)
    expect(tAuth.canWrite(CRM.Customers)).toBe(false)
    expect(tAuth.canDelete(CRM.Customers)).toBe(false)
  })
})
