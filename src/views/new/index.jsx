import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
import axios from "axios";
export default class NewBlogPost extends Component {
  state = {
    blogPost: {
      category: "Jobs",
      title: "",
      content: "",
      cover: null,
    },
  };

  // ***************** handle change *******************
  handleChange = (key, value) => {
    this.setState({ blogPost: { ...this.state.blogPost, [key]: value } });
  };

  handleCoverChange = (e) => {
    this.setState({
      blogPost: { ...this.state.blogPost, cover: e.target.files[0] },
    });
  };

  // ************ handle submit *********************
  submitBlogPost = async (blogPost, e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BE_URL}/blogPosts/`,
        blogPost
      );
      if (res.status === 201) {
        const blogPostId = res.data._id;

        const formData = new FormData();
        const coverImg = blogPost.cover;
        formData.append("cover", coverImg);
        const coverRes = await axios.post(
          `${process.env.REACT_APP_BE_URL}/blogPosts/${blogPostId}/uploadCover`,
          formData
        );
        if (coverRes.status === 200) {
          alert("Blog Post was created");
        } else {
          console.log(coverRes);
        }
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container className="new-blog-container">
        <Form
          className="mt-5"
          onSubmit={(e) => this.submitBlogPost(this.state.blogPost, e)}
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
          <Form.Group controlId="blog-content">
            <Form.Label>Blog Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className="new-blog-content"
              value={this.state.blogPost.content}
              onChange={(e) => this.handleChange("content", e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Upload the Post Cover</Form.Label>
            <Form.File id="upload-cover" onChange={this.handleCoverChange} />
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
