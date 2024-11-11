import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getPostById, updatePost, deletePost } from "../services/postService"; // Import deletePost
import { Container, TextField, Button, Box, Typography, Stack } from "@mui/material";

const EditPost = () => {
  const { id } = useParams(); // Get post ID from URL
  const { token } = useContext(AuthContext); // Get token from AuthContext
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(id);
        setTitle(postData.title);
        setContent(postData.content);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, { title, content }, token);
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(id, token);
      navigate("/"); // Navigate to home after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Edit Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            margin="normal"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            multiline
            rows={4}
          />
          <Stack direction="row" spacing={2} mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update Post
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleDelete}
            >
              Delete Post
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default EditPost;
