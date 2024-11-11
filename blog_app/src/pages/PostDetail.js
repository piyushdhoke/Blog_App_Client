import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, deletePost, addComment, getComments } from "../services/postService";
import { AuthContext } from "../context/AuthContext";

import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Button,
  TextField,
  Stack,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const PostDetail = () => {
    
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleDelete = async () => {
    try {
      await deletePost(id, token);
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const updatedComments = await addComment(id, newComment, token);
      setComments(updatedComments);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };


  const fetchComments = async () => {
    try {
      const fetchedComments = await getComments(id, token);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(id);
        setPost(postData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };
    fetchPost();
    fetchComments();
  }, [id, token]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h3" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {post.content}
        </Typography>
        <Stack direction="row" spacing={2} mt={2} justifyContent="center">
          {user && post.author && user.userId === post.author._id && (
            <>
              <Button variant="contained" color="primary" onClick={() => navigate(`/posts/${id}/edit`)}>
                Edit Post
              </Button>
              <Button variant="contained" color="secondary" onClick={handleDelete}>
                Delete Post
              </Button>
            </>
          )}
        </Stack>

        {/* Comments Section */}
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Comments
          </Typography>
          <List>
            {comments.map((comment) => (
              <ListItem key={comment._id}>
                <ListItemText primary={comment.content} secondary={`By ${comment.author.username}`} />
              </ListItem>
            ))}
          </List>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleAddComment} sx={{ mt: 2 }}>
            Add Comment
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PostDetail;
