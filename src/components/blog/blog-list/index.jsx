import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
/* import posts from "../../../data/posts.json"; */
import { getBlogPosts } from "../../../utils/axiosTools";
export default class BlogList extends Component {
  state = {
    blogPosts: [],
    loading: true,
  };

  componentDidMount = async () => {
    const blogPosts = await getBlogPosts();
    this.setState({ blogPosts, loading: false });
  };

  render() {
    return (
      <Row>
        {this.state.blogPosts.map((post) => (
          <Col md={4} key={post._id} style={{ marginBottom: 50 }}>
            <BlogItem key={post.title} {...post} />
          </Col>
        ))}
      </Row>
    );
  }
}
