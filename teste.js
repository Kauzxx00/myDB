const db = require("./index.js")

db.create("12345")

db.update("12345", { "valores=>valor1": "valor1"})
db.push("12345", { "arrays=>array1": "valor1" })