import React, { useEffect, useState } from "react";
import api from "../services/api";
import PostForm from "../components/PostForm";
import Navbar from "../components/Navbar";

export default function CreateEditPost() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories").then(res => setCategories(res.data));
  }, []);

  const handleSubmit = async (data) => {
    await api.post("/posts", data);
    alert("Post created!");
  };

  return (
    <>
      <Navbar />
      <PostForm categories={categories} onSubmit={handleSubmit} />
    </>
  );
}
