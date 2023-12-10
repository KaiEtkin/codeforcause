import Head from "next/head"
import Link from "next/link"
import Books from "@components/components/Books"

export default function Home() {
  
  
  return (
    <div>

      <h1>Page</h1>
      <Link href="/topics"><button>Learn topics</button></Link>
      
      <Books />
      
    </div>
  )
}
