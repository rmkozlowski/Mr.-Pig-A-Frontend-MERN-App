import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";

const baseUrl = "https://mrpigbankers-api.onrender.com/api";

export function Transfer({loggedInUser, setLoggedInUser, updateUser, updateUserBalance}) {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const recipient = users.find(user => user._id === selectedUser);
    const recipientBalance = recipient ? recipient.balance : 0;
  
    useEffect(() => {
    getUsers();
  }, []);
  function getUsers() {
    fetch(`${baseUrl}/users`)
      .then(res => res.json())
      .then(users => setUsers(users))
      .catch(err => console.log(err));
  }

  const handleTransfer = () => {
    if (!validate(amount, "amount")) return;
    if (!selectedUser) {
      setStatus("Error: select a recipient.");
      reset();
      return;
    }

    if (!recipient) {
        setStatus("Error: select a recipient.");
        reset();
        return;
      }
    
    fetch (`${baseUrl}/users/${loggedInUser._id}/${recipient._id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            transferAmount: Number(amount), 
            senderBalance: loggedInUser.balance, 
            recipientBalance: recipient.balance}),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            showSuccess();
            setLoggedInUser({...loggedInUser, balance: loggedInUser.balance - Number(amount)});
        })
  };

  function reset() {
    setTimeout(() => {
      setStatus("");
      setAmount("");
    }, 4000);
  }

  function showSuccess() {
    setStatus(`Your transfer of $${amount} to ${recipient.name} was successful!`)
    reset();
  }

  function validate(field, label) {

    if (isNaN(field)) {
      setStatus("Error: enter numerical values only.");
      reset();
      return false;
    } else if (Number(field) < 0) {
      setStatus("Error: " + label + " cannot be negative.");
      reset();
      return false;
    }
    else if (!field) {
      setStatus("Error: " + label + " cannot be empty.");
      reset();
      return false;
    }
    else if (loggedInUser.balance - Number(amount) < 0) {
      setStatus("Transaction failed: must be less than your current balance.");
      reset();
      return false;
    }
    return true;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card className="card">
        <Card.Img variant="top"
          src={`${process.env.PUBLIC_URL}/images/image-transfer.jpg`} alt="card image cap"
        />
        <Card.Body>
          <Card.Title>How much money do you want to transfer from your account?</Card.Title>
          <Card.Text>Your current balance is <b>${loggedInUser?.balance}</b></Card.Text>
          <Form className="d-flex flex-column align-items-center">
            <br/>
            <input
              type="text"
              className="form-control custom-input-blue"
              id="amount"
              placeholder="Enter dollar amount"
              value={amount}
              onChange={(e) => setAmount(e.currentTarget.value)}
            />
            <br/><br/>
            <select
              className="form-control custom-select"
              onChange={(e) => setSelectedUser(e.target.value)}
              value="" // Set an empty value to show the default option
            >
              <option value="" disabled>Click to select recipient</option>
              {users.map((user, index) => (
                <option key={index} value={user._id}>{user.name}-{user.email}</option>
              ))}
            </select><br/><br/>
            {status && <p>{status}</p>}
            <Button
              type="button"
              variant="danger"
              onClick={handleTransfer}
              disabled={status !== "" || amount === ""}
            >
              Transfer
            </Button>
          </Form>

        </Card.Body>
      </Card>
    </div>
  );
}

export default Transfer;
