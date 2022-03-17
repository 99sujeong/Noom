// connect socket.io with FE
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    // "emit" : send any event we make
    // { } : send javascript object (don't have to send only string)
    socket.emit("enter_room", { payload: input.value }, () => {
        console.log("server is done!");
    });
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);