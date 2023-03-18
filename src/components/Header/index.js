import {Component} from 'react'

import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'
import {BsXCircleFill} from 'react-icons/bs'

import './index.css'

class Header extends Component {
  state = {display: false}

  showHeader = () => {
    this.setState({display: true})
  }

  hideHeader = () => {
    this.setState({display: false})
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/')
  }

  render() {
    const {display} = this.state
    console.log(display)

    return (
      <>
        <div className="header">
          <Link to="/" className="link">
            <div className="home-img">
              <img
                src="https://res.cloudinary.com/ds93sdubc/image/upload/v1678972202/Frame_274_v7vhfl.png"
                alt="website logo"
                className="logo"
              />
              <h1 className="login-head">Tasty Kitchens</h1>
            </div>
          </Link>
          <ul className="nav-list-items">
            <Link to="/" className="link">
              <li className="home-item">Home</li>
            </Link>
            <Link to="/cart" className="link">
              <l1 className="cart-item">Cart</l1>
            </Link>
            <div>
              <button
                type="button"
                className="logout-button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </div>
          </ul>
        </div>
        <div className="mobile-header">
          <Link to="/" className="link">
            <div className="home-img">
              <img
                src="https://res.cloudinary.com/ds93sdubc/image/upload/v1678972202/Frame_274_v7vhfl.png"
                alt="website logo"
                className="logo"
              />
              <h1 className="login-head">Tasty Kitchens</h1>
            </div>
          </Link>
          <GiHamburgerMenu size={35} onClick={this.showHeader} />
        </div>
        {display ? (
          <div className="menu-container">
            <ul className="menu-list-for-mobile">
              <Link to="/" className="link">
                <li className="home-item">Home</li>
              </Link>
              <Link to="/cart" className="link">
                <li className="cart-item">Cart</li>
              </Link>
              <div>
                <button
                  type="button"
                  className="logout-button"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </div>
            </ul>
            <BsXCircleFill size={25} onClick={this.hideHeader} />
          </div>
        ) : (
          ''
        )}
      </>
    )
  }
}

export default withRouter(Header)
