import React, { useEffect, useState } from "react";
import { getPosts, likePost } from "../services/postService"; // Add `likePost`
import { Link } from "react-router-dom";

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Pagination,
  Stack,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Icon for like button

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getPosts(page, postsPerPage);
      setPosts(postsData);
    };
    fetchPosts();
  }, [page]);

  const handleLike = async (postId) => {
    try {
      const updatedPost = await likePost(postId); // Call API to like post
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? updatedPost : post))
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Blog Posts
      </Typography>

      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  By {post.author.username}
                </Typography>
                <Typography variant="body1" noWrap>
                  {post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.content}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Link to={`/posts/${post._id}`} style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary" fullWidth>
                      Read More
                    </Button>
                  </Link>
                </Box>
                <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                  <IconButton onClick={() => handleLike(post._id)} color="error">
                    <FavoriteIcon />
                  </IconButton>
                  <Typography>{post.likes || 0} Likes</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack spacing={2} sx={{ mt: 4 }} alignItems="center">
        <Pagination
          count={Math.ceil(100 / postsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Stack>
    </Container>
  );
};

export default Home;
