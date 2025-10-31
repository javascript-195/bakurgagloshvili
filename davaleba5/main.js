// პროგრამა რომელსაც გამოაქ ყოველი მესამე ელემენტი მასივიდან
let array = [1,2,3,4,5,6,7,8,9,10]
for (let i = 2; i < array.length; i = i + 3) {
    console.log(array[i])
    
}
let index = 2
while (index < array.length){
    
    console.log(array[index])
    index = index + 3
}
// პროგრამა რომელსაც მასივი უკუღმა გამოაქ
for(let i = 10; i >= 0; i--){
    console.log(array[i])
}
let i2 = 10
while(i2 >= 0){
    console.log(array[i2])
    i2--
}
// ამოვიღოთ მასივიდან Bob სახელი
let arrNames =  ['John', 'Nick', 'Bob', 'Mary', 'Sue', 'Ann', 'Bob']
for (let i = 0; i < arrNames.length; i++) {
    if (arrNames[i] === 'Bob') {
        continue;
    }
    console.log(arrNames[i]);
}
let i3 = 0
while( i3 < arrNames.length){
    i3++
        if (arrNames[i3] === 'Bob') {
        continue;
    }
    console.log(arrNames[i3]);
}
let newArr = arrNames.filter(name => name !== 'Bob');

console.log(newArr);

// ფუნქცია რომელიც აბრუნებს რიცხვის ხარისხს ციკლური ოპერაციის გამოყენებით
function fun(number, power) {
    let result = 1;

    for (let i = 0; i < power; i++) {
        result = result * number;
    }

    return result;
}
console.log(fun(3, 4))
// ფუნქცია რომელიც იანგარიშებს რიცხვებიდან რიცხვებს რომლებიც 3-ის ჯერადებია
for (let i = 0; i <= 100; index++) {}
function numbers(){
    if(i % 3 === 0 && i % 5 === 0){
        console.log(i, "FizzBuzz")
    }
    else if (i % 5 === 0){
        console.log(i, 'Buzz')
    }
    else if (i % 3 === 0){
        console.log(i, 'Fizz')
    }
    else{console.log(i)}
}
numbers()
// შეტანილ რიცხვს მის ფაქტორიალად აქცევს
function factorialCalculator(number){
    let result = 1;
    for (let i = 1; i <= number; i++)
        result = result * i;
    console.log(result);

}
factorialCalculator(4)
// სტრიქონის პირველ ასოს დიდ ასოდ გადააქცევს
function capitalize(str) {
    if (str.length === 0);
    return str[0].toUpperCase() + str.slice(1);
}
console.log(capitalize('javascript'))
// შეტანილ არგუმენტის მიხედვით აბრუნებს სტრიქონს ცარიელია თუ არა შეტანილი მონაცემი
function blankStringChecker(testString){
    if (testString.length === 0){
        return "this string is blank"
    }
    else if(testString.length !== 0){
        return "this string is not blank"
    }
}
console.log("")
// გადააქცევს სტრინგს მასივად
function stringToArray(str) {
    return str.split(' ');
}


let testString = "Hello World";
console.log(stringToArray(testString));
// ემაილის დამცველი ფუნქცია
function protectEmail(email) {
    let [fullName, domain] = email.split('@');
    let [firstName, lastName] = fullName.split('.');
    let hiddenLastName = '.'.repeat(lastName.length);
    return `${firstName}${hiddenLastName}@${domain}`;
}

// გამოყენების მაგალითი
let email = "beqa.beqauri@gmail.com";
console.log(protectEmail(email));
// ფუნქცია რომელიც იპოვის ყველაზე გრძელ სიტყვას
function findLongestWord(str) {
    let words = str.split(' ');
    let longest = "";
    

    for (let i = 0; i < words.length; i++) {
        if (words[i].length > longest.length) {
            longest = words[i];
        }
    }
    
    return longest;
}

let text = "Hello world from JavaScript programming";
console.log(findLongestWord(text));
// ობიექტი რომელიც ანგარიშობს არითმეტიკულ ოპერაციებს
let calculator = {
    num1: 10,
    num2: 5,
    
    add: function() {
        return this.num1 + this.num2;
    },
    
    substract: function() {
        return this.num1 - this.num2;
    },
    
    multiply: function() {
        return this.num1 * this.num2;
    },
    
    divide: function() {
        return this.num1 / this.num2;
    }
};

// გამოყენება
console.log("Add:", calculator.add());          
console.log("Subtract:", calculator.substract()); 
console.log("Multiply:", calculator.multiply()); 
console.log("Divide:", calculator.divide()); 