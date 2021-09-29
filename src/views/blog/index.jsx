import React, { Component } from "react";
import { Container, Image, Button } from "react-bootstrap";
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

  getBlogPost = async () => {
    try {
      const { id } = this.props.match.params;
      const { data: blog } = await axios.get(
        `${process.env.REACT_APP_BE_URL}/blogPosts/${id}`
      );
      this.setState({ blog, loading: false });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  componentDidMount = async () => {
    this.getBlogPost();
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
            <div className="d-flex justify-content-end">
              <div className="d-flex flex-column">
                <Button
                  className="mb-4"
                  href={`${process.env.REACT_APP_BE_URL}/blogPosts/${blog._id}/downloadPDF`}
                  variant="dark"
                >
                  Download PDF
                </Button>
                <Button
                  href={`${process.env.REACT_APP_BE_URL}/blogPosts/${blog._id}/sendEmail`}
                  target="_blank"
                  variant="light"
                >
                  Send me an email
                </Button>
              </div>
            </div>
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
