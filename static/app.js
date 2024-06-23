class Chatbox {
    constructor() {
        this.args = {
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {chatBox, sendButton} = this.args;
        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

         fetch('http://0.0.0.0:10000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "Medbot", message: r.answer };
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          },);
        
    }

   updateChatText(chatbox) {
       var html = '';
       this.messages.slice().reverse().forEach(function(item, index) {
           if (item.name === "Medbot") {
               const currentTime = formatDate(new Date());
               html += `<div class="messages__item messages__item--visitor">
                           <div class="time"><p>${currentTime}</p></div>
                           ${item.message}
                        </div>`;
           } else {
               html += `<div class="messages__item messages__item--operator">
               ${item.message} 
                        </div>`;
           }
       });
   
       const chatmessage = chatbox.querySelector('.chatbox__messages');
       chatmessage.innerHTML = html;
   }
}


function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
}

var _typingIndicator = document.querySelector('.typing'),
    _input = document.querySelector('#message-input'),
    idleTime = 400,
    idleTimer = null,
    inputValue,
    indicatorState = {
        active : 'is-typing-active',
        init : 'is-typing-init'
    };

function showIndicator(){
    _typingIndicator.classList.add(indicatorState.init);
}

function activateIndicator(el){
    _typingIndicator.classList.add(indicatorState.active);
    inputValue = el.value;
    detectIdle(el);
}

function removeIndicator(){
    _typingIndicator.classList.remove(indicatorState.init, indicatorState.active);
}

function detectIdle(el){
    if (idleTimer) {
        clearInterval(idleTimer);
    }
    
    idleTimer = setTimeout(function(){
        if (getInputCurrentValue(el) === inputValue) {
            _typingIndicator.classList.remove(indicatorState.active);
        }
    }, idleTime);
}

function getInputCurrentValue(el){
    var currentValue = el.value;
    return currentValue;
}

function initTypingIndicator() {
    _input.onfocus = function(){
        showIndicator();
    };

    _input.onkeyup = function() {
        activateIndicator(this);
    };

    _input.onblur = function(){
        removeIndicator();
    };
}

initTypingIndicator();

const chatbox = new Chatbox();
chatbox.display();



