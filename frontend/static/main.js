// Updated function to get bot response from backend
async function generateBotResponse(userMessage) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userQuery: userMessage }),
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorText => {
                    console.error('Error response:', response.status, errorText);
                    reject(new Error(`Network response was not ok: ${response.status} ${errorText}`));
                });
            }
            return response.json();
        })
        .then(data => {
            if (!data.answer) {
                reject(new Error('Response data does not contain an answer'));
            } else {
                resolve(data.answer);
            }
        })
        .catch(error => {
            console.error('Error fetching bot response:', error);
            reject(`Sorry, something went wrong. ${error.message}`);
        });
    });
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {
    const msgInput = document.getElementById('msg_input');
    const sendButton = document.getElementById('send_button');
    const messagesList = document.querySelector('.messages');


    sendButton.addEventListener('click', async () => {
        const userMessage = msgInput.value.trim();
        if (userMessage) {
            // Add user message to chat
            appendMessage(userMessage, 'user_message');
            msgInput.value = '';
            try {
                const response = await axios.post(
                  'http://localhost:8000/api/chat',
                  {
                    pluginIds: [userMessage],
                    externalUserId: externalUserId
                  },
                  {
                    headers: {
                      apikey: apiKey
                    }
                  }
                );
                return response.data; // Extract session ID
              } catch (error) {
                console.error('Error creating chat session:', error);
              }

            // Get bot response from backend
            try {
                const botResponse = await generateBotResponse(userMessage);
                console.log(botResponse.data.answer);
                // Add bot response to chat
                appendMessage(botResponse.data.answer, 'bot_message');
            } catch (error) {
                console.error('Error fetching bot response:', error);
                appendMessage('Sorry, something went wrong. Please try again.', 'bot_message');
            }
        }
    });

    // Function to append messages to the chat window
    function appendMessage(message, type) {
        const messageElement = document.createElement('li');
        messageElement.className = type;
        messageElement.textContent = message;
        messagesList.appendChild(messageElement);
        messagesList.scrollTop = messagesList.scrollHeight; // Auto-scroll to the bottom
    }

    // Function to get the current timestamp
    function getCurrentTimestamp() {
        return new Date();
    }

    // Function to render a message on the chat screen
    function renderMessageToScreen(args) {
        let displayDate = (args.time || getCurrentTimestamp()).toLocaleString('en-IN', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });
        let messagesContainer = document.querySelector('.messages');

        let message = `
            <li class="message ${args.message_side}">
                <div class="avatar"></div>
                <div class="text_wrapper">
                    <div class="text">${args.text}</div>
                    <div class="timestamp">${displayDate}</div>
                </div>
            </li>
        `;

        messagesContainer.innerHTML += message;

        setTimeout(function () {
            messagesContainer.lastElementChild.classList.add('appeared');
        }, 0);
        messagesContainer.scrollTo({ top: messagesContainer.scrollHeight, behavior: 'smooth' });
    }

    // Event listener for Enter key
    msgInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendButton.click();
        }
    });

    // Show initial bot message
    window.addEventListener('load', function () {
        showBotMessage('Hello there! Type in a message.');
    });

    // Show user message
    function showUserMessage(message, datetime) {
        renderMessageToScreen({
            text: message,
            time: datetime,
            message_side: 'right',
        });
    }

    // Show bot message
    function showBotMessage(message, datetime) {
        renderMessageToScreen({
            text: message,
            time: datetime,
            message_side: 'left',
        });
    }
});
