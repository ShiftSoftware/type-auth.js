const fs = require("fs")

const saveToFile = (myVariable: any) => {
  const data = JSON.stringify(myVariable, null, 2)

  const filePath = "output.json"

  fs.writeFile(filePath, data, (err: any) => {
    if (err) {
      console.error("Error writing to file", err)
    } else {
      console.log("Variable successfully saved to file")
    }
  })
}

export default saveToFile
