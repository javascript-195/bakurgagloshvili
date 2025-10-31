let x = [1, 2 , 3];
console.log(typeof(x));
console.log(x[0]);
console.log(x[2]);
let color = ["Blue ", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow "];
let colorNumber = ["th","st","nd","rd"];
console.log(`1${colorNumber[0]} color is ${color[0]}`);
console.log(`2${colorNumber[1]} color is ${color[1]}`);
console.log(`3${colorNumber[2]} color is ${color[2]}`);
let student = {
    name: "nika",
    surname: "qaldani",
    faculty: "international relations",
    age: 19,
    hasFriends: true,
    adress: "tbilisi",
};
student["proffesion"] = "developer";
delete student.hasFriends;
student.name = "jambuli";
console.log(student);