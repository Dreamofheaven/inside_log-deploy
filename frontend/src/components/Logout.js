import React  from 'react'
import '../css/LoginForm.css'
import { useDispatch } from 'react-redux'
import {logout} from '../actions/userActions'

function Logout() {
    const dispatch =useDispatch()
    const logOut = () => {
        dispatch(logout())
    };
    return (
        <div className='logOut'>
            <button onClick={logOut}>Logout</button>
        </div>
    )
}

export default Logout
