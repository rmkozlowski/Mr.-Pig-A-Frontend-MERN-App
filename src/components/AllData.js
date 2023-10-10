// AllData.js
import React, {useState, useEffect} from 'react';
import { Card, Table } from 'react-bootstrap';
import './styles/Card.css';
import './styles/Table.css';

const baseUrl = "https://mrpigbankers.onrender.com/api";

export function AllData() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  function getUsers() {
    fetch(`${baseUrl}/users`)
      .then(res => res.json())
      .then(users => setUsers(users))
      .catch(err => console.log(err));
  }
  function deleteUser(id){
    fetch(`${baseUrl}/users/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(data => getUsers())
    .catch(err => console.log(err));
  }
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
    <Card className="card" style={{ backgroundColor: "transparent", border: 0 }}>
      <Card.Body>
        <Card.Title><b>Customer and Employee Accounts</b></Card.Title>
        <br />
        <Table striped bordered>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ID</th>
              <th>BALANCE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
            <tr key={index}>
              <td style={{ color: 'black' }}>{user.name}</td>
              <td style={{ color: '#5a082d' }}>{user.email}</td>
              <td style={{ color: 'black' }}>{user._id}</td>
              <td style={{ color: '#5a082d' }}>{user.balance}</td>
              <td><button onClick={()=>deleteUser(user._id)}>Delete</button></td>
            </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
    </div>
  );
}

export default AllData;
