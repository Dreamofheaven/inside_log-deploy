import React from 'react'
import './LoadingPage.css'
import { Oval } from "react-loader-spinner"

function LoadingPage() {
    const searchParams = new URLSearchParams(window.location.search);
    const idFromURL = searchParams.get('id');
    setTimeout(()=> {
    window.location.assign(`/posts/${idFromURL}`)
      },40000); 
  return (
    <div className='loading-page'>
        <div className='runner-img'>
            <img src="static/images/runner.png" alt="달리는 사람" />
        </div>
        <h2>GhatGPT가 답을 받아오고 있어요.</h2>
        <div className='loading-icon'>
            <Oval className="oval"/>
        </div>
        <div className='footer'>
            <p>사람 아이콘 제작자: photo3idea_studio - Flaticon</p>
        </div>
    </div>
  )
}

export default LoadingPage


