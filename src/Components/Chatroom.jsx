import React, { useContext, useEffect, useState } from 'react';
import Message from './Message';
import SendIcon from '@mui/icons-material/Send';
import { Authcontext } from '../context/Authcontext';
import { Chatcontext } from '../context/Chatcontext';
import { Timestamp, arrayUnion, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { v4 as uuid } from "uuid";
import Message_user from './Message_user';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Chatroom() {
  const [textData, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const { currentUser } = useContext(Authcontext);
  const { data } = useContext(Chatcontext);

  const handleText = async () => {
    if (textData !== "") {
      const text = textData;
      setText("");
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      })

      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [data.chatId + ".lastmessage"]: {
          text
        },
        [data.chatId + ".date"]: serverTimestamp()
      })
      await updateDoc(doc(db, 'userChats', data.user.uid), {
        [data.chatId + ".lastmessage"]: {
          text
        },
        [data.chatId + ".date"]: serverTimestamp()
      })

    }
    setText("");
  }

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    });

    return () => {
      unsub()
    }
  }, [data.chatId])

  // console.log(messages)

  return (
    <div className='chatroom'>
      <div className="messages">
        {messages ? messages.map((m) => {
          return (
            m.senderId === currentUser.uid ? <Message_user key={m.id} message={m} /> : <Message key={m.id} message={m} />
          )
        }) : <span></span>}
      </div>
      <div className="input-sec">
        <Container style={{ backgroundColor: 'white'}}>
          <Row style={{display:'flex',alignItems:'center'}}>
            <Col xs={10}>
              <input type="text" style={{border:'none',outline:'none'}} placeholder='Type here...' value={textData} onChange={(e) => { setText(e.target.value) }} required />
            </Col>
            <Col xs={1}>
              <button id='sendbtn' onClick={handleText}><SendIcon /></button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Chatroom