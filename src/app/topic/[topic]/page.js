'use client'

import React, {useEffect} from 'react'
import { useRouter } from 'next/navigation'

const page = ({
    params}) => {
    const router = useRouter()
    useEffect(() => {
        
    }, [])
    async function init(){
        const res2 = await fetch('/api/getTopic', {
            method: 'POST',
            body: JSON.stringify({ name: params.topic }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
  return (
    <div>{params.topic}</div>
  )
}

export default page