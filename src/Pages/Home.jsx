import React, { useContext } from 'react'
import Chat from '../Components/Chat';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from '../Components/Sidebar';
import { Authcontext } from '../context/Authcontext';

function Home() {
  // const {currentUser} = useContext(Authcontext);
  // console.log(currentUser)
  return (
    <div className="home">
        <div className="home-con">
            <Container>
              <Row>
                <Col style={{padding:'0%'}} xs={4}> <Sidebar/> </Col>
                <Col style={{padding:'0%'}} xs={8}> <Chat/> </Col>
              </Row>
            </Container>
        </div>
    </div>
  )
}

export default Home;