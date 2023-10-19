import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails,  updateUserProfile } from '../../actions/userActions'
import {USER_UPDATE_PROFILE_RESET} from '../../constants/userConstants'
import './Update.css'

function Update() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword]=useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector(state => state.details)
    const { error, loading, user } = userDetails

    console.log(user)

    const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
    const {success}=userUpdateProfile

    useEffect(() => {
        // if (!user || !user.name || success || user._id !== Number(userInfo.id)) {
        if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile')) 
                console.log('getUser디테일 실행됨')
            } else {
                setName(user.name)
                setEmail(user.email)
                // setPassword(user.password)
            }
    }, [dispatch, userInfo, user, success])
    
    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user.id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }
    }
  return (
    <div>
        <div className='update-page'>
            <h1>정보변경</h1>
            {message && <span>{message}</span>}
            {/* {error && <span>{error}</span>} */}
            <form onSubmit={submitHandler}>
                <input type="name" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" id="password" placeholder='비밀번호' onChange={(e) => setPassword(e.target.value)} />
                <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder='비밀번호 확인' onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit">확인</button>
            </form>
    </div>
    </div>
  )
}

export default Update

// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getUserDetails,  updateUser } from '../../actions/userActions'
// import {USER_UPDATE_PROFILE_RESET} from '../../constants/userConstants'
// import './Update.css'

// function Update() {
//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [confirmPassword, setConfirmPassword]=useState('')
//     const [message, setMessage] = useState('')

//     const dispatch = useDispatch()

//     const userLogin = useSelector(state => state.userLogin)
//     const { userInfo } = userLogin

//     const userDetails = useSelector(state => state.details)
//     const { error, loading, user } = userDetails
//     console.log(user)

//     console.log(userInfo.id) 

//     useEffect(() => {
//         if (!user.name || user._id !== Number(userInfo.id)) {
//                 dispatch(getUserDetails(userInfo.id))
//             } else {
//                 setName(user.name)
//                 setEmail(user.email)
//                 setPassword(user.password)
//             }
//     }, [user])
    
//     const submitHandler = (e) => {
//         e.preventDefault()

//         if (password != confirmPassword) {
//             setMessage('Passwords do not match')
//         } else {
//             dispatch(updateUser({
//                 'id': userInfo.id,
//                 'name': name,
//                 'email': email,
//                 'password': password
//             }))
//             setMessage('')
//         }
//     }
//   return (
//     <div>
//         <div className='update-page'>
//             <h1>정보변경</h1>
//             {message && <span>{message}</span>}
//             {/* {error && <span>{error}</span>} */}
//             <form onSubmit={submitHandler}>
//                 <input required type="name" name="name" id="name" placeholder='이름' onChange={(e) => setName(e.target.value)} />
//                 <input required type="email" name="email" id="email" placeholder='이메일' onChange={(e) => setEmail(e.target.value)} />
//                 <input required type="password" name="password" id="password" placeholder='비밀번호' onChange={(e) => setPassword(e.target.value)} />
//                 <input required type="password" name="passwordConfirm" id="passwordConfirm" placeholder='비밀번호 확인' onChange={(e) => setConfirmPassword(e.target.value)} />
//                 <button type="submit">확인</button>
//             </form>
//     </div>
//     </div>
//   )
// }

// export default Update
