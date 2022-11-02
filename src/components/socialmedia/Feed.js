import React, { useState, useEffect, useContext } from "react"
import "./Feed.css"
import Post from "./Post"
import TweetBox from "./TweetBox"
import { useSubstrateState } from "../../substrate-lib"

function Feed() {
  const [status, setStatus] = useState(0)
  const { api } = useSubstrateState()
  useEffect(() => {
    const queryResHandler = async (result) => {
      if (result.isNone) {
        setStatus(null)
      } else {
        setStatus(result.toString())
      }

      console.log("status", status)
    }
    async function myfn() {
      const opts = []
      let data = api.query.posts.nextPostId(...opts, queryResHandler)
    }

    myfn()
  }, [api, status])

  return (
    <div className="feed">
      {/* Header */}
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      {/* TweetBox */}
      <TweetBox />
      {/* <div> number of post {status}</div> */}
      { [...Array(parseInt(status)).keys()].reverse().map((el, i) => (
          <div>
            <Post key={el} post_id={el}/>
          </div>
          
        ))}

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
