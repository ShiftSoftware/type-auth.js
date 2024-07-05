import { Access, AccessTree } from "../../src/access"

export const SuperAdmin: AccessTree = {
  CRMActions: [Access.Read, Access.Write, Access.Delete, Access.Maximum],
  SystemActions: [Access.Read, Access.Write, Access.Delete, Access.Maximum],
}
