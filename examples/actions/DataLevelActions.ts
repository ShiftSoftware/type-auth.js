import {
  DynamicTextAction,
  DynamicReadAction,
  DynamicBooleanAction,
  DynamicDecimalAction,
  DynamicReadWriteAction,
  DynamicReadWriteDeleteAction,
} from "../../src/action"

export const DataLevelActions = {
  Name: "Data Level Actions",
  Description: "Actions Data Level Access.",
  Cities: new DynamicBooleanAction("Cities"),
  Countries: new DynamicReadAction("Countries"),
  Companies: new DynamicReadWriteAction("Companies"),
  Departments: new DynamicReadWriteDeleteAction("Departments"),
  DiscountByDepartment: new DynamicTextAction({
    name: "Discount",
    minimumAccess: "0",
    maximumAccess: "100",
    comparer: (a, b) => (a && b ? Math.max(+a, +b).toString() : null),
  }),
  DiscountByDepartmentDecimal: new DynamicDecimalAction({
    name: "Discount (Decimal)",
    minimumAccess: 0,
    maximumAccess: 100,
  }),
}
