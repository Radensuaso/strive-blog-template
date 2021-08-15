import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
import { submitBlogPost } from "../../utils/axiosTools";
export default class NewBlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPost: {
        category: "Jobs",
        title: "",
        content: "",
      },
    };
    this.handleQuillChange = this.handleQuillChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleQuillChange = (value) => {
    this.setState({ blogPost: { ...this.state.blogPost, content: value } });
  };

  handleChange = (key, value) => {
    this.setState({ blogPost: { ...this.state.blogPost, [key]: value } });
  };

  render() {
    return (
      <Container className="new-blog-container">
        <Form
          className="mt-5"
          onSubmit={() => submitBlogPost(this.state.blogPost)}
        >
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Title"
              value={this.state.blogPost.title}
              onChange={(e) => this.handleChange("title", e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              size="lg"
              as="select"
              value={this.state.blogPost.category}
              onChange={(e) => this.handleChange("category", e.target.value)}
            >
              <option>Jobs</option>
              <option>Motivational</option>
              <option>Accomplishments</option>
              <option>React</option>
              <option>Node.js</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              value={this.state.blogPost.content}
              onChange={this.handleQuillChange}
              className="new-blog-content"
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
