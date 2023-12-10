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
        <div>

            <h1>Books</h1>
            <div style={{ display: 'flex', flexDirection: 'row', }}>
                {booksArray.map((book) => {
                    return (
                        <Link style={{ cursor: 'pointer', border: '2px solid black', borderRadius: '55px', width: '100%', margin: '5%', padding: '2%'}} href={`/book/${book.id}`}>

                                <h3>{book.data.name}</h3>
                                <p>{book.data.description}</p>

                        </Link>
                    )
                })}
            </div>

        </div>
    )
}

export default Books