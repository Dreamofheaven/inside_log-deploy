import React from 'react'
import '../css/PostList.css'
import { Link } from 'react-router-dom'

function PostList({ post }) {
  return (
    <div id="checks">
      <div className='PostList-box'>
        <Link id = 'check' to={`/posts/${post.id}`}></Link>
      </div>
        <p class="arrow_box">{post.title}</p>
    </div>
  )
}

export default PostList