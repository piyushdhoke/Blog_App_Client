import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createPost } from "../services/postService";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

const CreatePost = () => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(formData, token);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 5, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Create a New Post
        </Typography>

        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          fullWidth
          multiline
          rows={6}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Post
        </Button>
      </Box>
    </Container>
  );
};

export default CreatePost;
