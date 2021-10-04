import React, { Component } from "react";
import "./styles.css";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";

export default class Register extends Component {
  state = {
    author: { name: "", email: "", password: "", birthDate: "", avatar: null },
    loading: false,
    error: false,
  };
  render() {
    return (
      <Container fluid="sm" className="register-form">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <h2 className="text-center">Register</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name *</Form.Label>
                <Form.Control type="text" placeholder="Enter your full name." />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address *</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Enter a password *</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Birth date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Avatar</Form.Label> <br />
                <Form.Control type="file" />
              </Form.Group>

              <div>* Required fields.</div>
              <div className="mt-2 d-flex justify-content-between">
                <Button variant="dark" type="submit">
                  <FcGoogle /> Register with Google
                </Button>
                <Button variant="dark" type="submit">
                  Register
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
