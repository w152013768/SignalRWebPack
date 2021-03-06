"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./css/main.css");
var SignalR = require("@aspnet/signalr");
var divMessages = document.querySelector("#divMessages");
var tbMessage = document.querySelector("#tbMessage");
var btnSend = document.querySelector("#btnSend");
var username = new Date().getTime();
var connection = new SignalR.HubConnectionBuilder().withUrl("/hub").build();
connection.start().catch(function (err) { return document.write(err); });
connection.on("messageReceived", function (username, message) {
    var messageContainer = document.createElement("div");
    messageContainer.innerHTML = "<div class=\"message-author\">" + username + "</div><div>haha" + message + "</div>";
    divMessages.appendChild(messageContainer);
    divMessages.scrollTop = divMessages.scrollHeight;
});
tbMessage.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        send();
    }
});
btnSend.addEventListener("click", send);
function send() {
    connection.send("newMessage", username, tbMessage.value).then(function () { return tbMessage.value = ""; });
}
