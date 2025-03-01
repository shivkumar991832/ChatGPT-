
let chatContainer = document.querySelector('.chat-container');
let prompt = document.querySelector('#prompt');
let btn = document.querySelector('#btn');
let container = document.querySelector(".container")
// creating a variable
let userMessage = null;



// let api_url ='https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB0b66DjPBpsOqPy1KDMYsuZCqaZ1yHIzY';
// apikey = sk-f9310b1ef25e4b239c9b98bfc1c2e2c2




// creating dynamically elm
createChatBox = (html, className)=>{
    let div = document.createElement('div')
    div.classList.add(className);
    div.innerHTML = html;
    return div;
    
  }

  //creating async function for consuming promise
getApiResponse = async(aiChatBox)=>{
 let paraText = aiChatBox.querySelector('.text')
 

 try {
   // making POST request
  let response = await fetch(api_url, {
    method : "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      contents : [
        {"role" : "user",
        "parts":[{"text": userMessage}]}]
    })
  })

  let data = await response.json();
  // storing our all answer within a variable &applying ternary operator
  let apiResponse = data?.candidates[0].content.parts[0].text;
  // console.log(apiResponse)
  paraText.innerHTML = apiResponse;
  
 } catch (error) {
  console.log(error)
 }
 finally{
  // whether the request accept or reject "finally" block always run:
  aiChatBox.querySelector('.loading').style.display = "none";
 }
}

showLoading = ()=>{
  let aiHtml = `<div class="img">
                <img src="./chatbot-4736275_1920.png" alt="loading" width="50px">
            </div>
            <p class="text"></p>
            <img class="loading"  src="./load-33_256.gif" alt="">
        </div>`
        let aiChatBox = createChatBox(aiHtml, "ai-chat-box"); 
        // console.log(aiChatBox)
        chatContainer.appendChild(aiChatBox);
        getApiResponse(aiChatBox)
     
        
}


btn.addEventListener('click', ()=>{
   userMessage = prompt.value
   if(!userMessage){
     return;
   }

  //  container.style.display = "none"
  if(userMessage == ""){
    container.style.display = "block"
  }else{
    container.style.display = "none"
  }

   let html = `<div class="img">
                <img src="./avatar-3637425_1920.png" alt="loading" width="50px">
            </div>
            <p class="text"></p>`;
     
     let userChatBox = createChatBox(html, "user-chat-box"); 
    //  console.log(userChatBox)
     userChatBox.querySelector('.text').innerText = userMessage 
    //  para.innerText = userChatBox
    //  chatContainer.appendChild(userChatBox)
    //  console.log(chatContainer)
     chatContainer.appendChild(userChatBox);
     prompt.value = "";

    //  after user input must show ai response
    
    setTimeout(showLoading, 500);

     
    
})




