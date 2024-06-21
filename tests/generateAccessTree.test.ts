import { isEqual } from "lodash"

import { describe, it } from "vitest"
import { expect } from "vitest"
import { getTypeAuthContext } from "./shared/getTypeAuthContext"
import { affiliates, CRMAgent, superAdmin } from "./shared/AccessTreeExamples"

describe("Generating access tree", () => {
  it("Same context 1", () => {
    const tAuth = getTypeAuthContext(affiliates)

    const accessTree = tAuth.generateAccessTree(tAuth)

    expect(isEqual(accessTree, affiliates)).toBe(true)
  })

  it("Same context 2", () => {
    var tAuth = getTypeAuthContext(CRMAgent)

    var accessTree = tAuth.generateAccessTree(tAuth)

    expect(isEqual(accessTree, CRMAgent)).toBe(true)
  })

  it("Same context 3", () => {
    var tAuth = getTypeAuthContext(superAdmin)

    var accessTree = tAuth.generateAccessTree(tAuth)

    expect(isEqual(accessTree, superAdmin)).toBe(true)
  })
})
