import React, { useState } from 'react'

const ChatFooter = ({ socket }) => {
    const [message, setMessage] = useState("")

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (message.trim() && localStorage.getItem("userName")) {
            socket.emit("message",
                {
                    text: message,
                    name: localStorage.getItem("userName"),
                    id: `${socket.id}${Math.random()}`,
                    socketID: socket.id
                }
            )
        }
        setMessage("")
        socket.emit("typing", "Nothing ")
    }

    const typeMessage = (e) => {
        console.log(e.target.value)
        if (e.target.value.length) {
            socket.emit("typing", `${localStorage.getItem("userName")} is typing`)
        } else {
            socket.emit("typing", " ")
        }
        setMessage(e.target.value)
    }

    return (
        <div className='chat__footer'>
            <form className='form' onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder='Write message'
                    className='message'
                    value={message}
                    onChange={e => typeMessage(e)}
                />
                <button className="sendBtn">SEND</button>
            </form>
        </div>
    )
}

export default ChatFooter