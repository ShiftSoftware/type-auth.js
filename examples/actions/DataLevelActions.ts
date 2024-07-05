import {
  DynamicTextAction,
  DynamicReadAction,
  DynamicBooleanAction,
  DynamicDecimalAction,
  DynamicReadWriteAction,
  DynamicReadWriteDeleteAction,
} from "../../src/action"

export class DataLevel {
  static DisplayName = "Data Level Actions"
  static DisplayDescription = "Actions Data Level Access."

  static Cities = new DynamicBooleanAction("Cities")

  static Countries = new DynamicReadAction("Countries")

  static Companies = new DynamicReadWriteAction("Companies")

  static Departments = new DynamicReadWriteDeleteAction("Departments")

  static DiscountByDepartment = new DynamicTextAction({
    name: "Discount",
    minimumAccess: "0",
    maximumAccess: "100",
    comparer: (a, b) => (a && b ? Math.max(+a, +b).toString() : null),
  })

  static DiscountByDepartmentDecimal = new DynamicDecimalAction({
    name: "Discount (Decimal)",
    minimumAccess: 0,
    maximumAccess: 100,
  })
}
