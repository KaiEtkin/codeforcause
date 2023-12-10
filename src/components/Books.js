'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
const Books = () => {

    const [booksArray, setBooksArray] = useState([])
    useEffect(() => {
        getBooks()
    }, [])

    async function getBooks() {
        const res = await fetch('/api/getAllBooks', {

            headers: {
                'Content-Type': 'application/json',
            }

        })
        const data = await res.json();


        setBooksArray(data)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <h1>Books</h1>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {booksArray.map((book) => {
                    return (
                        <Link
                            style={{
                                cursor: 'pointer',
                                border: '2px solid black',
                                borderRadius: '55px',
                                margin: '5%',
                                padding: '50%',
                                textDecoration: 'none', // Remove underline
                                color: 'inherit', // Use the default text color
                            }}
                            href={`/book/${book.id}`}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <h2>{book.data.name}</h2>
                                <p style={{fontSize:'20px'}}>{book.data.description}</p>
                        </div>
                        </Link>

            )
                })}
        </div>

        </div >
    )
}

export default Books