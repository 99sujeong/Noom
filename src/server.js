import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

//console.log("hello");

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log('Listening on http://localhost:3000');

//  create a ws server on top of the http server. 
// -> localhost can process both http and ws requests on the same port
// == our server supports http protocol connections or ws protocol connection
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSocketClose() {
    console.log("Disconnected from the Browser ");
}

const sockets = [];

// WebSocket is the connection between server and browser
// socket of server.js represents the browser that just connected 
// this socket is communication with front-end in real time
wss.on("connection", (socket) => {
    sockets.push(socket);
    console.log("Connected to Browser ");
    socket.on("close", onSocketClose);
    socket.on("message", (message) => {
        // socket send back the msg to the user ==> it's a chat each other
        sockets.forEach((aSocket) => aSocket.send(message.toString()));
    });
});

server.listen(3000, handleListen);