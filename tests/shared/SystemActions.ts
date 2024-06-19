import {
  ActionTree,
  BooleanAction,
  ReadWriteDeleteAction,
} from "../../src/action"

export const systemActions: { [key: string]: ActionTree } = {
  Login: {
    MultipleSession: new BooleanAction(
      "Multiple Login Sessions",
      "Ability to have multiple sessions. Or Be logged in on multiple browsers/devices at once."
    ),

    DestroyOtherSession: new BooleanAction(
      "Destroy Other Sessions",
      "Ability to destroy other login sessions. Or Logout from other browsers/devices when trying to login on a new browser/device."
    ),
  },

  UserModule: {
    Users: new ReadWriteDeleteAction("User Access"),
    SetOrResetPassword: new BooleanAction(
      "Set or Reset Passwords",
      "Ability to Set or Reset Users' Passwords."
    ),

    DestroyLoginSessions: new BooleanAction(
      "Destroy Login Sessions",
      "Ability to force users to logout from browsers/devices they're already logged in."
    ),

    Roles: new ReadWriteDeleteAction("Role Access"),
  },
}
