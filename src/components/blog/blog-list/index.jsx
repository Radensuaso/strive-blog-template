import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import axios from "axios";
/* import posts from "../../../data/posts.json"; */
export default class BlogList extends Component {
  state = {
    blogPosts: [],
    loading: true,
  };

  getBlogPosts = async () => {
    try {
      const { data: blogPosts } = await axios.get(
        `${process.env.REACT_APP_BE_URL}/blogPosts/`
      );
      this.setState({ blogPosts, loading: false });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  componentDidMount = async () => {
    this.getBlogPosts();
  };

  render() {
    return (
      <Row>
        {!this.state.loading &&
          this.state.blogPosts.map((post) => (
            <Col md={4} key={post._id} style={{ marginBottom: 50 }}>
              <BlogItem key={post.title} {...post} />
            </Col>
          ))}
      </Row>
    );
  }
}
