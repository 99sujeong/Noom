const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
// connect back-end from front-end
// socket of app.js represents a connection to the server
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("Connected to Server ");
});

socket.addEventListener("message", (message) => {
    console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ");
});

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    // sending something from a form in FE to BE
    socket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);