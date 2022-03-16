const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
// connect back-end from front-end
// socket of app.js represents a connection to the server
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
    // make javascript obj(not text), before sending string
    const msg = { type, payload };
    // that obj creates string (stringify : javascript obj -> string)
    return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
    console.log("Connected to Server ");
});

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ");
});

// this msg is being sent when i want to send a msg to the chat
function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    // every time that we send a message to our BE, we are sending a "string"
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

// this msg is being sent to the backend when i want to change my nickname
function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    // every time that we send a message to our BE, we are sending a "string"
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);