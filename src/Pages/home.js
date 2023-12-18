import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Button, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaComment } from 'react-icons/fa'; 
import Avatar from 'react-avatar';
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/friends");
        setUsers(response.data);
      } catch (error) {
        setError("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  const loggedInUserId = localStorage.getItem("userId");
  console.log(loggedInUserId)



  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h1 className="text-center bg-info p-2">Welcome to Chat Application</h1>
          <h2 className="p-2 m-2 my-4">{loggedInUserId}, Lets chat with</h2>
          {error && <p className="text-danger">{error}</p>}
          <ListGroup>
            {users.map((user) => (
               String( user.email) !== String(loggedInUserId) && (
              <ListGroup.Item key={user._id} className="d-flex justify-content-between align-items-center">
                   <div className="d-flex align-items-center">
                  <Avatar name={`${user.firstName} ${user.lastName}`} round size="40" /> 
                  <span className="ml-2">  {user.firstName} {user.lastName}</span>
                </div>
                <Link to={`/chat/${user.firstName}`} className="ml-2">
                <Button variant="primary" className="ml-2" ><FaComment /></Button>
                </Link>
              </ListGroup.Item>))
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
