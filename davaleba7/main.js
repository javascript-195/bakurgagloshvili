function grow(){
    const image = document.getElementById("img")
    let currentWidth = image.clientWidth;
    image.style.width = (currentWidth + 200) + "px";
}
function shrink(){
    const image = document.getElementById("img")
    let currentWidth = image.clientWidth;
    image.style.width = (currentWidth - 200) + "px";
}
    function changeColor() {

      const colors = ["red", "blue", "green", "purple", "orange", "brown", "pink"];
      const randomIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomIndex];
      const text = document.getElementById("text");
      
      text.style.color = randomColor;
      text.innerText = randomColor
    }
function show(){
    const text = document.getElementById('text2')
    text.innerText = "ესეც დამალული კონტენტი"
}
function hide(){
    const text = document.getElementById('text2')
    text.innerText = ""
}