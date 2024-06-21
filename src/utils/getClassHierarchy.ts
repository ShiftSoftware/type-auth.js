function getClassHierarchy(obj: any): string {
  const classNames: string[] = []
  let currentProto = Object.getPrototypeOf(obj)

  while (currentProto && currentProto.constructor.name !== "Object") {
    classNames.push(currentProto.constructor.name)
    currentProto = Object.getPrototypeOf(currentProto)
  }

  return classNames.join(" -> ")
}

export default getClassHierarchy
