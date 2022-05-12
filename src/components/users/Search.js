import React, {useContext, useState, } from 'react'
import PropTypes from 'prop-types';
// import GithubContext from '../../context/github/githubContext'
import GithubContext from '../../context/github/githubContext';

 const Search = ({  setAlert}) => {

  const githubContext = useContext(GithubContext)

const [text, setText] = useState('')
 

 const onChange = e => setText(e.target.value)
//  const onChange = e => setState({ [e.target.name] : e.target.value })
const onSubmit= e => {
    e.preventDefault()
    if(text === ''){
      setAlert('please enter something', 'light')
    } else {
      githubContext.searchUsers(text);
      // console.log(this.props)
  
      // this.setState({ text: ''})
      setText('')
    }
    // console.log(this.props)
}
// onSubmit(e){
//     e.preventDefault();
//     console.log(this.state.text)
// }
    // this.setState({ text: e.target.value })
    

 

    // const { showClear, clearUsers } = this.props;
    return (
      <div>
          <form  onSubmit={onSubmit} className="form">
              <input
                type="text"
                    name="text" 
                    placeholder="search Users ..."
                    value={text}
                    onChange={onChange}
                 />
              <input 
                    type="submit" 
                    value="search"
                    className='btn btn-dark bt-block'
                />
          </form>
          {githubContext.users.length > 0  &&
           <button 
           className="btn btn-light btn-block" 
           onClick={githubContext.clearUsers}
           >
             Clear
             </button>}
          
      </div>
    )
}



Search.propTypes = {
  // clearUsers: PropTypes.func.isRequired,
  // showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
}

export default Search;
