import React, { useState, useEffect } from "react";
import api from "./services/api"; // ✅ use only this
import "./App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

export default function App() {
  const [view, setView] = useState("home");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/posts"); // ✅ use api here
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (post) => {
    try {
      const { data } = await api.post("/posts", post); // ✅ use api here
      alert("✅ Post created successfully!");
      setPosts((prev) => [...prev, data]);
      setView("home");
      fetchPosts(); // refresh after creating
    } catch (error) {
      console.error("Error creating post", error);
      alert("❌ Failed to create post!");
    }
  };

  const handleHomeClick = async () => {
    await fetchPosts(); // refresh posts every time Home is clicked
    setView("home");
  };

  return (
    <div className="container">
      <h1>MERN Blog</h1>

      <nav>
        <button onClick={handleHomeClick}>🏠 Home</button>
        <button onClick={() => setView("create")}>➕ Create Post</button>
      </nav>

      {view === "home" ? (
        loading ? <p>Loading posts...</p> : <PostList posts={posts} />
      ) : (
        <PostForm onSubmit={createPost} />
      )}
    </div>
  );
}
