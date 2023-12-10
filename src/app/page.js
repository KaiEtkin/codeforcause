import Head from "next/head"
import Link from "next/link"
import Books from "@components/components/Books"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

export default function Home() {


  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

      <div style={{ backgroundColor: '#1CD2A6' }}>
        <img src="/newLogo.png" width='20%'></img>
        <FontAwesomeIcon style={{ width: '5%', color: 'black' }} icon={faYoutube} />

        <Link href="/topics"><button>Learn Topics</button></Link>
        <FontAwesomeIcon style={{ width: '5%', color: 'black' }} icon={faBookOpen} />
        <Books />
      </div>
      </div>
      )
}
