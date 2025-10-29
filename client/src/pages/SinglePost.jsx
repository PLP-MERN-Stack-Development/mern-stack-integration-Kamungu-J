import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import PostView from "../components/PostView";
import Navbar from "../components/Navbar";

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/posts/${id}`).then(res => setPost(res.data));
  }, [id]);

  return (
    <>
      <Navbar />
      <PostView post={post} />
    </>
  );
}
