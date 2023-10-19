import React, { useState, useEffect } from 'react'
import './LandingPage.css'
import Footer from '../../components/Footer'
import LoginForm from '../../components/LoginForm'
import { useSelector, useDispatch } from 'react-redux';

function LandingPage() { 
  const [showLoginForm, setShowLoginForm] = useState(false)
  const toggleLoginForm = () => { 
    setShowLoginForm(!showLoginForm);
  };
  return (
    <main className='page-wrap'>
      <div className='page-main'>  
        <h1>내 안의 긍정이</h1>
        {showLoginForm ? <LoginForm /> : 
          <button className='login-btn' onClick={toggleLoginForm}>
            <p>로그인</p>
          </button>
        }
      </div>
      <Footer/>
    </main>
  )
}

export default LandingPage
