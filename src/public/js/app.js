// connect socket.io with FE
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

// this fn on the frontend was initiated from backend
function backendDone(msg) {
    console.log(`The backend says: `, msg);
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, backendDone);
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);