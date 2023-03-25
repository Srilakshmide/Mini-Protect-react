// import {Link} from 'react-router-dom'

// import './index.css'

// const notFoundUrl =
//   'https://res.cloudinary.com/dppqkea7f/image/upload/v1625830262/NotFound_kpncbm.png'
// const NotFound = () => {
//   /* const navigateToHome = () => {
//     const {history} = props
//     history.replace('/')
//   } */

//   console.log(null)
//   return (
//     <div className="BackgroundContainer">
//       <div className="NotFoundContainer">
//         <img src={notFoundUrl} alt="not found" />
//         <h1 className="Heading">Page Not Found</h1>
//         <p className="Para">
//           we are sorry, the page you requested could not be found. <br />
//           Please go back to the homepage
//         </p>
//         <Link to="/" style={{textDecoration: 'none'}}>
//           <button type="button" className="Button">
//             Home Page
//           </button>
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default NotFound

import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dkobk5oao/image/upload/v1633714179/erroring_1_arx7dt.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-text">
        we are sorry, the page you requested could not be found <br /> Please go
        back to the homepage
      </p>
      <Link to="/">
        <button type="button" className="home-btn">
          Home Page
        </button>
      </Link>
    </div>
  </>
)

export default NotFound
