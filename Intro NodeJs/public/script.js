const textInput = document .getElementById("text");
const buttonInput = document.getElementById("button");

function sendMessage() {
    xmlhttp = new XMLHttpRequest();

    xmlhttp.open("POST", "localhost:3000/sendMessage", true);

    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(JSON.stringify({
        message: textInput.value
    }));
    
}