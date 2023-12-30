import React, { useState } from "react";

function Likes() {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [activeBtn, setActiveBtn] = useState("none");

  const handleLikeClick = () => {
    if (activeBtn === "none" || activeBtn === "dislike") {
      setLikeCount(likeCount + 1);
      setActiveBtn("like");
    } else if (activeBtn === "like") {
      setLikeCount(likeCount - 1);
      setActiveBtn("none");
    }
  };

  const handleDisikeClick = () => {
    if (activeBtn === "none" || activeBtn === "like") {
      setDislikeCount(dislikeCount + 1);
      setActiveBtn("dislike");
    } else if (activeBtn === "dislike") {
      setDislikeCount(dislikeCount - 1);
      setActiveBtn("none");
    }
  };

  return (
    <div className="container">
      <div className="btn-container">
        <button
          className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
          onClick={handleLikeClick}
          style={{
            backgroundColor: activeBtn === "like" ? "darkgreen" : "green",
            color: "white",
            marginRight: "8px",
          }}
        >
          Like {likeCount}
        </button>

        <button
          className={`btn ${activeBtn === "dislike" ? "dislike-active" : ""}`}
          onClick={handleDisikeClick}
          style={{
            backgroundColor: activeBtn === "dislike" ? "darkgreen" : "green",
            color: "white",
          }}
        >
          Dislike {dislikeCount}
        </button>
      </div>
    </div>
  );
}

export default Likes;
