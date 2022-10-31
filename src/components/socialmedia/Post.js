import React from "react"
import "./Post.css"

function Post({ displayName, username, timestamp, text, image, avatar }) {
  return  <div className="post" >
  <div className="post__avatar">
    {/* <Avatar src={avatar} /> */}
  </div>
  <div className="post__body">
    <div className="post__header">
      <div className="post__headerText">
        <h3>
          {displayName}{" "}
          <span className="post__headerSpecial">
            @{username}
          </span>
        </h3>
      </div>
      <div className="post__headerDescription">
        <p>{text}</p>
      </div>
    </div>
    <img src={image} alt="" />
    
  </div>
</div>
}

export default Post
