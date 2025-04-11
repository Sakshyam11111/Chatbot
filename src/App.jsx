import React, { useState } from 'react';
import Chatboticon from './components/Chatboticon';
import ChatForm from './components/ChatForm';
import ChatMessage from './components/ChatMessage';

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState([false]);
  const [isPending, setIsPending] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;


  const generateBotResponse = async (userRequestText) => {

    const requestData = {
      contents: [{
        parts: [{ text: userRequestText }]
      }]
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    };

    setIsPending(true)
    const response = await fetch(url, requestOptions)

    const result = await response.json();

    setChatHistory((chatHistory) => [...chatHistory, {
      role: "model",
      text: result.candidates[0].content.parts[0].text
    }])
    setIsPending(false)
  }


  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={() => setShowChatbot(prev => !prev)}
        id='chatbot-toggler'>
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>
      <div className="chatbot-popup">
        {/* Chatbot Header  */}
        <div className="chat-header">
          <div className="header-info">
            <Chatboticon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot(prev => !prev)}
            className="material-symbols-rounded">
            keyboard_arrow_down
          </button>
        </div>

        {/* Chatbot Body  */}
        <div className="chat-body">
          <div className='message bot-message'>
            <Chatboticon />
            <p className='message-text'>
              Hey there 👋 <br /> How can I help you today?
            </p>
          </div>

          {/* Render the chat history dynamically  */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chatbot Footer  */}
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} isPending={isPending} />
        </div>
      </div>
    </div>
  );
}

export default App;