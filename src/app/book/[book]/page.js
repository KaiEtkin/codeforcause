'use client'
const axios = require('axios').default;

import { useRouter } from 'next/navigation'
import { useState, useRef,useEffect } from "react";
// import default react-pdf entry
import { Document, Page, pdfjs } from "react-pdf";
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from "../../../pdf-worker";
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
const page = ({
    params}) => {
    const router = useRouter()
    
   
    useEffect(() => {
        init();
    }, [])
    const [messages, setMessages] = useState([]);
    const [inp, setInp] = useState("");
    const [data, setData] = useState(null);
    async function init(){
        const res2 = await fetch('/api/getBook', {
            method: 'POST',
            body: JSON.stringify({ name: params.book }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let data2 = await res2.json();
        setData(data2);
        console.log(data2)
    }
   
    function chatPDF(){
      
    if(data != null){  
      const config = {
        headers: {
          "x-api-key": "sec_lA2rHaJ9WVJtEtlUBrmgUjw5kiWzzcrR",
          "Content-Type": "application/json",
        },
      };

      const dat = {
        sourceId: "cha_"+data.id,
        messages: [...messages,
          {
            role: "user",
            content: "what is this book about?",
          },
        ],
      };

      axios
        .post("https://api.chatpdf.com/v1/chats/message", dat, config)
        .then((response) => {
          console.log("Result:", response.data.content);
          setMessages([...messages,{role: "user", content: inp},{role: "assistant", content: response.data.content}])
          setInp("");
        })
        .catch((error) => {
          console.error("Error:", error.message);
          console.log("Response:", error.response.data);
        });
      }
    }
  if(data != null) {return (
    <div style = {{display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: 'center'}}>
      <h1>{data.name}</h1>
      {messages.map((message) => {
          return (<div style = {{margin: '1%',padding: '0.2% 1%', borderRadius: '20px', backgroundColor: "#94F6DE", textAlign: "center"}}>
              <h4>{message.role}:</h4>
              <h5 style= {{width: '50vw'}}>{message.content}</h5>
              </div>
          )
      })}
      <div style = {{display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'center'}}>
      <input value = {inp} onChange = {(e) => setInp(e.target.value)} placeholder = "learn by asking questions..."></input>
      <button onClick = {chatPDF}>🕊</button>
      </div>
      <object type = "application/pdf" data = {data.file} width = "600" height = "700"></object>

    </div>
  )
  }
  else{
    return (
      <div ><h1 style = {{left: '50%', position: 'absolute', top: "50%", transform: "translateXY(-50%)"}}>Loading</h1></div>
    )
  }
}

export default page