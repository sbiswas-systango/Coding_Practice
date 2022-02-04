const fs = require("fs");
//input file path here
var inputPath = '/home/ubox30/Downloads/sbiswas-tax2/Input-CSV1.csv';
var fileContent = fs.readFileSync(inputPath, 'utf8');
var arrayContent = fileContent.split('\n');
//output file path here
var outputPath = '/home/ubox30/Downloads/sbiswas-tax2/Output-CSV1.csv';
//variable with csv extension
var holdExtension = /(\.csv)$/i;
var output = [',Product-Name,Product-CostPrice,Product-SalesTax-Percentage,Product-SalesTaxAmount,Product-FinalPrice,Country\n'];
var outputString;
//input file format validator function
function inputFormatValidation(inputArrayContent) {
    for (let i = 1; i < inputArrayContent.length; i++) {
        let salesTaxRegex = /^([0-9]{1,2}){1}(\.[0-9]{1,2})?$/;
        let costPriceRegex = /^[0-9]+$/;
        let tempArray = inputArrayContent[i].split(',');
        if (tempArray.length != 4)
            throw new Error('Invalid Input, one or more fields empty')
        else if (!parseInt(tempArray[1].match(costPriceRegex)))
            throw new Error('Product-CostPrice is Invalid')
        else if (!parseInt(tempArray[2].match(salesTaxRegex)))
            throw new Error('Product-SalesTax is Invalid')
    }
}
//Tax calculator function
function salesTaxCalculator(inputArrayContent) {
    //loop is starting from index 1 because we already stored product headings at index 0   
    for (let i = 1; i < inputArrayContent.length; i++) {
        let tempArray1 = inputArrayContent[i].split(',');
        let productSalesTaxPercentage = parseInt((tempArray1[2]));
        let productSalesTaxAmount = (productSalesTaxPercentage / 100) * parseInt(tempArray1[1]);
        let productFinalPrice = parseInt(tempArray1[1]) + productSalesTaxAmount;
        let str = `${tempArray1[0]},${tempArray1[1]},${tempArray1[2]},${productSalesTaxAmount},${productFinalPrice},${tempArray1[3]}\n`;
        output[i] = str;
        
    }   
    outputString = output.toString();
}

//output file generator function
function generateOutputFile() {
    fs.writeFileSync(outputPath, outputString);
    console.log('Output Generated !!!');
}

//Main function
//calling environment
function main() {
    //input validation
    if (holdExtension.exec(inputPath)) {
        inputFormatValidation(arrayContent);
        salesTaxCalculator(arrayContent);
        generateOutputFile();
    }
    else {
        console.log('Invalid file type, input file should be a CSV file');
    }
}
main();