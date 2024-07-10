import { Affiliates, CRMActions } from "./examples"
import { getTypeAuthContext } from "./src/core"
import saveToFile from "./saveToFile"

const tAuth = getTypeAuthContext(Affiliates)

saveToFile(Affiliates)

console.log(tAuth.canDelete(CRMActions.Customers))
