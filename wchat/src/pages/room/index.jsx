import { useRouter } from 'next/router'
import {useEffect, useState } from 'react'
import Toast from '../../components/Toast';
import {socket} from '../../socket/socket'

export default function Home() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('');
  const [visible, setVisible] = useState(true);
  const [text,setText] = useState('');
  const router = useRouter();

  useEffect(()=>{
    socket.disconnect();
  })
  const submit = ()=>{
    if(username.length < 3){
      setVisible(true);
      setText('username must be atleast of 3 characters');
      setTimeout(()=>{
        setVisible(false);
      },2000)
    }
    else if(username.length >12){
      setVisible(true);
      setText('username cannot be more than 12 characters');
      setTimeout(()=>{
        setVisible(false);
      },2000)
    }
    else{
      let roomNum = parseInt(room)
      let roomStr = roomNum.toString();
      if(roomStr.length < 5){
        setVisible(true);
        setText('room must be atleast of 5 digit number');
        setTimeout(()=>{
          setVisible(false);
        },2000)
      }
      else{
        sessionStorage.setItem('username',username)
        sessionStorage.setItem('room',room)
        setUsername('');
        setRoom('');
        router.push(`/chat/${room}`)
      }
      
    }
    
  }
  return (
    <div className='container'>
      {
        visible ? (
          <Toast msg={text}/>
        ) : null
      }
      
      <div className="box">
        <h1>wChat</h1>
        <input type="text" placeholder='username' maxLength={12} onChange={e => setUsername(e.target.value)} value={username}/>
        <input type="text" placeholder='room code' maxLength={5} onChange={e => {
          if(e.target.value.length>5){

          }
          setRoom(e.target.value)
          }} value={room}/>
        <button id='btn' onClick={submit}>Enter</button>
      </div>
    </div>
  )
}
