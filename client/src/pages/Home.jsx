import React, { useEffect, useState } from "react";
import { postService } from "../services/api";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const res = await postService.getAllPosts();
      setPosts(res || []);
    } catch (err) {
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(); // ✅ automatically fetch posts when page opens
  }, []);

  const handleNewPost = async (newPostData) => {
    try {
      const created = await postService.createPost(newPostData);
      setPosts((prev) => [created, ...prev]);
      alert("Post created successfully!");
    } catch (err) {
      alert("Failed to create post.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>All Posts</h1>
      <PostForm onSubmit={handleNewPost} />
      {loading ? <p>Loading posts...</p> : <PostList posts={posts} />}
    </div>
  );
}
