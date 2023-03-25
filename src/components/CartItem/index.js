// import {Component} from 'react'

// import {BiRupee} from 'react-icons/bi'
// import {HiOutlineMinusSm} from 'react-icons/hi'
// import {BsPlus} from 'react-icons/bs'

// import './index.css'

// class CartItem extends Component {
//   increment = () => {
//     const {eachCartItem, incrementQuantity} = this.props
//     incrementQuantity(eachCartItem.id)
//   }

//   decrement = () => {
//     const {eachCartItem, decrementQuantity} = this.props
//     decrementQuantity(eachCartItem.id)
//   }

//   render() {
//     const {eachCartItem} = this.props
//     // console.log(eachCartItem)
//     const price = eachCartItem.cost * eachCartItem.quantity
//     console.log(price)
//     return (
//       <li>
//         <div data-testid="cartItem" className="CartListItem">
//           <img
//             src={eachCartItem.imageUrl}
//             alt="cart-item"
//             className="ItemImage"
//           />
//           <div className="CartNameDetailsContainer">
//             <h1 className="CartItemName">{eachCartItem.name}</h1>
//             <div className="each-item-counter-container">
//               <button
//                 data-testid="decrement-quantity"
//                 type="button"
//                 className="minus-icon-container"
//                 onClick={this.decrement}
//               >
//                 <HiOutlineMinusSm className="minus-icon" />
//               </button>
//               <p data-testid="item-quantity" className="count-value">
//                 {eachCartItem.quantity}
//               </p>
//               <button
//                 data-testid="increment-quantity"
//                 type="button"
//                 className="plus-icon-container"
//                 onClick={this.increment}
//               >
//                 <BsPlus className="plus-icon" />
//               </button>
//             </div>
//             <div className="ItemRateContainer">
//               <BiRupee className="ItemRupee" />
//               <p className="ItemCost">{eachCartItem.cost}</p>
//             </div>
//           </div>
//         </div>
//       </li>
//     )
//   }
// }

// export default CartItem

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {FaRupeeSign} from 'react-icons/fa'
import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {incrementCartItemQuantity, decrementCartItemQuantity} = value
      const {cartItem} = props
      const {id, name, quantity, cost, imageUrl} = cartItem

      const decreaseQuantity = () => {
        decrementCartItemQuantity(id)
      }

      const increaseQuantity = () => {
        incrementCartItemQuantity(id)
      }

      return (
        <li className="cart-item" data-testid="cartItem">
          <div className="cart-item-info" data-testid="cartItem">
            <img src={imageUrl} alt={name} className="cart-item-image" />
            <h1 className="cart-item-desktop-name">{name}</h1>
          </div>
          <div className="cart-qty-price-cont" data-testid="cartItem">
            <h1 className="cart-item-mobile-name">{name}</h1>
            <div className="cart-qty-container">
              <button
                className="decrement-quantity"
                type="button"
                onClick={decreaseQuantity}
                data-testid="decrement-quantity"
              >
                <BsDashSquare size={16} />
              </button>
              <p data-testid="item-quantity" className="item-quantity">
                {quantity}
              </p>
              <button
                className="increment-quantity"
                type="button"
                onClick={increaseQuantity}
                data-testid="increment-quantity"
              >
                <BsPlusSquare size={16} />
              </button>
            </div>
            <p className="price" data-testid="total-price">
              <FaRupeeSign size={12} /> {cost * quantity}
            </p>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
