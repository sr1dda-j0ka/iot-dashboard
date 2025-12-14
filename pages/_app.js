import Navbar from "@/components/Navbar";
import Head from "next/head"
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {

  return(
    <>
    <Head>
        <title>SensorTrack – IoT Monitoring Dashboard</title>
        <meta name="description" content="Real-time IoT sensor monitoring with AI insights" />
      </Head>
    <Navbar/>
    <Component {...pageProps}/>;
    </>
  )  
}
