import { isAfter, isBefore, isEqual, parse, parseISO } from "date-fns"

import CRMActions from "./CRMActions"
import { AccessTree } from "../../src/access"
import { actionProxy } from "../../src/action"

import { getTypeAuthContext } from "./getTypeAuthContext"

const CRM = actionProxy(CRMActions).CRMActions

export const timeWithinRange = (currentTime: Date, accessFile: AccessTree) => {
  const tAuth = getTypeAuthContext(accessFile)

  const schedule = tAuth.accessValue(CRM.WorkSchedule) as string | null

  if (schedule) {
    const timeSlots = schedule.split(",").map((slot) => slot.trim())

    for (let index = 0; index < timeSlots.length; index++) {
      const times = timeSlots[index].split("-").map((slot) => slot.trim())

      const startTime = parse(times[0], "HH:mm:ss", new Date())
      const endTime = parse(times[1], "HH:mm:ss", new Date())

      return (
        (isAfter(currentTime, startTime) || isEqual(currentTime, startTime)) &&
        (isBefore(currentTime, endTime) || isEqual(currentTime, endTime))
      )
    }
  }

  return false
}
