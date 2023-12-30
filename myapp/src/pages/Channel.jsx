// david emmanuel doe869

import React, { useState, useEffect, useCallback } from "react";
import { useUserContext } from "./UserContext";
import "./Channel.css";
import SearchT from "./SearchT";
import Likes from "./Likes";

function ChannelMessages({ channelId, onRefresh }) {
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState("");

  const { userId } = useUserContext();

  const fetchMessagesAndReplies = useCallback(() => {
    fetch(`http://localhost:5002/getChannelMessages/${channelId}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
        fetchRepliesForMessages(data);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, [channelId]);

  useEffect(() => {
    fetchMessagesAndReplies();
  }, [fetchMessagesAndReplies]);

  const fetchRepliesForMessages = (messages) => {
    messages.forEach((message) => {
      fetch(`http://localhost:5002/getReplies/${message.message_id}`)
        .then((response) => response.json())
        .then((replyData) => {
          setReplies((prevReplies) => ({
            ...prevReplies,
            [message.message_id]: replyData,
          }));
        })
        .catch((error) => console.error("Error fetching replies:", error));
    });
  };

  const handlePostMessage = () => {
    if (!newMessage.trim()) {
      alert("Please enter a message");
      return;
    }

    fetch("http://localhost:5002/postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channelId: channelId,
        userId: userId,
        content: newMessage,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setNewMessage("");

          setTimeout(() => {
            fetch(`http://localhost:5002/getChannelMessages/${channelId}`)
              .then((response) => response.json())
              .then((data) => setMessages(data))
              .catch((error) =>
                console.error("Error fetching messages:", error)
              );
          }, 1000);
        } else {
          alert("Error posting message");
        }
      })
      .catch((error) => {
        console.error("Error posting message:", error);
      });
  };

  const handlePostReply = (messageId) => {
    if (!newReply.trim()) {
      alert("Please enter a reply");
      return;
    }

    fetch("http://localhost:5002/postReply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageId: messageId,
        userId: userId,
        content: newReply,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setNewReply("");
          setReplyingTo(null);

          setTimeout(() => {
            fetch(`http://localhost:5002/getChannelMessages/${channelId}`)
              .then((response) => response.json())
              .then((data) => setMessages(data))
              .catch((error) =>
                console.error("Error fetching messages:", error)
              );
          }, 1000);
        } else {
          alert("Error posting reply");
        }
      })
      .catch((error) => {
        console.error("Error posting reply:", error);
      });
  };

  return (
    <>
      <SearchT></SearchT>
      <div className="messages-container">
        <h4>Messages</h4>
        {messages.map((message) => (
          <div key={message.message_id} className="message search-text">
            <p className="message-info">
              <span className="username">Sent by - {message.username}</span>
              <span className="timestamp">
                Sent at - {new Date(message.timestamp).toLocaleString()}
              </span>
            </p>
            <p className="message-content">{message.content}</p>
            <button onClick={() => setReplyingTo(message.message_id)}>
              Reply
            </button>
            <input type="file" />

            {replyingTo === message.message_id && (
              <div className="reply-input">
                <textarea
                  rows="2"
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="Type a reply"
                />
                <button onClick={() => handlePostReply(message.message_id)}>
                  Post Reply
                </button>
              </div>
            )}
            {replies[message.message_id] &&
              replies[message.message_id].map((reply) => (
                <div key={reply.reply_id} className="reply">
                  <p>
                    {reply.content} - Replied by {reply.username}
                  </p>
                  <Likes></Likes>
                </div>
              ))}
          </div>
        ))}
        <div className="message-input">
          <textarea
            rows="4"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={handlePostMessage}>Post</button>
          <input type="file" />
        </div>
      </div>
    </>
  );
}

function Channel() {
  const [channelName, setChannelName] = useState("");
  const [channels, setChannels] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5002/channels")
      .then((response) => response.json())
      .then((data) => setChannels(data))
      .catch((error) => console.error("Error fetching channels:", error));
  }, [refresh]);

  const { userId } = useUserContext();

  const handleCreateChannel = (userId) => {
    if (!channelName) {
      alert("Please enter a channel name");
      return;
    }

    fetch("http://localhost:5002/createChannel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: channelName, userId: userId }),
    })
      .then((response) => response.json())
      .then((newChannelData) => {
        setChannels((prevChannels) => [...prevChannels, newChannelData]);
        setChannelName(""); // Reset the input field
        setRefresh(true); // Trigger refresh
        setTimeout(() => {
          setRefresh(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error creating channel:", error);
      });
  };

  const handleChannelSelect = (channelId) => {
    setSelectedChannelId(channelId);
  };

  return (
    <div className="channel-container">
      <div className="sidebar">
        <div className="create-channel">
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Channel Name"
          />
          <button onClick={() => handleCreateChannel(userId)}>Create</button>
        </div>
        <h3>Available Channels</h3>
        <ul className="channel-list">
          {channels.map((channel) => (
            <li
              key={channel.channel_id}
              onClick={() => handleChannelSelect(channel.channel_id)}
              className={
                selectedChannelId === channel.channel_id ? "active" : ""
              }
            >
              {`${channel.channel_name} - Created by ${channel.creator_name}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        {selectedChannelId && (
          <>
            <h3>
              Selected Channel:{" "}
              {
                channels.find(
                  (channel) => channel.channel_id === selectedChannelId
                )?.channel_name
              }
            </h3>
            <ChannelMessages
              channelId={selectedChannelId}
              onRefresh={() => setRefresh(true)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Channel;
