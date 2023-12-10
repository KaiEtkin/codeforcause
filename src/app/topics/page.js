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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                <h1>Topics</h1>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                
            {topicsArray.map((topic) => {
                return (
                    <Link
                        style={{
                            background: 'linear-gradient(to right, #1CD2A6, #1CD2A6)',

                            display: 'flex',
                            justifyContent: 'center',
                            cursor: 'pointer',

                            borderRadius: '55px',
                            width: '100%',
                            margin: '3%',
                            padding: '2%',
                            textDecoration: 'none',
                            color: 'inherit',
                            transition: 'transform 0.3s ease-in-out',  // Add a smooth transition for the transform property
                        }}
                        href={`/topic/${topic.id}`}
                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        <h3 style={{color:'white'}}>{topic.data.name}</h3>
                        <p style={{color:'white'}}>{topic.data.description}</p>
                    </Link>

                )
            })}
        </div>

        </div >
    )
}

export default page

