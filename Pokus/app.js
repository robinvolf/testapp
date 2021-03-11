function sayHello() {
    window.alert("Hello!");
}

document.getElementById("button-finish").addEventListener("click", sayHello);
document.getElementById("button-previous").addEventListener("click", sayHello);
document.getElementById("button-next").addEventListener("click", sayHello);