
import { useState } from 'react'
import './App.css'

import io from 'socket.io-client'
import Chat from './Chat';
import { CardContent, Button, FormField, Form, Card, Icon, Container, Header } from 'semantic-ui-react'


const socket = io.connect("http://localhost:3001")
function App() {
  const [username,setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if(username !== "" && room !== "") {
      socket.emit("join_room",room)
      setShowChat(true)
    }
  }
 
  return (
   <Container>
    {!showChat? (
      <Card fluid>
    <CardContent header='Unirme al Chat' />
    <CardContent>
    <Form>
    <FormField>
      <label>Usuario:</label>
      <input 
    type="text" 
    placeholder='Usuario ...' 
    onChange={e => setUsername(e.target.value)}
    />    
    </FormField>
    <FormField>
      <label>Sala:</label>
      <input 
    type="text" 
    placeholder="ID Sala:" 
    onChange={e => setRoom(e.target.value)}
    /> 
    </FormField>
    <Button onClick={joinRoom}>Unirme</Button>
  </Form>
    </CardContent>
  </Card>
  ): (
  <Chat socket={socket} username={username} room={room} />
  )}
    </Container>
  );
}

export default App
