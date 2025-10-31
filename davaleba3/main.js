function square (a) {
    console.log(a*a)
};

square(7);
function fahrenheit (a){
    console.log((a*9/5)+32)
};
fahrenheit(2);
function userNumber (a,b,c){
    if (a >= b && a <= c) {
        console.log("თქვენი რიცხვი დიაპაზონშია");
    }
    else{
        console.log("თქვენი რიცხვი დიაპაზონში არაა");
    }
};
userNumber(1,7,10);
function year (a){
    if (a % 4 == 0 && a % 100 != 0 || a % 400 == 0){
        console.log("თქვენი შეყვანილი წელი ნაკიანია")
    }
    else{
        console.log("თქვენი შეყვანილი წელი ნაკიანი არაა")
    }
};
year(2000);
let firstNumber = prompt("შეიყვანეთ პირველი რიცხვი");
let secondNumber = prompt("შეიყვანეთ მეორე რიცხვი");
let operator = prompt("შეიყვანეთ არითმეტიკული ოპერაცია");

function calculator (firstNumber, secondNumber, operator){
    firstNumber = Number(firstNumber)
    secondNumber = Number(secondNumber)
    if(operator === "+" ){
        return firstNumber + secondNumber;
    }
    else if(operator === "-"){
        return firstNumber - secondNumber;
    }
    else if (operator === "*"){
        return firstNumber * secondNumber;
    }
    else if (operator === "/"){
        if (secondNumber, firstNumber !== 0) {
            return firstNumber / secondNumber;
        } else {
            return "შეცდომა: არ გაივყოფა 0-ზე";
        }
    } else {
        return "შეცდომა: არასწორი ოპერაცია";
    }
};
let result = calculator(firstNumber, secondNumber, operator);
alert(`${firstNumber} ${operator} ${secondNumber} = ${result}`);

