import { describe, it, expect, test } from "vitest"

describe("Sample Test", () => {
  it("should run a test", () => {
    expect(true).toBe(true)
  })
})

test("Math.sqrt()", () => {
  expect(Math.sqrt(4)).toBe(2)
  expect(Math.sqrt(144)).toBe(12)
  expect(Math.sqrt(2)).toBe(Math.SQRT2)
})
