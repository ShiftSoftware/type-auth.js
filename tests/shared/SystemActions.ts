// src/actionTrees/SystemActions.ts

import { BooleanAction, ReadWriteDeleteAction } from "../../src/action"

class SystemActions {
  public static Login = class {
    public static readonly MultipleSession = new BooleanAction(
      "Multiple Login Sessions",
      "Ability to have multiple sessions. Or Be logged in on multiple browsers/devices at once."
    )

    public static readonly DestroyOtherSession = new BooleanAction(
      "Destroy Other Sessions",
      "Ability to destroy other login sessions. Or Logout from other browsers/devices when trying to login on a new browser/device."
    )
  }

  public static UserModule = class {
    public static readonly Users = new ReadWriteDeleteAction("User Access")
    public static readonly SetOrResetPassword = new BooleanAction(
      "Set or Reset Passwords",
      "Ability to Set or Reset Users' Passwords."
    )

    public static readonly DestroyLoginSessions = new BooleanAction(
      "Destroy Login Sessions",
      "Ability to force users to logout from browsers/devices they're already logged in."
    )

    public static readonly Roles = new ReadWriteDeleteAction("Role Access")
  }
}

export default SystemActions
