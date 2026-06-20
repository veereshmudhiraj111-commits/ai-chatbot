async function sendMessage() {
    const inputElement = document.getElementById("user-input");
    const input = inputElement.value.trim();
    if (!input) return;

    const chatbox = document.getElementById("chat-box"); 

    // 1. Append user's message immediately
    const userMsg = document.createElement("p");
    userMsg.classList.add("user");
    userMsg.innerHTML = `<b>You:</b> ${input}`;
    chatbox.appendChild(userMsg); 

    // 2. Clear input immediately
    inputElement.value = "";

    // 3. Show typing indicator
    const typing = document.createElement("p");
    typing.textContent = "Bot is typing...";
    typing.classList.add("bot");
    chatbox.appendChild(typing);

    // 4. Scroll to bottom
    chatbox.scrollTop = chatbox.scrollHeight;

    try {
        // 5. Send API request (dynamically resolve host and path based on environment)
        const host = window.location.protocol === "file:" ? "http://localhost:5000" : "";
        const apiPath = window.location.protocol === "file:" ? "/chat" : "/api/chat";
        const response = await fetch(`${host}${apiPath}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({ message: input })
        });

        if (!response.ok) {
            throw new Error("Failed to fetch response from server");
        }

        const data = await response.json(); 

        // 6. Remove typing indicator
        chatbox.removeChild(typing);

        // 7. Append bot's message
        const aiMsg = document.createElement("p");
        aiMsg.classList.add("bot");
        aiMsg.innerHTML = `<b>Bot:</b><br>${marked.parse(data.reply)}`;
        chatbox.appendChild(aiMsg); 

    } catch (error) {
        // Handle error and remove typing indicator
        if (chatbox.contains(typing)) {
            chatbox.removeChild(typing);
        }
        const errorMsg = document.createElement("p");
        errorMsg.classList.add("bot");
        errorMsg.style.color = "red";
        errorMsg.innerHTML = `<b>System:</b> Error communicating with the AI.`;
        chatbox.appendChild(errorMsg);
        console.error(error);
    }

    // 8. Scroll to bottom
    chatbox.scrollTop = chatbox.scrollHeight;
}