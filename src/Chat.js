import React, { useEffect, useState } from "react";

function Chat({ socket, username, room }) {
  const [message, set_message] = useState("");
  const [messages, set_messages] = useState([]);
  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        sender: username,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      set_message('')
      set_messages((messages) => [...messages, messageData]);
      await socket.emit("send_message", messageData);
    }
  };

  useEffect(() => {
    socket.off("recieve_message").on("recieve_message", (data) => {
      console.log("recieved message", data);
      set_messages((messages) => [...messages, data]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div>
      Chat, {username}, {room}
      <div>
        {messages.map((data, index) => (
          <div
            key={index}
            style={{
              marginBottom: "3px",
              display: "flex",
              justifyContent: `${data.sender === username ? "end" : "start"}`,
            }}
          >
           <div> 
           <div style={{ backgroundColor: `${data.sender === username ? "green" : "blue"}`,}} > {data.message} </div>
            <div>{data.time} </div>
            <div> {data.sender} </div>
             </div>
          </div>
        ))}
        <input
          value={message}
          onChange={(event) => set_message(event.target.value)}
          type="text"
          placeholder="type message"
        />
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
}

export default Chat;
