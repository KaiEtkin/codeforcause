import Head from "next/head"
import Link from "next/link"
import Books from "@components/components/Books"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

export default function Home() {


  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflowX: 'hidden'}}>

      <img src="/newLogo.png" width='20%'></img>
      <div style={{ width: '100vw', borderRadius: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1CD2A6' }}>

        <FontAwesomeIcon style={{ marginTop: '2%', width: '5%', color: 'white' }} icon={faYoutube} />

        <Link style={{margin: '3%', width: '38%'}} href="/topics"><button style={{ borderRadius: '45px', width: '100%', backgroundColor: '#94F6DE', color: 'black'}} >Learn Topics</button></Link>
        <FontAwesomeIcon style={{ width: '5%', color: 'white' }} icon={faBookOpen} />
        <Books />
      </div>
    </div>
  )
}
