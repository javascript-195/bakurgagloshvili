hoisting
let x = 1
function hoisting(){
const s = 5
s = 1
 number = 4
 x = 3
let y = 8
 console.log(number, x, y)
}
var number = 5
y = 10
console.log(y)
// აქ ლეთ ცვლადს შეგვიძლია ფუნქციის შიგნიდან შევუცვალოთ მნიშვნელობა 
// მაგრამ პირიქით ხერხდება ასევე ვარ ცვლადს შეგვიძლია ფუნქციის შიგნიდან
// შევუცვალოთ მნიშვნელობა. ცონსტ ცვლადი კიდე ლეთის მსგავსად
// ბლოკური კილვადობის არის მაგრამ მისგა განსხვავებით მისი მნიშვნელობის 
// შეცვლა არ შეიძლება

class Shape{
    constructor(name){
        this.name = name
    }
    area(){
       console.log("Area calculation not implemented for generic shape.")
    }
}
class Circle extends Shape{
    constructor(name, radius){
        super(name)
        this.radius = radius
    }
    area(){
               console.log(`${this.name} ${Math.PI * this.radius * this.radius}`);
    }
}
class Rectangle extends Shape{
    constructor(name, width, height){
        super(name)
        this.height = height
        this.width = width
    }
    area(){
        console.log(`${this.name} ${this.width * this.height}`);
    }
}
class Triangle extends Shape{
    constructor(name, base, height){
        super(name)
        this.base = base
        this.height = height
    }
    area(){
        console.log(`${this.name} ${(this.base * this.height) / 2}`);
    }
}

let shape = new Shape("Generic Shape");
let circle = new Circle("Area of Circle:", 5);
let rectangle = new Rectangle("483Area of Rectangle:", 10, 14);
let triangle = new Triangle("Area of Triangle: ", 8, 10);
shape.area()
circle.area()
rectangle.area()
triangle.area()