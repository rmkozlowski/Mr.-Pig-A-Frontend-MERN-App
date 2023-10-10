import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const baseUrl = "https://mrpigbankers.onrender.com/api";

export function Home() {
  return (
    <div style={{display: "flex", justifyContent: "center", paddingBottom: "20px"}}>
    <Container>
        <Row>
          <Col>
            <Card className='card-wide'>
              <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/images/image-home.jpg`} alt="card image cap" id="pighome"/>
              <Card.Body>
              <Card.Title>Mr.Pig Bankers Association </Card.Title>
              <Card.Text style={{textAlign: 'left'}}>
              At Mr. Pig Banking Services, we provide you with a secure home for your hard-earned money in a much safer, more flexible location compared to your childhood piggy bank. Even though we are a serious bank, we value the straight-forward, light-hearted, basic values that excited us when we started saving money as young children. We believe in:<br></br>
              <br></br>
              <ul><b>SAFE SAVINGS:</b> A secure, portable location for your funds. We go with you. We protect you.</ul>
              <ul><b>JOYFUL TRANSACTIONS:</b>Who doesn’t love the classic piggy bank? We love pink, our team is always friendly, and we keep things light.</ul>
              <ul><b>TRANSPARENT BANKING:</b> Access your finances at all times. Use our online application to access your funds. </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
      </Row>
      <Row>
      </Row>
      </Container>
  </div>
  );
}

export default Home;