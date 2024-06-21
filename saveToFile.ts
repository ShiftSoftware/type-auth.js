const fs = require("fs")

const saveToFile = (myVariable: any) => {
  const data = JSON.stringify(myVariable, null, 2)

  const filePath = "output.json"

  fs.writeFile(filePath, data, (err: any) => {})
}

export default saveToFile
