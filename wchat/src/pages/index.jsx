import { useRouter } from 'next/router'
import {useState } from 'react'
import Toast from './../components/Toast';


export default function Home() {
  const router = useRouter();

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
