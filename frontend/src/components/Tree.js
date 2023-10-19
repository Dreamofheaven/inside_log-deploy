import React from 'react'
import '../css/Tree.css'

function Tree() {
  const token=sessionStorage.getItem('userInfo')
  if (!token){
      window.location.href='/';
  }
  return (
    <div className='tree'>
      <img className='trees' src='static/images/real-tree.png'></img>
    </div>
  )
}

export default Tree
