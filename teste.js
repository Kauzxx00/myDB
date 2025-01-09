const { MyDB } = require("./index.js");
const db = new MyDB();

db.create("12345");
db.update("12345", { "oi.opa": "eae" });
db.push("12345", { "oi.array": "bla"});

console.log(
	db.get("12345", "oi.opa") // retorna: eae
);

console.log(
	db.get("12345").oi
	// retorna: { opa: 'eae', array: [ 'bla' ] }
);