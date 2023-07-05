import React, { useContext, useState } from 'react';
import { Avatar } from '@mui/material';
import { collection, query, where,getDoc,getDocs, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase";
import { Authcontext } from '../context/Authcontext';

function Search() {

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const {currentUser} = useContext(Authcontext);

    const handleSearch = async () => {
        const q = query(collection(db, 'users'), where("displayName", "==", username))
        try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setUser(doc.data())
        });
    }catch(error){
        setErr(true)
    }
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch()
    }

    const handleSelect = async () =>{
        const newId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try{
            const res = await getDoc(doc(db,'chats',newId));

            if (!res.exists()){
                await setDoc(doc(db,'chats',newId),{messages:[]})

                await updateDoc(doc(db,'userChats',currentUser.uid),{
                    [newId + ".userinfo"]:{
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [newId + ".date"] : serverTimestamp()
                })

                await updateDoc(doc(db,'userChats',user.uid),{
                    [newId + ".userinfo"]:{
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [newId + ".date"] : serverTimestamp()
                })
            }
        }catch(error){

        }
        setUser(null);
        setUsername("");
    }

    return (
        <div className='search'>
            <div className="search-user">
                <input type="text" placeholder='Find a user' onKeyDown={handleKey} value={username} onChange={(e) => { setUsername(e.target.value) }} />
            </div>
            {err && <span>User not found!</span>}
            {user && <div className="userChat" onClick={handleSelect}>
                <Avatar src={user.photoURL}/>
                <span>{user.displayName}</span>
            </div>}
        </div>
    )
}

export default Search;