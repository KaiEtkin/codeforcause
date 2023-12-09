import React from 'react'

const page = () => {

    const [topicsArray, setTopicsArray] = useState([])

    async function getTopics() {
        const res = await fetch('/api/getAllTopics', {
            method: 'GET',
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


        </div>
    )
}

export default page