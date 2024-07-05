import { Access, AccessTree } from "../../src/access"

export const CRMAgent: AccessTree = {
  CRMActions: {
    DiscountValue: "10",
    DecimalDiscount: 15.0,
    SocialMediaComments: [Access.Read],
    Tickets: [Access.Read, Access.Write],
    Customers: [Access.Read, Access.Write],
    DiscountVouchers: [Access.Read, Access.Write],
    WorkSchedule: "08:00:00 - 13:00:00, 14:00:00 - 18:00:00",
  },
}
