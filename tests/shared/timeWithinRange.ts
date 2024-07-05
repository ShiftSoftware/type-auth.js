import { isAfter, isBefore, isEqual, parse } from "date-fns"

import { AccessTree } from "../../src/access"
import { CRMActions } from "../../examples/actions/CRMActions"
import { getTypeAuthContext } from "../../src/utils/getTypeAuthContext"

export const timeWithinRange = (currentTime: Date, accessFile: AccessTree) => {
  const tAuth = getTypeAuthContext(accessFile)

  const schedule = tAuth.accessValue(CRMActions.WorkSchedule) as string | null

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
