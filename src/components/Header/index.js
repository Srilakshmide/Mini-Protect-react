import {useState} from 'react'

import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'
import {BsXCircleFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const [open, setOpen] = useState(false)

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/')
  }

  const onClickOpen = (
    <GiHamburgerMenu size="35px" onClick={() => setOpen(!open)} />
  )

  const closeIcon = <BsXCircleFill size="35px" onClick={() => setOpen(!open)} />

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
          <Link to="/" className="nav-link-item">
            <li className="home-item">Home</li>
          </Link>
          <Link to="/cart" className="nav-link-item">
            <l1 className="cart-item">Cart</l1>
          </Link>
          <div>
            <button
              type="button"
              className="logout-button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </ul>
      </div>
      <div className="nav-for-mobile">
        <Link to="/" className="nav-link-item">
          <div className="home-img">
            <img
              src="https://res.cloudinary.com/ds93sdubc/image/upload/v1678972202/Frame_274_v7vhfl.png"
              alt="website logo"
              className="logo"
            />
            <h1 className="login-head">Tasty Kitchens</h1>
          </div>
        </Link>
        <nav>
          {open ? closeIcon : onClickOpen}
          {open && (
            <>
              <ul className="nav-list-for-mobile">
                <Link to="/" className="nav-link-item">
                  <li className="home-item">Home</li>
                </Link>
                <Link to="/cart" className="nav-link-item">
                  <li className="cart-item">Cart</li>
                </Link>
                <div>
                  <button
                    type="button"
                    className="logout-button"
                    onClick={onClickLogout}
                  >
                    Logout
                  </button>
                </div>
                <BsXCircleFill size={35} onClick={closeIcon} />
              </ul>
            </>
          )}
        </nav>
      </div>
    </>
  )
}

export default withRouter(Header)
