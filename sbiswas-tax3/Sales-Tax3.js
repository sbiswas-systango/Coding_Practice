const fs = require("fs");
const addressInput = '/home/ubox30/Downloads/sbiswas-tax3/Input-CSV2.csv'
const addressInput2 = "/home/ubox30/Downloads/sbiswas-tax3/Input-CSV2.csv"
const addressOutput = "/home/ubox30/Downloads/sbiswas-tax3/Output-CSV2.csv"
const inputContent = fs.readFileSync(addressInput,'utf8');
const input2Content = fs.readFileSync(addressInput2,'utf8');
const arrSplitInLine = inputContent.split('\n');
const arrSplitInLine2 = input2Content.split('\n');
//creating an array which will store the data which should be returned as output
//and placing product details at index 0
let arrOutput=[`Product-Name,Product-CostPrice,Product-SalesTax-Percentage,Product-SalesTaxAmount,Product-FinalPrice,Country\n`];
let csvExtension = /(\.csv)$/i; 
// var outputString =new String();
class Input
{    
 inputValidation() 
 {
  if (!csvExtension.exec(addressInput)) 
    throw new Error('Input file is not of csv Extension');
 }
}
class Validation
{
  funValidation(arrSplitInLine)
  {
    //loop is starting from index 1 because at index 0 product headings are stored
    for(let i=1;i<arrSplitInLine.length;i++)
    {
      let regexCostPrice = /^[0-9]+$/;
      let regexSalesTax = /^([0-9]{1,2}){1}(\.[0-9]{1,2})?$/;
      let arrSplitInValue = arrSplitInLine[i].split(',');
      if(arrSplitInValue.length!=4)
       throw new Error('Value in each input line is not proper')
      else if( !parseInt(arrSplitInValue[1].match(regexCostPrice) )) //costprice should be number
       throw new Error(`Product-CostPrice should be a number in input file in ${i} line`)
      else if( !parseInt(arrSplitInValue[2].match(regexSalesTax)) ) // salesTax should be number
       throw new Error(`Product-SalesTax should be a number in input file in ${i} line`)
    }
  }
}
// outputString = arrOutput;
class Output
{
  writeOutput()
  {
    fs.writeFileSync(addressOutput,arrOutput);
  }
}

class Calucation
{
  calculateSalesTax(arrSplitInLine,arrSplitInLine2)
  {
    //loop is starting from index 1 because we already stored product headings at index 0   
    for(let i=1;i<arrSplitInLine.length;i++)
    {
     //temp array store details of each product like 
     //Product-Name(temp[0]),Product-CostPrice(temp[1]),Product-SalesTax-Percentage(temp[2]),Country(temp[3])
     let temp=arrSplitInLine[i].split(',');
     let temp2=arrSplitInLine2[i].split(',');
     let salesTaxPercentage=parseInt((temp[2]));
     let salesTaxAmount=(salesTaxPercentage/100)*parseInt(temp[1]);
     let FinalPrice=parseInt(temp[1])+salesTaxAmount;
     let str=`${temp[0]},${temp[1]},${temp[2]},${salesTaxAmount},${FinalPrice},${temp[3]}`;
     arrOutput +=str;
     console.log(str);
    }
  }
}
class Main
{
  constructor()
  {
    this.input = new Input();
    this.validation = new Validation();
    this.calculation = new Calucation();
    this.output = new Output();
  }
  //calling functions of different class
  callingFunctions(){
     try
     {
      this.input.inputValidation();
      this.validation.funValidation(arrSplitInLine);
      this.calculation.calculateSalesTax(arrSplitInLine,arrSplitInLine2);
     }
     catch(e)
     {
         console.log(e.message);
     }
     this.output.writeOutput();
    }
}
let main = new Main()
main.callingFunctions();