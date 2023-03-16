import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

// const sortByOptions = [
//   {
//     id: 0,
//     displayText: 'Highest',
//     value: 'Highest',
//   },
//   {
//     id: 2,
//     displayText: 'Lowest',
//     value: 'Lowest',
//   },
// ]

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={RestaurantDetails}
    />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <Route exact path="not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
