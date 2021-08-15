import axios from "axios";

export const getBlogPosts = async () => {
  try {
    const res = await axios.get("http://localhost:3001/blogPosts/");
    const blogPosts = res.data;
    console.log(blogPosts);
    return blogPosts;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const submitBlogPost = async (blogPost) => {
  try {
    const res = await axios.post("http://localhost:3001/blogPosts/", blogPost);
    if (res.status === 201) {
      console.log(res);
    } else if (res.status === 400) {
      console.log(res);
    }
  } catch (error) {
    console.log(error);
  }
};
