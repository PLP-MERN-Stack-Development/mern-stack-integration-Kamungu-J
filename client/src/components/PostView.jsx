import React from "react";

export default function PostView({ post }) {
  if (!post) return <p>Loading...</p>;
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>Category: {post.category?.name}</small>
    </div>
  );
}
