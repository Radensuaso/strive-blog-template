import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import "./styles.css";
import axios from "axios";
/* import posts from "../../data/posts.json"; */
class Blog extends Component {
  state = {
    blog: {},
    loading: true,
  };

  getBlogPost = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BE_URL}/blogPosts/${id}`
      );
      const blogPost = res.data;
      console.log(blogPost);
      return blogPost;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    const blog = await this.getBlogPost(id);
    this.setState({ blog, loading: false });
  };

  render() {
    const { loading, blog } = this.state;
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
