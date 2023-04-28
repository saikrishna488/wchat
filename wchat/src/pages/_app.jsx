import Head from 'next/head'
import Script from 'next/script'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>wChat</title>
         <link rel="shortcut icon" href='global.png' />     
      </Head>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4956894271613471"
     crossorigin="anonymous"></Script>
    <Component {...pageProps} />
    </>
    
  )
  
}
