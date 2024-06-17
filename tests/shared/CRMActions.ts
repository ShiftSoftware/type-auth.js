import {
  ReadAction,
  TextAction,
  DecimalAction,
  ReadWriteAction,
  ReadWriteDeleteAction,
} from "../../src/action"

class CRMActions {
  public static readonly Customers = new ReadWriteDeleteAction("Customers")

  public static readonly DiscountVouchers = new ReadWriteDeleteAction(
    "Discount Vouchers"
  )

  public static readonly DiscountValue = new TextAction("Sale Discount", {
    description: "",
    minimumAccess: "0",
    maximumAccess: "100",
    comparer: (a, b) => (a && b ? Math.max(+a, +b).toString() : null),
  })

  public static readonly DecimalDiscount = new DecimalAction(
    "Sale Discount (Decimal)",
    { minimumAccess: 0, maximumAccess: 100 }
  )

  public static readonly Tickets = new ReadWriteAction("Tickets")

  public static readonly SocialMediaComments = new ReadAction(
    "Social Media Comments"
  )

  public static readonly WorkSchedule = new TextAction("Work Schedule", {
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

export default CRMActions
