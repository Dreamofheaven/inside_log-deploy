import axios from 'axios'
import { useSelector } from 'react-redux'
import {
    POST_LIST_REQUEST, POST_LIST_SUCCESS, POST_LIST_FAIL,
    POST_DETAILS_REQUEST, POST_DETAILS_SUCCESS, POST_DETAILS_FAIL,
    POST_DELETE_REQUEST, POST_DELETE_SUCCESS, POST_DELETE_FAIL,
    POST_CREATE_REQUEST, POST_CREATE_SUCCESS, POST_CREATE_FAIL, POST_CREATE_RESET,
    POST_UPDATE_REQUEST, POST_UPDATE_SUCCESS, POST_UPDATE_FAIL, POST_UPDATE_RESET,
    REVIEW_LIST_REQUEST, REVIEW_LIST_SUCCESS, REVIEW_LIST_FAIL,
    REVIEW_CREATE_REQUEST, REVIEW_CREATE_SUCCESS, REVIEW_CREATE_FAIL, REVIEW_CREATE_RESET,
} from '../constants/postConstants'

export const listPosts = (userLogin) => async (dispatch) => {
    try {
        dispatch({type: POST_LIST_REQUEST})
        const{data}=await axios.get('http://127.0.0.1:8000/posts/',
            {
                headers: {
                    'Content-type': 'application/json',
                    Authorization : `Bearer ${userLogin.token}`,
                },
            }
        )
        dispatch({
            type: POST_LIST_SUCCESS, 
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_LIST_FAIL, 
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: POST_UPDATE_REQUEST
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
            `/api/products/update/${product._id}/`,
            product,
            config
        )
        dispatch({
            type: POST_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({
            type: POST_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
export const listReview = (id) => async (dispatch) => {
    try {
        dispatch({type: REVIEW_LIST_REQUEST})
        const { data } = await axios.get(`http://127.0.0.1:8000/posts/${id}/reviews/`) 
        dispatch({
            type: REVIEW_LIST_SUCCESS, 
            payload: data
        })
    } catch (error) { 
        dispatch({
            type: REVIEW_LIST_FAIL, 
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
export const reviewCreate = (id) => async (dispatch) => {
    try {
        dispatch({type: REVIEW_CREATE_REQUEST})
        const { data } =  await axios.post(`http://127.0.0.1:8000/posts/${id}/reviews/create/`,{})
        dispatch = ({
            type: REVIEW_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: REVIEW_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}