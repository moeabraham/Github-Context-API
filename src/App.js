
import React,{ useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar'
 import Users from './components/users/Users'
 import User from './components/users/User'
 import About from './components/pages/About'
 import axios from 'axios'
 import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import GithubState from './context/github/GithubState'


const App =() =>  {


  // const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading,setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  // state = {
  //   users : [],
  //   user:{},
  //   repos: [],
  //   loading: false,
  //   alert: null,
    
  // }


  // componentDidMount(){
  //   axios.get('https://api.github.com/users').then(res=> console.log(res.datswitcha))
  // }

  // async componentDidMount(){
  //   console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET)
  //   this.setState( { loading: true })

  //  const res = await axios.get(`https://api.github.com/users?client_id=
  //  ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
   
  //   this.setState( { users: res.data, loading: false })
  // }
  // const searchUsers = async text => {
  //   // this.setState({ loading: true })
  //   setLoading(true);
  //   const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
  //   ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
  //   //  this.setState( { users: res.data.items, loading: false })
  //   //  console.log(res.data)
  //   setUsers(res.data.items)
  //   setLoading(false)
  // }



  // GEt a single Github user
//   const getUser = async (username) => {
//       setLoading(true)
//     const res = await axios.get(`https://api.github.com/users/${username}?client_id=
//     ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
//     //  this.setState( { user: res.data, loading: false })
//     //  console.log(res.data)
//     setUser(res.data)
//  setLoading(false)

//   }
 const  getUserRepos = async (username) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
      setRepos(res.data)
      setLoading(false)
 

  }

  

 const showAlert = (msg, type) => {
  setAlert({msg,type})
  setTimeout(() => setAlert(null), 5000)

    // this.setState({ alert: {msg: msg, type: type} })
    // setTimeout(() => this.setState({alert: null}), 5000)

  }
  
// console.log(user)
    return (
      <GithubState>
      <Router>
      {/* // <React.Fragment> */}
       <div className="App"> 
          <Navbar  />  
          <div className="container">
            <Alert alert={alert} />
            <Routes>
              <Route  path='/'
              // render ={props => ()}
              element={
                <Fragment>
                {/* <div> */}
                   <Search 
                      // searchUsers={searchUsers}
                      // clearUsers={clearUsers}
                      // showClear = { users.length > 0 ? true : false }
                      setAlert={showAlert}
                   />
                <Users 
                // loading={loading} 
                // users={users} 
                />
                 </Fragment>
                // </div>
                }
              // )}
               />
               <Route path='/about' element={<About />} />
               <Route  path={`/user/:login`} element={
                               

                 <User 
                // {...props}
                  getUserRepos= {getUserRepos}
                  repos={repos}
                  />
                  
               }  
               />

            </Routes>
           
        {/* <UserItem />  */}
        </div>
       </div> 
      {/* // </React.Fragment> */}
      </Router>
      </GithubState>
    );
  
}

export default App;
