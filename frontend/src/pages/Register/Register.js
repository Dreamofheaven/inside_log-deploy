import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import './Register.css'
import { register } from '../../actions/userActions'

function Register({location, history}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword]=useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const userRegister = useSelector(state => state.register)
  const {error, userInfo} = userRegister 

  useEffect(()=> {
    if (userInfo) {
        window.location.href = '/';
    }
  }, [userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword){
        setMessage('비밀번호가 일치하지 않습니다.')
    } else if (error){
      setMessage(error.message)
    }
    else {
        dispatch(register(name, email, phoneNumber, password))
    }
  }
  return (
    <div className='register-page'>
      <h1>회원가입</h1>
      {message && <Message variant={'danger'}>{message}</Message>}
      {error && <Message variant={'danger'}>{error}</Message>}
      <form onSubmit={submitHandler}>
        <input required type="name" name="name" id="name" placeholder='이름' onChange={(e) => setName(e.target.value)} />
        <input required type="email" name="email" id="email" placeholder='이메일' onChange={(e) => setEmail(e.target.value)} />
        <input required type="phoneNumber" name="phoneNumber" id="phoneNumber" placeholder='전화번호' onChange={(e) => setPhoneNumber(e.target.value)} />
        <input required type="password" name="password" id="password" placeholder='비밀번호' onChange={(e) => setPassword(e.target.value)} />
        <input required type="password" name="passwordConfirm" id="passwordConfirm" placeholder='비밀번호 확인' onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}
export default Register
