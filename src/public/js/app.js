// connect back-end from front-end
// socket of app.js represents a connection to the server
const socket = new WebSocket(`ws://${window.location.host}`);