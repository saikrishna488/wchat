import { useRouter } from 'next/router'
import {useEffect, useState } from 'react'
import { socket } from '../socket/socket';


export default function Home() {
  const router = useRouter();


  useEffect(()=>{
    socket.disconnect();
  },[])

  const submit = ()=>{
    sessionStorage.setItem('random','random');
    router.push('/random');
  }
    
  return (
    <div className='container'>
      <div className="box">
        <h1>wChat</h1>
        <button className='btn-main' onClick={()=> router.push('/room')}>Join / Create Room</button>
        <button className='btn-main' onClick={submit}>Talk To Stranger</button>
      </div>
    </div>
  )
}
