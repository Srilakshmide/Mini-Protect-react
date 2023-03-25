// import {Component} from 'react'

// import {withRouter, Link} from 'react-router-dom'
// import Cookies from 'js-cookie'

// import {GiHamburgerMenu} from 'react-icons/gi'
// import {BsXCircleFill} from 'react-icons/bs'

// import './index.css'

// class Header extends Component {
//   state = {display: false}

//   showHeader = () => {
//     this.setState({display: true})
//   }

//   hideHeader = () => {
//     this.setState({display: false})
//   }

//   onClickLogout = () => {
//     const {history} = this.props
//     Cookies.remove('jwt_token')
//     history.replace('/')
//   }

//   render() {
//     const {display} = this.state
//     console.log(display)

//     return (
//       <>
//         <div className="header">
//           <Link to="/" className="link">
//             <div className="home-img">
//               <img
//                 src="https://res.cloudinary.com/ds93sdubc/image/upload/v1678972202/Frame_274_v7vhfl.png"
//                 alt="website logo"
//                 className="logo"
//               />
//               <h1 className="login-head">Tasty Kitchens</h1>
//             </div>
//           </Link>
//           <ul className="nav-list-items">
//             <Link to="/" className="link">
//               <li className="home-item">Home</li>
//             </Link>
//             <Link to="/cart" className="link">
//               <l1 className="cart-item">Cart</l1>
//             </Link>
//             <div>
//               <button
//                 type="button"
//                 className="logout-button"
//                 onClick={this.onClickLogout}
//               >
//                 Logout
//               </button>
//             </div>
//           </ul>
//         </div>
//         <div className="mobile-header">
//           <Link to="/" className="link">
//             <div className="home-img">
//               <img
//                 src="https://res.cloudinary.com/ds93sdubc/image/upload/v1678972202/Frame_274_v7vhfl.png"
//                 alt="website logo"
//                 className="logo"
//               />
//               <h1 className="login-head">Tasty Kitchens</h1>
//             </div>
//           </Link>
//           <GiHamburgerMenu size={35} onClick={this.showHeader} />
//         </div>
//         {display ? (
//           <div className="menu-container">
//             <ul className="menu-list-for-mobile">
//               <Link to="/" className="link">
//                 <li className="home-item">Home</li>
//               </Link>
//               <Link to="/cart" className="link">
//                 <li className="cart-item">Cart</li>
//               </Link>
//               <div>
//                 <button
//                   type="button"
//                   className="logout-button"
//                   onClick={this.onClickLogout}
//                 >
//                   Logout
//                 </button>
//               </div>
//             </ul>
//             <BsXCircleFill size={25} onClick={this.hideHeader} />
//           </div>
//         ) : (
//           ''
//         )}
//       </>
//     )
//   }
// }

// export default withRouter(Header)

import {Link, withRouter} from 'react-router-dom'

import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineCloseCircle} from 'react-icons/ai'

import Cookies from 'js-cookie'

import Popup from 'reactjs-popup'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props

    history.replace('/login')
  }

  const getColor = current => {
    const {history} = props
    if (history.location.pathname === current) {
      // console.log(history.location.pathname)
      return '#f7931e'
    }
    return '#334155'
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length
        console.log(cartList)

        return (
          <>
            {cartItemsCount > 0 && (
              <span className="cart-count-badge">{cartList.length}</span>
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <nav className="nav-header">
      <div className="nav-bar-large-container">
        <div className="icon-container">
          <Link to="/" className="nav-link">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dkobk5oao/image/upload/v1633608363/Frame_274_mqin4h.png"
              alt="website logo"
            />
          </Link>
          <h1 className="icon-heading">Tasty Kitchen</h1>
        </div>

        <ul className="nav-menu">
          <Link to="/" className="nav-link">
            <li className="nav-menu-item" style={{color: getColor('/')}}>
              Home
            </li>
          </Link>

          <Link to="/cart" className="nav-link">
            <li className="nav-menu-item" style={{color: getColor('/cart')}}>
              Cart
              {renderCartItemsCount()}
            </li>
          </Link>
          <li>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
        <Popup
          trigger={
            <button type="button" className="hamburger-btn">
              <GiHamburgerMenu size={25} className="hamburger" />
            </button>
          }
        >
          {close => (
            <div className="modal-container">
              <div className="nav-link-container">
                <Link to="/" className="nav-link">
                  <p className="nav-menu-item" style={{color: getColor('/')}}>
                    Home
                  </p>
                </Link>
                <Link to="/cart" className="nav-link">
                  <p
                    className="nav-menu-item"
                    style={{color: getColor('/cart')}}
                  >
                    Cart
                    {renderCartItemsCount()}
                  </p>
                </Link>
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
              <button type="button" className="close-btn">
                <AiOutlineCloseCircle size={18} onClick={() => close()} />
              </button>
            </div>
          )}
        </Popup>
      </div>
    </nav>
  )
}

export default withRouter(Header)
