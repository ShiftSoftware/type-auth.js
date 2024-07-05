import { Access, AccessTree } from "../../src/access"

export const Affiliates: AccessTree = {
  CRMActions: {
    DiscountValue: "2",
    DecimalDiscount: 2.5,
    Customers: [Access.Read],
    DiscountVouchers: [Access.Read],
    WorkSchedule: "20:00:00 - 21:00:00",
  },
}
