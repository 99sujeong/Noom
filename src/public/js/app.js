// connect back-end from front-end
// socket of app.js represents a connection to the server
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("Connected to Server ");
});

socket.addEventListener("message", (message) => {
    console.log("Just got this: ", message.data, "from the Server");
});

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ");
});