const fs = require("fs");
//input file path here
var inputPath = "/home/ubox30/Downloads/sbiswas-tax/Input-File.csv"
var fileContent = fs.readFileSync(inputPath, 'utf8');

//output file path 
var outputPath = "/home/ubox30/Downloads/sbiswas-tax/Output-File.csv"
var arrayContent = fileContent.split('\n');
let map = new Map();
var output = [`Product-Name,Product-CostPrice,Product-SalesTax,Product-SalesTaxAmount,Product-FinalPrice,Country\n`];
//mapping some countries with their sales tax
map.set('India', 20);
map.set('America', 25);
map.set('Australia', 35);
map.set('Bhutan', 25);
map.set('Nepal', 30);
map.set('China', 50);


for (let i = 1; i<arrayContent.length; i++) {
     let temp = arrayContent[i].split(',');
     let country=temp[2];
     let salesTax=map.get(country.trim());
     let salesTaxAmount = (salesTax / 100) * parseInt(temp[1]);
     let FinalPrice = parseInt(temp[1]) + salesTaxAmount;
     let str = `${temp[0]},${temp[1]},${salesTax},${salesTaxAmount},${FinalPrice},${temp[2]}\n`;
     output[i] = str;
}

let outputString= output.toString();
// outputString = outputString.replace(/(\r)/gm, "")
// console.log(outputString);
fs.writeFileSync(outputPath, outputString);
console.log("Output Updated !!!");



