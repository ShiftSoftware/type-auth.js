import { Access, AccessTree } from "../../src/access"

export const superAdmin: AccessTree = {
  CRMActions: [Access.Read, Access.Write, Access.Delete, Access.Maximum],
  SystemActions: [Access.Read, Access.Write, Access.Delete, Access.Maximum],
}

export const salesAdmin: AccessTree = {
  SystemActions: {
    UserModule: {
      Users: [Access.Read, Access.Write],
    },
  },
  CRMActions: [Access.Read, Access.Write, Access.Delete, Access.Maximum],
}

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

export const affiliates: AccessTree = {
  CRMActions: {
    DiscountValue: "2",
    DecimalDiscount: 2.5,
    Customers: [Access.Read],
    DiscountVouchers: [Access.Read],
    WorkSchedule: "20:00:00 - 21:00:00",
  },
}
