/**
 * Returns the current datetime for the message creation.
 */
function getCurrentTimestamp() {
    return new Date();
}

/**
 * Renders a message on the chat screen based on the given arguments.
 * This is called from the `showUserMessage` and `showBotMessage`.
 */
function renderMessageToScreen(args) {
    // local variables
    let displayDate = (args.time || getCurrentTimestamp()).toLocaleString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
    let messagesContainer = $('.messages');

    // init element
    let message = $(`
    <li class="message ${args.message_side}">
        <div class="avatar"></div>
        <div class="text_wrapper">
            <div class="text">${args.text}</div>
            <div class="timestamp">${displayDate}</div>
        </div>
    </li>
    `);

    // add to parent
    messagesContainer.append(message);

    // animations
    setTimeout(function () {
        message.addClass('appeared');
    }, 0);
    messagesContainer.animate({ scrollTop: messagesContainer.prop('scrollHeight') }, 300);
}

/* Sends a message when the 'Enter' key is pressed. */
$(document).ready(function() {
    $('#msg_input').keydown(function(e) {
        // Check for 'Enter' key
        if (e.key === 'Enter') {
            // Prevent default behaviour of enter key
            e.preventDefault();
            // Trigger send button click event
            $('#send_button').click();
        }
    });
});

/**
 * Displays the user message on the chat screen. This is the right side message.
 */
function showUserMessage(message, datetime) {
    renderMessageToScreen({
        text: message,
        time: datetime,
        message_side: 'right',
    });
}

/**
 * Generates a conversational response from the chatbot.
 */
function generateBotResponse(userMessage) {
    const responses = [
        "That's interesting! Could you tell me more?",
        "I see. Let me think about that for a moment.",
        "Good question! Here's what I know.",
        "Hmm, let me gather some information on that.",
        "Great point! Here's a detailed response."
    ];

    return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Displays the chatbot message on the chat screen. This is the left side message.
 */
function showBotMessage(message, datetime) {
    renderMessageToScreen({
        text: message,
        time: datetime,
        message_side: 'left',
    });
}

/**
 * Get input from user and show it on screen on button click.
 */
$('#send_button').on('click', function (e) {
    // get and show message and reset input
    const userInput = $('#msg_input').val();

    console.log("HEllo", userInput);
    
    showUserMessage(userInput);

    // show bot message with a delay to mimic thinking time
    setTimeout(function () {
        showBotMessage(generateBotResponse(userInput));
    }, 1000);
});

/**
 * Returns a random string. Just to specify bot message to the user.
 */
function randomstring(length = 20) {
    let output = '';

    // magic function
    var randomchar = function () {
        var n = Math.floor(Math.random() * 62);
        if (n < 10) return n;
        if (n < 36) return String.fromCharCode(n + 55);
        return String.fromCharCode(n + 61);
    };

    while (output.length < length) output += randomchar();
    return output;
}

/**
 * Set initial bot message to the screen for the user.
 */
$(window).on('load', function () {
    showBotMessage('Hello there! Type in a message.');
});
