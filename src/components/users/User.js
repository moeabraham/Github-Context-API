import React,{ useEffect, Fragment, useContext } from 'react'
import { useParams, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types'
import Repos from '../repos/Repos'
import GithubContext from '../../context/github/githubContext'
// function User({user: { name,company, blog, avatar_url, html_url, location, bio, followers, following, public_repos, public_gists,hireable}, loading, getUser, getUserRepos, repos}) {
// const  User(({user: { name,company, blog, avatar_url, html_url, location, bio, followers, following, public_repos, public_gists,hireable}, loading, getUser, getUserRepos, repos}) =>  {
  // const {user, loading} = user
  const User =({  getUserRepos, repos}) => {
    const { login :userLogin } = useParams()

    const {
      user: {
        name,
        avatar_url,
        location,
        bio,
        login,
        html_url,
        followers,
        following,
        public_gists,
        public_repos,
        hireable,
        blog,
        company,
      },
      loading,
      getUser,
    } = useContext(GithubContext)
  
    // const githubContext = useContext(GithubContext)

    // const {getUser, loading,user } = githubContext
    // const { login } = useParams()
    useEffect(() => {
        getUser(userLogin)
      // getUser(match.params.login)
        // console.log(getUsersRepos)
        getUserRepos(userLogin)
        // eslint-disable-next-line
    },[])
    
    
    // const { name,company, blog, avatar_url, html_url, location, bio, followers, following, public_repos, public_gists,hireable} = user

    // console.log(following)
    // static propTypes = {
      // console.log(this.user)
    // }
    if(loading){
      return <Spinner />
    } else {

    return (
          <Fragment>    
            <Link to='/' className="btn btn-light" >Back to Search</Link>
              Hireable: {' '}
              {hireable ? <i className="fas fa-check text-success"/> :  <i className="fas fa-times-circle text-danger"/>  }
              <div className="card grid-2"> 
                <div className="all center">
                  <img 
                  src={avatar_url}
                   className="round-img" 
                   alt="" 
                   style={{width:"150px"}}
                    />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                  {bio && (<Fragment>
                    <h3>BIO</h3>
                    <p>{bio}</p>
                    </Fragment>
                    )}
                    <a href={html_url} className="btn btn-dark my-1"> Visit Github Profile</a>
                    <ul>
                      <li>
                        {login && <Fragment>
                          <strong> Username: </strong> {login}
                            </Fragment>}
                      </li>
                      <li>
                        {company && <Fragment>
                          <strong> Company: </strong> {company}
                            </Fragment>}
                      </li>
                      <li>
                        {blog && <Fragment>
                          <strong> Website: </strong> {blog}
                            </Fragment>}
                      </li>
                    </ul>
                </div>
              </div>
              <div className="card text-denter">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-light">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
              </div>
<Repos repos={repos} />
          </Fragment>

      )

    }
  
}


User.propTypes ={ 
  // user : PropTypes.object.isRequired, 
  // loading: PropTypes.bool,
  // getUser: PropTypes.func.isRequired,
  getUserRepos:PropTypes.func.isRequired,
  repos:PropTypes.array.isRequired,
}

export default User