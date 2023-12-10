'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactPlayer from 'react-player';

const page = ({ params }) => {
  const router = useRouter();
  useEffect(() => {
    init();
  }, []);

  const [topic, setTopic] = useState(null);

  async function init() {
    const res2 = await fetch('/api/getTopic', {
      method: 'POST',
      body: JSON.stringify({ name: params.topic }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res2.json();
    setTopic(data);
    console.log('data is', data);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h2>{topic != null && topic.name}</h2>
      {topic != null && topic.videos && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px', // Adjust the gap as needed
          }}
        >
          {topic.videos.map((item, index) => (
            <ReactPlayer
              key={index}
              style={{ margin: '2%', width: '100%', height: '300px' }}
              controls
              url={item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
