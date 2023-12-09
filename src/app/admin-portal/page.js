'use client'
import React from 'react'
import { useState } from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const page = () => {

    const [file, setFile] = useState(null);

    const handleFileUpload = async () => {
        if (!file) {
            alert('You did not select a file!')
            return;
        }
        send();


    };
    async function send() {
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
                    sendItUp(downloadURL)


                });

            }
        );

    }
    async function sendItUp(downloadURL) {
        const res2 = await fetch('/api/addBook', {
            method: 'POST',
            body: JSON.stringify({ file: downloadURL, name: bookName, desc: bookDesc }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    async function uploadTopic() {
        const res5 = await fetch('/api/addTopic', {
            method: 'POST',
            body: JSON.stringify({ name: playlistName, videos: links }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    const [playlistName, setPlaylistName] = useState('')

    const handleInputChange = (event) => {
        setPlaylistName(event.target.value);
    };

    const [videoLink, setVideoLink] = useState('');
    const [links, setLinks] = useState([]);

    const handleInputChangeVideo = (event) => {
        setVideoLink(event.target.value);
    };

    const handleAddInput = () => {
        if (videoLink.trim() !== '') {
            setLinks([...links, videoLink]);
            setVideoLink('');
        }
    };
    const handleInputChangeBook = (event) => {
        setBookName(event.target.value);
    };

    const handleInputChangeDesc = (event) => {
        setBookDesc(event.target.value);
    };

    const [bookName, setBookName] = useState('')
    const [bookDesc, setBookDesc] = useState('')

    const handleTopicSubmit = () => {
        if (!links || !playlistName) {
            alert("Add at least one video or add a name!")
            return;
        }
        uploadTopic();
    }

    const [password, setPassword] = useState('');
    const [locked, setLocked] = useState(true);
    let correctPass = 'codeforcausehackathon1492'
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const checkLocked = () => {
        if (password == correctPass) {
            setLocked(false);
            alert('correct')
        }
        else{
            alert('wrong password!')
        }
    }
    return (

        <div>
            {locked && <div>
                <input
                    type="password"
                    placeholder="admin password"
                    value={password}
                    onChange={handlePassword}
                />
                <button onClick={checkLocked}>Check password</button>
            </div>
            }
            {!locked &&
                <div>
                    <h1>Admin Portal for STEM Made Fun</h1>

                    <h2>Upload Book</h2>
                    <input type='file' onChange={(e) => { setFile(e.target.files[0]) }} />
                    <input
                        type="text"
                        placeholder="book name"
                        value={bookName}
                        onChange={handleInputChangeBook}
                    />

                    <input
                        type="text"
                        placeholder="book description"
                        value={bookDesc}
                        onChange={handleInputChangeDesc}
                    />
                    <button onClick={handleFileUpload}>Upload</button>


                    <h2>Upload Topic</h2>
                    <input
                        type="text"
                        placeholder="Topic name"
                        value={playlistName}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        value={videoLink}
                        onChange={handleInputChangeVideo}
                        placeholder="Enter video link"
                    />
                    <button onClick={handleAddInput}>+</button>



                    <h3>{playlistName}</h3>
                    <ul>
                        {links.map((link, index) => (
                            <li key={index}>{link}</li>
                        ))}
                    </ul>

                    <button onClick={handleTopicSubmit}>Submit topic</button>

                </div>}
        </div>
    )
}

export default page