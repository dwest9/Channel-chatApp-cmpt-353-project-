// david emmanuel doe869

import React, { useState, useEffect } from "react";

function Post({ channelId }) {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch existing posts for the channel when the component mounts
    fetch(`http://localhost:5002/getChannelMessages/${channelId}`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, [channelId]); // Dependency on channelId to refetch when it changes

  const handleCreatePost = () => {
    if (!content) {
      alert("Please enter some content for the post");
      return;
    }

    const newPost = {
      channelId,
      content, // Assuming the user ID is handled in the backend
    };

    fetch("http://localhost:5002/addPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((post) => {
        setPosts([...posts, post]); // Update the posts list with the new post
        setContent(""); // Clear the input field
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <div>
      <h2>Create Post</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post..."
      ></textarea>
      <button onClick={handleCreatePost}>Post</button>
      {/* Display posts */}
      {posts.map((post) => (
        <div key={post.id}>{post.content}</div>
      ))}
    </div>
  );
}

export default Post;
