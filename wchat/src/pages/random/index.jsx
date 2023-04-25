import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { BiUser } from "react-icons/bi";
import {AiOutlineSend} from "react-icons/ai"
import { socket } from "../../socket/socket"

const index = () => {
  const [random,setRandom] = useState('');
  const [room,setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState(8);
  const [connected,setConnected] = useState(false);
  const [disabledd,setDisabledd] = useState(false);
  const [status,setStatus] = useState('');
  const ref = useRef();
  const ref2 = useRef();
  const router = useRouter();

  useEffect(() => {

      if (!sessionStorage.getItem("random")) {
        router.push("/");
        return;
      }

      let ran = sessionStorage.getItem("random");
      setRandom(ran);

      //connect to server
      if(!connected){
        socket.emit('connect-ran','data');
        setConnected(true);
      }
      
      //users online
      socket.on("online", (data) => {
        setUsers(data);
      });

      //status
      socket.on('status',(data)=>{
        console.log(data);
        setStatus(()=> data.msg);
        sessionStorage.setItem('room',data.room);
        setRoom(()=>data.room);
      });

      //new message
      socket.on("random-receive", (data) => {
        console.log(data);
        let data1 = {
          class: "left",
          username: "stranger",
          message: data,
        };
        setMessages((messages) => {
          return [...messages, data1];
        });
        ref.current ? ref.current.scrollTop = ref.current.scrollHeight : null
      });

  }, []);


  const sendMessage = () => {
    if (message) {
      socket.emit("random-msg", {msg:message,room:room});
      let data1 = { class: "right", username : "you", message };
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
          <span className="static">Users Online : {users}</span>
          <span className="static"><b>{status}</b></span> 
                    
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
        <button className="next-btn" onClick={()=> router.reload()}>Next</button>     
          <input
            type="text"
            ref={ref2}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            {...disabledd ? disabled : null }
          />
            <AiOutlineSend  onClick={sendMessage} className="button" size={25}/>
        </div>
      </div>
    </div>
  );
};

export default index;
