const socket = io();

let username;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

do {
    username = prompt('Please Enter Your Name');
} while (!username);

    // <-------Send Message if user press Enter Key--------->

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
    let msg = {
        user: username,
        message: message.trim() // remove extra spaces
    }

    // <-------Append Message DIV --------->

    appendMessage(msg, 'outgoing')
    textarea.value = '';
    scrollToBottom();

    // <-------Send Message to Server--------->

    socket.emit('message', msg);


}

// <-------Create Message DIV using javaScript --------->

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

// <-------Recieve Message from Server--------->

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom();
});

// <-------Scroll Message--------->

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}