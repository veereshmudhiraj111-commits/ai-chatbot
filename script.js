async function sendMessage(){
    let input = document.getElementById("user-input").value;
    let chatbox = document.getElementById("chat-box"); 


    let typing = document.createElement("p");
    typing.textContent = "Bot is typing...";
    typing.classList.add("bot");
    chatbox.appendChild(typing);

    chatbox.scrollTop = chatbox.scrollHeight;

    let response = await fetch("http://localhost:5000/chat",{
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify({message: input})
    });

    let data = await response.json(); 

    setTimeout(()=>{
        chatbox.removeChild(typing);

 
    let userMsg = document.createElement("p");
    userMsg.classList.add("user");
    userMsg.innerHTML = `<b>You:</b> ${input}`;
    chatbox.appendChild(userMsg); 

    let aiMsg = document.createElement("p");
    aiMsg.classList.add("bot");
    aiMsg.innerHTML = `<b>Bot:</b><br>${marked.parse(data.reply)}`;
    chatbox.appendChild(aiMsg); 


    

    document.getElementById("user-input").value ="";

        
    }, 1000);

    
}