import React, { useState } from "react";
import { postService } from "../services/api";

export default function PostList({ posts: initialPosts }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  if (!posts.length) return <p>No posts yet.</p>;

  const handleDelete = async (id) => {
    try {
      await postService.deletePost(id);
      setPosts(posts.filter((post) => post._id !== id));
      alert("✅ Post deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete post.");
    }
  };

  const handleEdit = (post) => {
    setEditingId(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleUpdate = async (id) => {
    try {
      const updatedPost = await postService.updatePost(id, {
        title: editTitle,
        content: editContent,
      });
      setPosts(posts.map((post) => (post._id === id ? updatedPost : post)));
      setEditingId(null);
      alert("✅ Post updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to edit post.");
    }
  };

  const handleCancel = () => setEditingId(null);

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            backgroundColor: "#1a1a1a",
            color: "#fff",
          }}
        >
          {editingId === post._id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
              />
              <button onClick={() => handleUpdate(post._id)}>Save</button>
              <button onClick={handleCancel} style={{ marginLeft: "0.5rem" }}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <button onClick={() => handleEdit(post)}>Edit</button>
              <button
                onClick={() => handleDelete(post._id)}
                style={{ marginLeft: "0.5rem" }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
