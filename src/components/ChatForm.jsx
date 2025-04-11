import React, { useRef, useState } from 'react'

const ChatForm = ({ setChatHistory, generateBotResponse, isPending }) => {
    const inputRef = useRef();
    const [thinking, setThinking] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = "";

        // Upadate chat history with the user's message 
        setChatHistory(history => [...history, { role: "user", text: userMessage }]);
        setThinking(true);

        await generateBotResponse(userMessage);
        setThinking(false)
    };

    return (
        <div className='form-section'>

            <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
                <input ref={inputRef} type="text" placeholder={thinking ? "Thinking ..." : "Message"} className="message-input" required disabled={isPending} />
                <button className="material-symbols-rounded" type='submit' disabled={isPending}>
                    arrow_upward
                </button>
            </form>
        </div>
    )
}

export default ChatForm
