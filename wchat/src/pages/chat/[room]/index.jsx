import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { BiUser } from "react-icons/bi";
import {AiOutlineSend} from "react-icons/ai"
import { socket } from "../../../socket/socket"
import Loading from "../../../components/Loading";

const index = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const ref = useRef();
  const ref2 = useRef();
  const router = useRouter();

  useEffect(() => {

      if (!sessionStorage.getItem("username")) {
        router.push("/room");
        return;
      }

      let data = sessionStorage.getItem("username");
      let data1 = sessionStorage.getItem("room");

      setUsername((d) => data);
      setRoom((s) => data1);  

      window.onpopstate = ()=>{
        socket.close();
      }


      //connect to server
      if(socket.connected) {
        socket.disconnect();
        router.push('/room');
      }
      else{
        socket.connect();
        socket.emit('joinRoom',{username:data,room:data1});
      }
      
      //users online
      socket.on("users-all", (data) => {
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
      });

      //if new user joined
      socket.on("user-joined", (data) => {
        let data1 = { class: "left", username: "user joined ", message: data };
        setMessages((messages) => {
          return [...messages, data1];
        });
      });

  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit("message", { message, username, room });
      let data1 = { class: "right", username, message };
      setMessages((messages) => {
        return [...messages, data1];
      });
      setMessage("");
      ref.current ? ref.current.scrollTop = ref.current.scrollHeight : null
      ref2.current ? ref2.current.focus() : null;
    }
  };
  return (
    <>
    {
      users.length < 1 ? <Loading/> :
      <div className="container">
      <div className="chat-box">
        <div className="users-list">
          <span className="static">Users Online :</span>
          {users
            ? users.map((user, i) => {
                return (
                    <p className="user" key={i}>
                    {user}
                    </p>
                  
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
            placeholder='type...'
            value={message}
          />
            <AiOutlineSend  onClick={sendMessage} className="button" size={25}/>
        </div>
      </div>
    </div>
    }
    
    </>
    
  );
};

export default index;
