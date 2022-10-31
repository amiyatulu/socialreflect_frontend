import React from "react"
import "./Feed.css"
import Post from "./Post";
import TweetBox from './TweetBox';

function Feed() {
  return (
    <div className="feed">
      {/* Header */}
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      {/* TweetBox */}
      <TweetBox />

      <Post
            displayName="Amiya"
            username="amiya_rbehera"
            // verified={post.verified}
            text="Hello Word"
            // avatar={post.avatar}
            // image={post.image}
          />
      {/* Post */}
      {/* Post */}
      {/* Post */}
      {/* Post */}
      {/* Post */}
      {/* Post */}
      {/* Post */}
      {/* Post */}
    </div>
  )
}

export default Feed
