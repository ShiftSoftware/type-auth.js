import { Access, AccessTree } from "../../src/access"

export const SalesAdmin: AccessTree = {
  SystemActions: {
    UserModule: {
      Users: [Access.Read, Access.Write],
    },
  },
  CRMActions: [Access.Read, Access.Write, Access.Delete, Access.Maximum],
}
