'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ReactPlayer from 'react-player'

const page = ({
  params }) => {
  const router = useRouter()
  useEffect(() => {
    init()

  }, [])

  const [topic, setTopic] = useState(null)

  async function init() {
    const res2 = await fetch('/api/getTopic', {
      method: 'POST',
      body: JSON.stringify({ name: params.topic }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await res2.json();
    setTopic(data)
    console.log('data is', data)

  }




  return (
    <div>
      <h2>{topic != null && topic.name}</h2>
      {topic != null && topic.videos &&


        topic.videos.map((item) => {
          return (
            <ReactPlayer controls url={item} />
          )
        })

      }




    </div>
  )
}

export default page