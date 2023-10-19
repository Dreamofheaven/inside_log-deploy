import React, { useState, useEffect } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './Create.css'

function Create() {
  const token=sessionStorage.getItem('userInfo')
  if (!token){
      window.location.href='/';
  }
  const userLogin = useSelector(state => {return state.userLogin.userInfo})
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const createPostHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://127.0.0.1:8000/posts/create/',
        {
          title: title,
          body: body,
        },
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userLogin.token}`,
          },
        }
      )
      window.location.assign('/main')
    } catch (error) {
      console.log('에러가 발생하였습니다.', error)
    }
  }

  return (
    <div className='create-page'>
      <Link to='/main'>
        <FaArrowLeftLong className='back' />
      </Link>
      <div className='create-page-box'>
        <form className='create-page-form' onSubmit={createPostHandler}>
          <div className='create-page-form-title'>
            <input type='text' placeholder='제목' value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div id = 'message' className='create-page-form-content'>
            <textarea placeholder='내용을 입력하세요.' value={body} onChange={(e) => setBody(e.target.value)}/>
          </div>
          <input id = 'send' className='create-page-form-submit' onClick={() => console.log('등록눌렀음')} type='submit' value='등록'/>
        </form>
      </div>   
    </div>
  )
}

export default Create
