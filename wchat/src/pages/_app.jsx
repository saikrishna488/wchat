import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>wChat</title>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4956894271613471"
     crossorigin="anonymous"></script>
      </Head>
    <Component {...pageProps} />
    </>
    
  )
  
}
