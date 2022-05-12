import React, {useReducer} from 'react';
import axios from 'axios';
import githubContext from './githubContext';
import GithubReducer from './githubReducer'
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    Get_USER,
    GET_REPOS
} from '../types'

const GithubState = props => {
    const initialState = {
        users:[],
        user:{},
        repos: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);


    // Search Users
    const searchUsers = async text => {
        // this.setState({ loading: true })
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
        ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        //  this.setState( { users: res.data.items, loading: false })
        //  console.log(res.data)
        // setUsers(res.data.items)
        // setLoading()
        dispatch({
            type : SEARCH_USERS,
            payload: res.data.items
        })
      }
    

    // Get User

    const getUser = async (username) => {
        setLoading()
      const res = await axios.get(`https://api.github.com/users/${username}?client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      
      //  this.setState( { user: res.data, loading: false })
      //  console.log(res.data)
//       setUser(res.data)
//    setLoading(false)
        dispatch({
        type: Get_USER,
        payload: res.data
        })
  
    }
    // Get Repos

    // Clear Users
    const clearUsers = () => dispatch({type: CLEAR_USERS})


    // Set Loading
      const setLoading = () => dispatch({ type: SET_LOADING })

    return <githubContext.Provider
    value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers, 
        getUser

    }}
    >
        {props.children}
    </githubContext.Provider>
}


export default GithubState;