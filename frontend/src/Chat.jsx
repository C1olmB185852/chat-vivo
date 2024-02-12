import React, { useEffect, useState } from "react";
import { CardContent, Card, Icon, FormField, Button, Container, Form, Input, Item, MessageHeader, Message, Divider } from 'semantic-ui-react'

const Chat = ({socket, username, room}) => {

    const [currentMessage, setCurrentMessage] = useState("")
    const [messagesList, sendMessagesList] = useState([])

    const sendMessage = async () => {
        if (username && currentMessage) {
            const info = {
                message: currentMessage,
                room,
                author: username,
                time:
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", info);
            sendMessagesList((list)=>[...list, info]);
        }
    }

    useEffect(() => {
        const messageHandle = data => {
        sendMessagesList((list)=>[...list, data]);
        }
        socket.on("receive_message", messageHandle)

        return () => socket.off("receive_message", messageHandle)

    },[socket]);
 
    return (
        <Container>
        <Card fluid>
            <CardContent header={`Chat en vivo | Usuario: ${username} | Sala: ${room}`} />
            <CardContent style={{minHeight:"600px"}}>
            {messagesList.map((item,i)=> {
                return (
                    <span key={i}>
            <Message style={{ textAling: username === item.author ? 'right' : 'left' }}
            success={username === item.author}
            info={username >= item.author}
            >
        <MessageHeader>{item.message}</MessageHeader>
        <p>
            Enviado por: <strong>{item.author}</strong>, a las{" "} <i>{item.time}</i> </p>
        </Message>
        <Divider />
        </span>
                );
            })

            }
            </CardContent>
            <CardContent extra>
                <Form>
    <FormField>
    <div className="ui action input">
    <input 
     
     type="text"
     placeholder="Mensaje ..." 
     onChange={e => setCurrentMessage(e.target.value)}
     onKeyPress={(e)=> {
        if(e.key=== "Enter") 
        sendMessage()
     }}
                 /> 
    <button type="button" onClick={()=>sendMessage()}className="ui teal icon right labeled button">
        <Icon name="send"/>
        Enviar
        </button>
    </div>
    </FormField>
    </Form> 
            </CardContent>
        </Card>
        </Container>
    )
}

export default Chat