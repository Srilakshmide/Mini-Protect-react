// import {Component} from 'react'

// import './index.css'

// class Counter extends Component {
//   render() {
//     return (
//       <div>
//         <button type="button" onClick={this.onDecrement}>
//           -
//         </button>
//         <div>0</div>
//         <button type="button" onClick={this.onIncrement}>
//           +
//         </button>
//       </div>
//     )
//   }
// }

// export default Counter

import {Component} from 'react'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

import './index.css'

// variables for pages

const totalPages = 4
const Page = 1

class Counter extends Component {
  state = {currentPage: Page}

  // onclick event increment function for change the pages

  onIncrement = () => {
    const {pageChangeFunction} = this.props
    const {currentPage} = this.state
    if (currentPage < totalPages) {
      this.setState(
        pre => ({currentPage: pre.currentPage + 1}),
        pageChangeFunction(currentPage + 1),
      )
    }
  }

  // onclick event decrement function for change the pages

  onDecrement = () => {
    const {pageChangeFunction} = this.props
    const {currentPage} = this.state
    if (currentPage > 1) {
      this.setState(
        pre => ({currentPage: pre.currentPage - 1}),
        pageChangeFunction(currentPage - 1),
      )
    }
  }

  render() {
    const {currentPage} = this.state
    return (
      <div className="counter-class">
        <button
          type="button"
          onClick={this.onDecrement}
          className="btn"
          data-testid="pagination-left-button"
        >
          <IoIosArrowBack className="icon-class" />
        </button>
        <div className="pages-class">
          <span data-testid="active-page-number">{currentPage}</span> of{' '}
          {totalPages}
        </div>
        <button
          type="button"
          onClick={this.onIncrement}
          className="btn"
          data-testid="pagination-right-button"
        >
          <IoIosArrowForward className="icon-class" />
        </button>
      </div>
    )
  }
}

export default Counter
