import axios from 'axios'
import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, 
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,  USER_DETAILS_FAIL, USER_DETAILS_RESET,
    USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,USER_UPDATE_PROFILE_SUCCESS,USER_UPDATE_PROFILE_FAIL,USER_UPDATE_PROFILE_RESET,
} from '../constants/userConstants'
import { redirect } from "react-router-dom"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type : USER_LOGIN_REQUEST
        })
        const config={
            headers: {
                'Content-type':'application/json',
            }
        }
        const {data} = await axios.post(
            'http://localhost:8000/accounts/login/', {'username': email, 'password':password},
            config
        )
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        sessionStorage.setItem('userInfo',JSON.stringify(data)) 
        window.location.assign('/main')
    }catch(error){
        dispatch({
            type: USER_LOGIN_FAIL, 
            payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}
export const logout=()=>(dispatch)=>{
    sessionStorage.removeItem('userInfo') 
    dispatch({type:USER_LOGOUT})
    dispatch({type:USER_DETAILS_RESET})
    window.location.replace('/')
}
export const register = (name, email, phoneNumber, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config={
            headers: {
                'Content-type':'application/json'
            }
        }
        const {data} = await axios.post(
            'http://localhost:8000/accounts/register/',
            {'name': name, 'email': email, 'phone_number': phoneNumber, 'password': password},
            config
        )
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        window.location.assign('/')
    } catch(error){
        dispatch({
            type:USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}
export const deleteUser=(id) => async (dispatch, getState)=> {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })
        const {
            userLogin: {userInfo},
        } = getState()
        const config={
            headers: {
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`,
            },
        };
        const {data}=await axios.delete(
            `http://localhost:8000/accounts/delete/${id}/`, 
            config
        )
        dispatch({
            type:USER_DELETE_SUCCESS,
            payload: data
        })
        sessionStorage.removeItem('userInfo');
        window.location.assign('/')
    } catch (error) {
        dispatch({
            type:USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            `http://localhost:8000/accounts/${id}/`,
            config
        )
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `http://localhost:8000/accounts/profile/update/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        sessionStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateUser = (user) => async (dispatch, getState)=>{
    try {
        dispatch({
            type:USER_UPDATE_REQUEST
        })
        const {
            userLogin: {userInfo},
        }=getState()
        const config={
            headers: {
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}=await axios.put(
            `http://localhost:8000/accounts/update/${user.id}/`,
            user,
            config
        )
        dispatch({
            type:USER_UPDATE_SUCCESS,
        })
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}
