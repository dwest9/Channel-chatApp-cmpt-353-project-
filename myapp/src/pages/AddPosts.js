// david emmanuel doe869

import React, { useState } from "react";

const AddPosts = ({ set }) => {
  const [topic, setTopic] = useState("");
  const [data, setData] = useState("");

  const handleAddPost = () => {
    fetch("http://localhost:5002/addPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, data }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "ok") {
          alert("Post added successfully!");
          // Fetch posts again after a successful addition
          fetchPosts();
        } else {
          alert("Failed to add post.");
        }
      });
  };

  const fetchPosts = () => {
    fetch("http://localhost:5002/getPosts")
      .then((response) => response.json())
      .then((response) => set(response));
  };

  return (
    <div>
      <h2>Add New Post</h2>
      <div>
        <label>Post Topic:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>
      <div>
        <label>Post Data:</label>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
      <button onClick={handleAddPost}>Add Post</button>
    </div>
  );
};

export default AddPosts;
