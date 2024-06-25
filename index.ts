import { actionProxy } from "./src/action/actionProxy"
import { getTypeAuthContext } from "./tests/shared/getTypeAuthContext"
import { CRMAgent } from "./tests/shared/AccessTreeExamples"
import CRMActions from "./tests/shared/CRMActions"

const CRM = actionProxy(CRMActions).CRMActions

const tAuth = getTypeAuthContext(CRMAgent)

const get = tAuth.accessValue(CRM.DiscountValue)

const expect = "10"

console.log(get === expect)
