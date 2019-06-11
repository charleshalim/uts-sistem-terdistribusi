var websocket = new WebSocket("ws://" + location.hostname + ":" + location.port + "/chat/")
/*var game = new WebSocket("ws://" + location.hostname + ":" + location.port + "/game/")
game.onmessage = function(msg) {
    var data = JSON.parse(msg.data)
    alert("Joined as player " + data.player)
}*/
websocket.onmessage = function (msg) { updateChat(msg) }
websocket.onclose = function () { alert("Websocket connection closed") }

id("send").addEventListener("click", function() {
    sendMessage(id("message").value)
})

id("message").addEventListener("keypress", function(e) {
    if (e.keyCode == 13) { sendMessage(e.target.value) }
})

function sendMessage(message) {
 //   if (message !== "") {
        //websocket.send(message)
        websocket.send(JSON.stringify({nama: "budi", pesan: message}))
        id("message").value = ""
//    }
}

function updateChat(msg) {
    var data = JSON.parse(msg.data)
    insert("chat", data.userMessage)
    id("userList").innerHTML = ""
    data.userList.forEach(function (user) {
        insert("userList", "<li>" + user + "</li>")
    })
}

function insert(targetId, message) {
    b = document.createElement("b")
    b.innerHTML = message.from + " says:"
    p = document.createElement("p")
    p.innerHTML = message.message
    span = document.createElement("span")
    span.setAttribute("class", "timestamp")
    span.innerHTML = message.timestamp
    article = document.createElement("article")
    article.appendChild(b)
    article.appendChild(p)
    article.appendChild(span)
    id(targetId).insertAdjacentElement("afterbegin", article)
    //id(targetId).insertAdjacentHTML("afterbegin", message)
}

function id(id) {
    return document.getElementById(id)
}