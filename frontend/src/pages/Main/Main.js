import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoMdAddCircle } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux'
import { listPosts } from '../../actions/postAction'
import Footer from '../../components/Footer'
import Tree from '../../components/Tree'
import PostList from '../../components/PostList'
import Paginate from '../../components/Paginate';
import {logout, deleteUser, updateUser} from '../../actions/userActions'
import './Main.css';

function Main({}) { 
  const token = sessionStorage.getItem('userInfo')
  let userInfoObject={};
  try{
    userInfoObject = JSON.parse(token);
  }catch(error){
    console.error('userInfo 오류', error);
  }
  const userId=userInfoObject.id;
  if (!token){
      window.location.href='/';
  }

  // 드롭다운 관련
  const [isDropdown, setIsDropdown] = useState(false)

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown)
  }

  const dispatch = useDispatch()
  const postList = useSelector(state => state.postList)

  const userLogin = useSelector(state => {return state.userLogin.userInfo})
  const { loading, error, posts } = postList

  // 로그아웃
  const logOut = () => {
      dispatch(logout())
  };
  // 업데이트
  const update = () => {
    dispatch(updateUser(userId))
  };
  // 게시글 
  useEffect(() => {
    dispatch(listPosts(userLogin))
  }, [userLogin])


  // 페이지 네이션 관련 코드
  const [count, setCount] = useState(0); // 아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  const [postPerPage] = useState(6); // 한 페이지에 보여질 아이템 수 
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들

  useEffect(() => {
    // token 값이 존재하는지 확인
    if (token) {
      setCount(posts.length);
      setIndexOfLastPost(currentPage * postPerPage);
      setIndexOfFirstPost(indexOfLastPost - postPerPage);
      setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
    }
  },[currentPage, indexOfLastPost, indexOfFirstPost, postPerPage, posts])

  const setPage = (error) => {
    setCurrentPage(error);
  };

  return (
    <main className='main-wrap'>      
      <div className='main-title'>
        <div className='title-container'>
          <h1>내 안의 긍정이</h1>
        </div>
        <div className="smile-container" >
          <button className='dropdown' onClick={toggleDropdown}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <span class="material-symbols-outlined">sentiment_satisfied</span>
          </button>
          {isDropdown && (
            <div className='dropdown-content'>
              <button onClick={logOut}>로그아웃</button>
              <Link to={`update/${userId}`}>정보변경</Link>
              <button onClick={() => dispatch(deleteUser(userId))}>회원탈퇴</button>
            </div>
          )}
        </div>  
      </div>
      <Link to='/create'>
        <IoMdAddCircle className='create-post' />
      </Link>
      <Tree />
      <div className='posts-wrap'>
        {currentPosts && currentPosts.map(post => (
          <div className="bubble-wrap" key={post.id}>
            <PostList key={post.id} post={post} className="bubble"></PostList>
          </div>
          ))}
      </div>
      <div className='paginate-wrap'>
        {count && <Paginate page={currentPage} count={count} setPage={setPage}/>}
      </div>
      <Footer/>
    </main>
  )
}

export default Main

