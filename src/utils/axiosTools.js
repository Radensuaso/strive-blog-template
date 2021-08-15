import axios from "axios";

export const getBlogPosts = async () => {
  const res = await axios.get("http://localhost:3001/blogPosts/");
  const blogPosts = res.data;
  console.log(blogPosts);
  return blogPosts;
};
