// import {Component} from 'react'
// import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'

// import './index.css'

// class Login extends Component {
//   state = {
//     username: '',
//     password: '',
//     isShowPassword: false,
//     showErrorMsg: false,
//     errorMsg: '',
//   }

//   onChangeUsername = event => {
//     this.setState({username: event.target.value})
//   }

//   onChangePassword = event => {
//     this.setState({password: event.target.value})
//   }

//   showHidePassword = () => {
//     this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
//   }

//   loginSuccess = jwtToken => {
//     const {history} = this.props
//     Cookies.set('jwt_token', jwtToken, {expires: 30})
//     history.replace('/')
//   }

//   failedLogin = errorMsg => {
//     this.setState({showErrorMsg: true, errorMsg})
//   }

//   onSubmitLoginForm = async event => {
//     event.preventDefault()
//     const apiUrl = 'https://apis.ccbp.in/login'
//     const {username, password} = this.state
//     const userDetails = {username, password}
//     const options = {
//       method: 'POST',
//       body: JSON.stringify(userDetails),
//     }
//     const response = await fetch(apiUrl, options)
//     const data = await response.json()
//     if (response.ok === true) {
//       this.loginSuccess(data.jwt_token)
//     } else {
//       this.failedLogin(data.error_msg)
//     }
//   }

//   render() {
//     const jwtToken = Cookies.get('jwt_token')
//     if (jwtToken !== undefined) {
//       return <Redirect to="/" />
//     }

//     const {username, password, showErrorMsg, errorMsg} = this.state

//     return (
//       <>
//         <div className="bg-container">
//           <img
//             src="https://res.cloudinary.com/ddgvegjgk/image/upload/v1635315803/tastykitchens/Rectangle_1457_noyo6j.png"
//             alt="website login"
//             className="login-img"
//           />
//           <div className="login-container">
//             <div className="main-container">
//               <img
//                 src="https://res.cloudinary.com/ds93sdubc/image/upload/v1678972202/Frame_274_v7vhfl.png"
//                 alt="website logo"
//                 className="logo"
//               />
//               <h1 className="login-head">Tasty Kitchens</h1>
//               <h1 className="login">Login</h1>
//               <form onSubmit={this.onSubmitLoginForm}>
//                 <label className="label" htmlFor="UserName">
//                   USERNAME
//                 </label>
//                 <input
//                   type="text"
//                   className="input"
//                   id="UserName"
//                   placeholder="Username"
//                   value={username}
//                   onChange={this.onChangeUsername}
//                 />
//                 <label className="label" htmlFor="Password">
//                   PASSWORD
//                 </label>
//                 <input
//                   type="password"
//                   id="Password"
//                   placeholder="Password"
//                   className="input"
//                   value={password}
//                   onChange={this.onChangePassword}
//                 />
//                 {showErrorMsg ? <p className="error">*{errorMsg}</p> : ''}
//                 <button type="submit" className="submit-btn">
//                   Login
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//         <div className="mobile-container">
//           <div className="img-container">
//             <h1 className="login-mob">Login</h1>
//             <img
//               src="https://res.cloudinary.com/ds93sdubc/image/upload/v1678975557/Rectangle_1457_vcy86r.png"
//               alt="website login"
//               className="login-img-mobile"
//             />
//           </div>
//           <form className="form-container" onSubmit={this.onSubmitLoginForm}>
//             <label className="label" htmlFor="UserName">
//               USERNAME
//             </label>
//             <input
//               type="text"
//               className="input-mob"
//               id="UserName"
//               placeholder="Username"
//               value={username}
//               onChange={this.onChangeUsername}
//             />
//             <label className="label" htmlFor="Password">
//               PASSWORD
//             </label>
//             <input
//               type="password"
//               id="Password"
//               placeholder="Password"
//               className="input-mob"
//               value={password}
//               onChange={this.onChangePassword}
//             />
//             {showErrorMsg ? <p className="error">*{errorMsg}</p> : ''}
//             <button type="submit" className="submit-btn-mob">
//               Login
//             </button>
//           </form>
//         </div>
//       </>
//     )
//   }
// }

// export default Login

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/dkobk5oao/image/upload/v1633587041/Rectangle_1457_xkvsxy.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <div className="login-container">
          <form className="form-container" onSubmit={this.submitForm}>
            <img
              src="https://res.cloudinary.com/dkobk5oao/image/upload/v1633608363/Frame_274_mqin4h.png"
              className="login-website-logo-desktop-image"
              alt="website logo"
            />
            <h1 className="logo-heading">Tasty Kitchens</h1>
            <h1 className="login-heading">Login</h1>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/dkobk5oao/image/upload/v1633529531/Rectangle_1456_t19ink.png"
          className="login-image"
          alt="website login"
        />
      </div>
    )
  }
}

export default Login
