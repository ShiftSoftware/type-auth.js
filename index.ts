import { Affiliates } from "./examples/accesses/Affiliates"
import { CRMActions } from "./examples/actions/CRMActions"
import saveToFile from "./saveToFile"
import { SystemActions } from "./examples/actions"
import { getTypeAuthContext } from "./src/core"

getTypeAuthContext(Affiliates)
