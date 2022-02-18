var rect = document.getElementById("rect");
var uname = document.getElementById("name").innerHTML;
var width = document.getElementById("width").innerHTML;
var height = document.getElementById("height").innerHTML;
var color = document.getElementById("color").innerHTML;
var bordersize = document.getElementById("bordersize").innerHTML;
var bordercolor = document.getElementById("bordercolor").innerHTML;
var opacity = document.getElementById("opacity").innerHTML;

rect.innerHTML = uname.trim();
rect.style.width = width.trim() + "px";
rect.style.height = height.trim() + "px";
rect.style.backgroundColor = color.trim();
rect.style.border = "solid " + bordersize.trim() + "px " + bordercolor.trim();
rect.style.opacity = opacity.trim();
if(color.trim() == "White"){
    rect.style.color = "black";
}