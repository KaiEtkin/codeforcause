'use client'
import React from 'react'
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase';

const page = () => {

    const [fileUpload, setFileUpload] = useState(null);
    const uploadFile = () => {
        if(imageUpload == null){
            return;
        }
        else{
            send();
            //api request for it to go into firestore with file path in storage, name of file, descript
            //upload to firebase storage 
        }

    };


  async function send() {
    let file = fileUpload
    console.log(file)
    const storageRef = ref(storage, 'files/' + file.name)
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          //sendItUp(downloadURL)
        });

      }
    );
  
  }
  async function sendItUp(downloadURL) {
    const res2 = await fetch('/api/createPost', {
      method: 'POST',
      body: JSON.stringify({ file: downloadURL, name: localStorage.getItem("name"), familyCode: localStorage.getItem("familyCode"), caption: caption, }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
  return (
    <div>
        <h1>Admin Portal Stem For Fun</h1>
        <h2>Add a book</h2>
        <input type="file" onChange={(event) => {setFileUpload(event.target.files[0])}} />
        <button onClick={uploadFile}>Upload File</button>
        <input placeholder="Name" />
        <input placeholder="Description" />

        <h2>Add a playlist</h2>
        <input placeholder="Name of playlist" />
    </div>
  )
}

export default page