'use client'

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
    pdfjs.GlobalWorkerOptions.workerSrc =  
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 
 
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    useEffect(() => {
        init();
    }, [])

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
    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
      setNumPages(nextNumPages);
      setPageNumber(1);
    }
  if(data != null) {return (
    <div>
      <h1>{data.name}</h1>
      <Document 
        file={`https://secret-ocean-49799.herokuapp.com/${data.file}`} 
        onLoadSuccess={onDocumentLoadSuccess} 
        > 
        <Page pageNumber={pageNumber} /> 
      </Document> 
      

    </div>
  )
  }
  else{
    return (
      <div><h1>Loading</h1></div>
    )
  }
}

export default page