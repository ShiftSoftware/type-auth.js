import {
  ActionTree,
  DynamicTextAction,
  DynamicReadAction,
  DynamicBooleanAction,
  DynamicDecimalAction,
  DynamicReadWriteAction,
  DynamicReadWriteDeleteAction,
} from "../../src/action"

export const dataLevelActions: ActionTree = {
  Cities: new DynamicBooleanAction("Cities"),
  Countries: new DynamicReadAction("Countries"),
  Companies: new DynamicReadWriteAction("Companies"),
  Departments: new DynamicReadWriteDeleteAction("Departments"),
  DiscountByDepartment: new DynamicTextAction("Discount", {
    minimumAccess: "0",
    maximumAccess: "100",
    comparer: (a, b) => (a && b ? Math.max(+a, +b).toString() : null),
  }),
  DiscountByDepartmentDecimal: new DynamicDecimalAction("Discount (Decimal)", {
    minimumAccess: 0,
    maximumAccess: 100,
  }),
}
