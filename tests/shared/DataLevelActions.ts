import {
  DynamicTextAction,
  DynamicReadAction,
  DynamicBooleanAction,
  DynamicDecimalAction,
  DynamicReadWriteAction,
  DynamicReadWriteDeleteAction,
} from "../../src/action"

class DataLevelActions {
  public static readonly Cities = new DynamicBooleanAction("Cities")
  public static readonly Countries = new DynamicReadAction("Countries")
  public static readonly Companies = new DynamicReadWriteAction("Companies")
  public static readonly Departments = new DynamicReadWriteDeleteAction(
    "Departments"
  )
  public static readonly DiscountByDepartment = new DynamicTextAction(
    "Discount",
    {
      minimumAccess: "0",
      maximumAccess: "100",
      comparer: (a, b) => (a && b ? Math.max(+a, +b).toString() : null),
    }
  )
  public static readonly DiscountByDepartmentDecimal = new DynamicDecimalAction(
    "Discount (Decimal)",
    {
      minimumAccess: 0,
      maximumAccess: 100,
    }
  )
}

export default DataLevelActions
