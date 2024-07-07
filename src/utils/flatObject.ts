export const flatObject = (
  obj: { [key: string]: any },
  currentPath = ""
): { [key: string]: string[] | number | string } => {
  let flatted = {}

  Object.entries(obj).forEach(([key, value]) => {
    const fieldPath = currentPath ? `${currentPath}.${key}` : key

    if (!(value instanceof Object) || Array.isArray(value)) {
      flatted = { ...flatted, [fieldPath]: value }
    } else {
      flatted = { ...flatted, ...flatObject(value, fieldPath) }
    }
  })

  return flatted
}
