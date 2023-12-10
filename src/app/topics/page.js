'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
const page = () => {
    const [topicsArray, setTopicsArray] = useState([])
    useEffect(() => {
        getTopics()
    }, [])

    async function getTopics() {
        const res = await fetch('/api/getAllTopics', {

            headers: {
                'Content-Type': 'application/json',
            }

        })
        const data = await res.json();


        setTopicsArray(data)
    }

    return (
        <div>

            <h1>Topics</h1>
            <div style={{ display: 'flex', flexDirection: 'row', }}>
                {topicsArray.map((topic) => {
                    return (
                        <Link style={{ cursor: 'pointer', border: '2px solid black', borderRadius: '55px', width: '100%', margin: '5%', padding: '2%' }} href={`/topic/${topic.id}`}>

                            <h3>{topic.data.name}</h3>
                            <p>{topic.data.description}</p>

                        </Link>
                    )
                })}
            </div>

        </div>
    )
}

export default page