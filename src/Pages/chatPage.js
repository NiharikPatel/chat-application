import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import io from "socket.io-client";
import { addMessage, addReceivedMessage } from "../redux/chatReducer";
import ScrollToBottom from "react-scroll-to-bottom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { deleteMessage, likeMessage} from "../redux/chatReducer";


function Chat() {
    const email = localStorage.getItem('userId');
    const [socket, setSocket] = useState(null);
    const { firstname } = useParams();
    const [currentMessage, setCurrentMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    console.log(firstname);
    const dispatch = useDispatch();
    const messages = useSelector(state => state.chat.messages);
    console.log(messages);
    useEffect(() => {
    }, [messages]);

    useEffect(() => {
      if (firstname) {
        setSelectedUser({ id: firstname, name: `User${firstname}` });
      }
    }, [firstname]);
  
    const sendMessage = () => {
      if (socket && currentMessage.trim() !== "" && selectedUser) {
        const messageData = {
          id: uuidv4(),
          room: socket.id,
          sender: email,
          message: currentMessage,
          receiver: selectedUser.name, 
          time: new Date(Date.now()).toLocaleTimeString(),
          sentByCurrentUser: true,
          like:false,

        };
       
        socket.emit("send_message", messageData);
        dispatch(addMessage(messageData));
        setCurrentMessage("");
      }
    };
    const handleDelete = (messageId) => {
      socket.emit("delete_message", { messageId });
      dispatch(deleteMessage(messageId));
    };
  
    const handleLike = (messageId) => {
      socket.emit("like_message", { messageId });
      dispatch(likeMessage(messageId));
    };
    
  
    useEffect(() => {
      const processReceivedMessage = (data) => {
       
          const receivedMessage = {
            id: uuidv4(),
            author: data.sentByCurrentUser ? "You" : data.author,
            message: data.message,
            time: data.time,
            sender: data.sender,
            receiver: data.receiver,
            sentByCurrentUser: false,
            like: false,
            room:data.roomId,
          };
          console.log("Received message:", receivedMessage);
          dispatch(addReceivedMessage(receivedMessage));
        
      };
    
      const token = localStorage.getItem('token');
      const newSocket = io('http://localhost:8000', {
        query: {
          token: token,
        },
        transports: ['websocket'],
      });
      newSocket.on('connect', () => {
        console.log('Connected to the server');
      });
    
      newSocket.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });
      setSocket(newSocket);
    
      newSocket.on("receive_message", (data) => {
        const email = localStorage.getItem('userId');
        processReceivedMessage(data, email);
      });
      
      newSocket.on('message_liked', ({ messageId }) => {
        dispatch(likeMessage(messageId));
      });
    
      return () => {
        newSocket.disconnect();
        
      };
    }, [dispatch, selectedUser]);
    

  
    return (
      
      <Container fluid className="chat-window">
        <h2>Your chat with {firstname}</h2>
        <ScrollToBottom className="message-container">
          <ListGroup>
          {messages.length > 0 ? (
            
            messages  
            .filter(messageContent => messageContent.sentByCurrentUser===false)
            .map((messageContent, index) => (
              <ListGroup.Item
                key={index}
                className={`message ${
                  messageContent.sentByCurrentUser ? "sent" : "received"
                }`}
                
              >
                <div>
                <p id="author" className="bg-info p-2">{messageContent.receiver==="User"+firstname? <span className="text-light">You</span> : firstname}</p>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                    
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    
                    
                      <button className="bg-danger text-light" onClick={() => handleDelete(messageContent.id)}>Delete</button>
                   
                    {messageContent.receiver !== "User"+firstname ?(
                     <> <button onClick={() => handleLike(messageContent.id)}  className={`bg-${messageContent.like ? 'primary' : 'secondary'} text-light`}>Like</button>
                    
                    </>):(<></>)}
                    
                
                    
                    <hr></hr>
                  </div>
                </div>
              </ListGroup.Item>
            ))
            ) : (
                <p>No messages yet</p>
              )}
          </ListGroup>
        </ScrollToBottom>
        <Form className="chat-footer">
          <div className="d-flex justify-content-end">
            <Form.Control
              type="text"
              value={currentMessage}
              placeholder="Hey..."
              onChange={(event) => setCurrentMessage(event.target.value)}
              onKeyDown={(event) => {
                // Check if the pressed key is Enter (key code 13) and trigger sendMessage
                if (event.key === 'Enter') {
                  event.preventDefault(); // Prevents the default behavior of Enter key (form submission)
                  sendMessage();
                }}}
              
            />
            <Button variant="primary" onClick={sendMessage}>&#9658;</Button>
          </div>
        </Form>
      </Container>
    );
  }
  
  export default Chat;
  