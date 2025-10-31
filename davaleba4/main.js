// ასაკის შემმოწმებელი ფუნქცია
function ageChecker(age){
    if(age < 18){
        console.log("you can't vote")
    }
    else{
        console.log("you can vote")
    }
};
ageChecker()
// პაროლს ამოწმებს და ახარისხებს მისაღებია სუსტია მიუღებელია თუ ძლიერი
function passwordChecker(password){
    password = String(password);
       const isOnlyNumbers = password
        .split('')                   
        .every(char => char >= '0' && char <= '9');
    if (isOnlyNumbers) {
        console.log("not acceptable");
    }
    else if ( password.length < 3){
        console.log("not acceptable")
    }
    else if (password.length >= 3 && password.length <= 6){
        console.log("password is weak")
    }
    else if (password.length >= 6 && password.length <= 8){
        console.log("password is acceptable")
    }
    else{
        console.log("password is strong")
    }
    


}
passwordChecker('guli')
// შეტანილ რიცხვს მის ფაქტორიალად აქცევს
function factorial(number){
    let result = 1;
    for (let i = 1; i <= number; i++)
        result *= i;
    console.log(result);

}
factorial(4)
// სტრიქონის პირველ ასოს დიდ ასოდ გადააქცევს
function capitalize(str) {
    if (str.length === 0);
    return str[0].toUpperCase() + str.slice(1);
}
console.log(capitalize('javascript'))
// შეტანილ არგუმენტის მიხედვით აბრუნებს სტრიქონს ცარიელია თუ არა შეტანილი მონაცემი
function blankOrNot(str2){
    if (str2.length === 0){
        return "this string is blank"
    }
    else if(str2.length !== 0){
        return "this string is not blank"
    }
}
console.log("")