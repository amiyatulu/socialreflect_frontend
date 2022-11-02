import React, { useState, useEffect, useContext } from 'react'
import "./Post.css"
import { useSubstrateState } from '../../substrate-lib'
import axios from 'axios'
import { IPFS_URL } from '../../commons/config/configvar'
import { u8aToString, hexToU8a } from '@polkadot/util'

function Post({ post_id }) {
  const [status, setStatus] = useState(0)
  const [text, setText] = useState("")
  const [accountAddress, setAccountAddress] = useState("")
    const { api } = useSubstrateState()
    useEffect(() => {
      const queryResHandler = async result => {
        if (result.isNone) {
          setStatus(null)
          
        } else {
            setStatus(result.toString())
            let data = JSON.parse(result.toString());
            const hash = u8aToString(
              hexToU8a(JSON.parse(result.toString()).content)
            )
            const ipfsresult = await axios(`${IPFS_URL}${hash}`)
            console.log(data)
            setText(ipfsresult.data.post)
            setAccountAddress(data.owner)
        }
  
        console.log('status', status)
      }
      async function myfn() {
        const opts = [parseInt(post_id)]
        let data = api.query.posts.postById(...opts, queryResHandler)
      }
    
      myfn()
    }, [])
  return  <div className="post" >
  <div className="post__avatar">
    {/* <Avatar src={avatar} /> */}
  </div>
  <div className="post__body">
    <div className="post__header">
      <div className="post__headerText">
    
      <div className="post__headerDescription">
        <p>{text}</p>
      </div>
      <h3>
          { text && (`Account:`)}<br/> {accountAddress}{" "}
          <span className="post__headerSpecial">
            {/* @{username} */}
          </span>
        </h3>
      </div>
    </div>
    {/* <img src={image} alt="" /> */}
    
  </div>
</div>
}

export default Post
