import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { FaRegFaceGrin } from 'react-icons/fa6'
import { IoTrashOutline } from "react-icons/io5";
import { listReview } from '../../actions/postAction'
import CreateReview from '../../components/CreateReview'
import axios from 'axios'
import './Detail.css'

function Detail() {
  const token=sessionStorage.getItem('userInfo')
  if (!token){
      window.location.href='/';
  }
  const { id } = useParams()
  const dispatch = useDispatch()
  const [post, setPost] = useState(null)
  const reviewList = useSelector(state => state.reviewList.review) 
  const handleDelete=async()=>{
    try{
      const response = await axios.delete(`http://127.0.0.1:8000/posts/delete/${id}/`)
      window.location.assign('/main') 
    } catch (error){
      console.error('리뷰 삭제 오류',error);
    }
  }
  const handleButtonClick = () => {
    dispatch(listReview(id)) 
    setTimeout(()=> {
      window.location.assign(`/loading?id=${id}`)
    },); 
    }; 

  useEffect(() => {
    async function fetchPost() {
      try {
        const postResponse = await axios.get(`http://127.0.0.1:8000/posts/${id}/`)
        const postData = postResponse.data
        setPost(postData)
        dispatch(listReview(id))
      } catch (error) {
      }
    } fetchPost()},[id])
    if (!post) {
      return <div>해당 게시글을 찾을 수 없습니다.</div>
    }
  const created_at = `${post.created_at.split('T')[0]} ${post.created_at.split('T')[1].split(':')[0]}:${post.created_at.split('T')[1].split(':')[1]}`;
  return (
    <div className='detail-page'>
      <div className='detail-page-box2'>
        <Link to='/main'>
          <FaArrowLeftLong className='back' />
        </Link>
        <IoTrashOutline className='delete-button' onClick={handleDelete} />
      </div>
      <div className='detail-page-box'>
        <div className='detail-title'>
          <p className="num">No. {post.id}</p>
          <h2>{post.title}</h2>
          <p className='date'>{created_at}</p>
        </div>

        <div className='detail-body'> 
          <span>◇</span>
          <p>{post.body}</p>
        </div>

        <div className='detail-status'> 
          <p>{post.status}</p>
        </div>
        <div className='call-button'>
          <CreateReview id={id} handleButtonClick={handleButtonClick} />
        </div>
        <FaRegFaceGrin className='icon'/>
        <div className='detail-review'>
          {reviewList && reviewList.length > 0 ? <p>{reviewList[0].comment}</p> : <p>리뷰아직없음</p>}  
        </div>
      </div>
    </div>
  )
}

export default Detail