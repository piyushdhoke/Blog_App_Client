import axios from "axios";

const API_URL = "http://localhost:5000/api/posts";

export const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// postService.js
export const getPostById = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/${postId}`); 
      if (!response.ok) throw new Error("Failed to fetch post");
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  

export const createPost = async (post, token) => {
  const response = await axios.post(API_URL, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updatePost = async (postId, postData, token) => {
    try {
      const response = await axios.put(`${API_URL}/${postId}`, postData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token if required by backend
          "Content-Type": "application/json", // Set JSON content type
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  };

  export const deletePost = async (postId, token) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Verify token is in this format
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  // Like a post
  export const likePost =  async (postId, token) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/like`, 
        {}, // empty body for "like" request
        {
          headers: { Authorization: `Bearer ${token}` }, // ensure token is sent here
        }
      );
      return response.data.likes;
    } catch (error) {
      console.error("Error liking post:", error.response || error);
      throw error;
    }
  };
  

  // Add a comment
 export const addComment = async (postId, content, token) => {
  const response = await axios.post(`${API_URL}/${postId}/comments`, { content }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


  
  // Get comments for a post
 
  export const getComments =  async (postId, content, token) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comments`, 
        { content }, // send the content in the body
        {
          headers: { Authorization: `Bearer ${token}` }, // make sure token is sent
        }
      );
      return response.data; // return the updated comments array
    } catch (error) {
      console.error("Error adding comment:", error.response || error);
      throw error;
    }
  };
