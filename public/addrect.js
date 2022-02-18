document.getElementById("add-button").addEventListener("click", validate);

function validate(event) {
    var uname = document.getElementById("name").value;
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;
    var bordersize = document.getElementById("bordersize").value;

    if(uname == "" || width == "" || height == "" || bordersize == ""){
        alert("Warning: Missing Required Fields");
        event.preventDefault();
    }
}