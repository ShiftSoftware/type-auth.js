import {
  ReadAction,
  TextAction,
  DecimalAction,
  ReadWriteAction,
  ReadWriteDeleteAction,
} from "../../src/action"

export class CRMActions {
  static Name = "CRM Actions"

  static Description = "Actions Related to the CRM Module."

  static Tickets = new ReadWriteAction("Tickets")

  static Customers = new ReadWriteDeleteAction("Customers")

  static SocialMediaComments = new ReadAction("Social Media Comments")

  static DiscountVouchers = new ReadWriteDeleteAction("Discount Vouchers")

  static DiscountValue = new TextAction({
    description: "",
    minimumAccess: "0",
    maximumAccess: "100",
    name: "Sale Discount",
    comparer: (a, b) => (a && b ? Math.max(+a, +b).toString() : null),
  })

  static DecimalDiscount = new DecimalAction({
    minimumAccess: 0,
    maximumAccess: 100.0,
    name: "Sale Discount (Decimal)",
  })

  static WorkSchedule = new TextAction({
    name: "Work Schedule",
    description:
      "One or more time slots allowed for operation. Certain actions are not allowed outside work schedule.",
    maximumAccess: "00:00:00 - 23:59:59",
    comparer: (a, b) => {
      const joined: string[] = []

      if (a !== null) joined.push(...a.split(",").map((x) => x.trim()))
      if (b !== null) joined.push(...b.split(",").map((x) => x.trim()))

      return joined.join(", ")
    },
  })
}
