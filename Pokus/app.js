function sayHello(event) {
    console.log(event);
}

document.getElementById("button-finish").addEventListener("click", sayHello);
document.getElementById("button-previous").addEventListener("click", sayHello);
document.getElementById("button-next").addEventListener("click", sayHello);