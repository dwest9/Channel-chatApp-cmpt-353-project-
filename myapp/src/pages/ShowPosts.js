// david emmanuel doe869

import React from "react";
import "./ShowPosts.css";

export const ShowPosts = ({ get }) => {
  return (
    <>
      {get.map((post) => (
        <div className="container" key={post.id}>
          <h3>Post Topic: {post.topic}</h3>
          <p>Post Data: {post.data}</p>
        </div>
      ))}
    </>
  );
};
