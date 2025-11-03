let h1 = document.getElementById("h1")
h1.style.color = "blue"
let span = document.getElementById("span")
span.style.fontSize = "200%"
let h2 = document.getElementById("h2")
h2.style.backgroundColor = "blue"
h2.style.color = "white"
h2.style.width = "50%"

let h22 = document.getElementById("special")
h22.style.backgroundColor = "yellow"
h22.style.width = "40%"
let classes = document.getElementsByClassName("alert")
for (let i = 0; i < classes.length; i++) {
  classes[i].style.border = "1px solid grey";
}
let stop = document.getElementsByClassName("stop")
for (let i = 0; i < stop.length; i++) {
  stop[i].style.backgroundColor = "red";
}

 let go = document.getElementsByClassName("go")
for (let i = 0; i < go.length; i++) {
  go[i].style.backgroundColor = "green";
}