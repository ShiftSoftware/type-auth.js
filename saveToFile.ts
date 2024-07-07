const fs = require("fs")

const replacerFunc = () => {
  const visited = new WeakSet()
  return (key: any, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (visited.has(value)) {
        return
      }
      visited.add(value)
    }
    return value
  }
}

const saveToFile = (myVariable: any) => {
  const data = JSON.stringify(myVariable)

  const filePath = "output.json"

  fs.writeFile(filePath, data, (err: any) => {})
}

export default saveToFile
