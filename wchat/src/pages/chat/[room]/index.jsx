import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { BiUser } from "react-icons/bi";
import {AiOutlineSend} from "react-icons/ai"
import { socket } from "../../../socket/socket"

const index = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [connected,setConnected] = useState(false)
  const ref = useRef();
  const ref2 = useRef();
  const router = useRouter();

  useEffect(() => {

      if (!sessionStorage.getItem("username")) {
        router.push("/");
        return;
      }

      let data = sessionStorage.getItem("username");
      let data1 = sessionStorage.getItem("room");

      setUsername((d) => data);
      setRoom((s) => data1);
      
      if (sessionStorage.getItem("messages")) {
        setMessages(JSON.parse(sessionStorage.getItem("messages")));
      }

      //connect to server
      if(!room){
        socket.emit('joinRoom',{username:data,room:data1});
        setConnected(true);
      }
      

      //users online
      socket.on("users-all", (data) => {
        console.log(data)
        let arr = []
        data.map((user)=>{
          arr = [...arr,user.username];
        });
        // setUsers(()=>{
        //   return [arr]
        // })
        setUsers(arr)
      });

      //user-left
      socket.on("users-left", (data) => {
        console.log(data)
        let arr = []
        data.map((user)=>{
          arr = [...arr,user.username];
        });
        // setUsers(()=>{
        //   return [arr]
        // })
        setUsers(arr)
      });

      //new message
      socket.on("new-message", (data) => {
        let data1 = {
          class: "left",
          username: data.username,
          message: data.message,
        };
        setMessages((messages) => {
          return [...messages, data1];
        });
        ref.current ? ref.current.scrollTop = ref.current.scrollHeight : null
        sessionStorage.setItem("messages", JSON.stringify(messages));
      });

      //if new user joined
      socket.on("user-joined", (data) => {
        let data1 = { class: "left", username: "user joined ", message: data };
        setMessages((messages) => {
          return [...messages, data1];
        });
        sessionStorage.setItem("messages", JSON.stringify(messages));
      });

  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit("message", { message, username, room });
      let data1 = { class: "right", username, message };
      setMessages((messages) => {
        return [...messages, data1];
      });
      sessionStorage.setItem("messages", JSON.stringify(messages));
      setMessage("");
      ref.current ? ref.current.scrollTop = ref.current.scrollHeight : null
      ref2.current ? ref2.current.focus() : null;
    }
  };
  return (
    <div className="container">
      <div className="chat-box">
        <div className="users-list">
          <h5>Users Online :</h5>
          {users
            ? users.map((user, i) => {
                return (
                  <h5 className="user" key={i}>
                    {user}
                  </h5>
                );
              })
            : null}
        </div>
        <div ref={ref} className="msg-box">
          {messages
            ? messages.map((msg, i) => {
                return (
                    <div className={msg.class} key={i}>
                      <div>
                      {<BiUser />} <span><b>{msg.class == 'right' ? 'you': msg.username }</b></span>
                      </div>
                    <p className="msg-text">
                      {msg.message}
                    </p>
                  </div>
                  
                );
              })
            : null}
        </div>
        <div className="input-box">
          <input
            type="text"
            ref={ref2}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
            <AiOutlineSend  onClick={sendMessage} className="button" size={25}/>
        </div>
      </div>
    </div>
  );
};

export default index;
