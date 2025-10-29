import React, { useState } from "react";
import { postService } from "../services/api";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Fill all fields");

    setLoading(true);
    try {
      await postService.createPost({ title, content });
      setTitle("");
      setContent("");
      alert("✅ Post created successfully!"); // <-- Pop-up confirmation
    } catch (err) {
      console.error("Error creating post:", err);
      alert("❌ Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
