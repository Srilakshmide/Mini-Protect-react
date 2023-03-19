import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsFilterLeft} from 'react-icons/bs'
import {AiOutlineSearch} from 'react-icons/ai'

import Slider from 'react-slick'

import ListItem from '../ListItem'
import Header from '../Header'
import Counter from '../Counter'
import Footer from '../Footer'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const limit = 9

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    isLoading: false,
    searchInput: '',
    activePage: 1,
    carouselData: [],
    activeOptionId: sortByOptions[1].value,
    carouselApiStatus: apiStatus.initial,
    restaurantApi: apiStatus.initial,
    allRestaurants: [],
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.getCarouselData()
    this.getAllRestaurantsData()
  }

  convertRestaurantObjects = object => {
    const converted = {
      costForTwo: object.cost_for_two,
      cuisine: object.cuisine,
      groupByTime: object.group_by_time,
      hasOnlineDelivery: object.has_online_delivery,
      hasTableBooking: object.has_table_booking,
      id: object.id,
      imageUrl: object.image_url,
      isDeliveringNow: object.is_delivering_now,
      location: object.location,
      menuType: object.menu_type,
      name: object.name,
      opensAt: object.opens_at,
      userRating: {
        rating: object.user_rating.rating,
        ratingColor: object.user_rating.rating_color,
        ratingText: object.user_rating.rating_text,
        totalReviews: object.user_rating.total_reviews,
      },
    }
    return converted
  }

  getCarouselData = async () => {
    this.setState({carouselApiStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      this.setState({
        carouselApiStatus: apiStatus.success,
        carouselData: data.offers,
      })
    }
  }

  getActivePage = page => {
    window.scrollTo(500, 500)
    this.setState({activePage: page}, this.getAllRestaurantsData)
  }

  getAllRestaurantsData = async () => {
    this.setState({
      restaurantApi: apiStatus.inProgress,
    })
    const {activeOptionId, activePage, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const offset = (activePage - 1) * limit
    // console.log(offset)

    const restaurantsApiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantsApiUrl, options)
    // console.log(response.status)

    if (response.ok === true) {
      const data = await response.json()
      // console.log(response)
      const {restaurants} = data
      // console.log(restaurants)
      const convertedRestaurants = restaurants.map(each =>
        this.convertRestaurantObjects(each),
      )
      // console.log(convertedRestaurants)
      this.setState({
        restaurantApi: apiStatus.success,
        allRestaurants: convertedRestaurants,
        isLoading: true,
      })
    } else if (response.ok === false) {
      this.setState({
        restaurantApi: apiStatus.failure,
      })
    }
  }

  displayCarouselImages = () => {
    const {carouselData} = this.state
    //  console.log(carouselData)

    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 700,
      infinite: true,
      dotsClass: 'slick-dots',
      autoplay: true,
      autoplaySpeed: 3000,
      adaptiveHeight: true,
    }
    return (
      <div className="SliderContainer">
        <Slider {...settings}>
          {carouselData.map(each => (
            <img
              src={each.image_url}
              alt="offer"
              key="carousel-image"
              className="CarouselImage"
            />
          ))}
        </Slider>
      </div>
    )
  }

  carouselDisplayLoading = () => (
    <div className="Loader" data-testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  restaurantsDisplayLoading = () => (
    <div className="Loader" data-testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  changeTheSortByOptionValue = event => {
    this.setState(
      {activeOptionId: event.target.value},
      this.getAllRestaurantsData,
    )
  }

  onSearchRestaurant = event => {
    this.setState({searchInput: event.target.value}, this.getAllRestaurantsData)
  }

  popularRestaurantsView = () => {
    const {activeOptionId} = this.state
    // console.log(selectedSortValue)
    return (
      <>
        <div className="popularRestaurantsContainer">
          <div className="HeadingContainer">
            <h1 className="MainHeading">Popular Restaurants</h1>
            <p className="MainParagraph">
              Select Your favorite restaurant special dish and make your day
              happy...
            </p>
          </div>
          <div className="SearchInputContainer">
            <label className="SearchLabel" htmlFor="searchInput">
              Search The Restaurant
            </label>
            <div className="searchIconContainer">
              <AiOutlineSearch size={30} color="#ada0df" />
              <input
                type="search"
                id="searchInput"
                className="SearchElement"
                onChange={this.onSearchRestaurant}
                placeholder="Search"
              />
            </div>
          </div>

          <div className="FilterContainer">
            <BsFilterLeft size={35} color="#475569" />
            <p className="SortLabel">Sort By</p>
            <select
              id="sortBy"
              onChange={this.changeTheSortByOptionValue}
              value={activeOptionId}
              className="SelectElement"
            >
              {sortByOptions.map(eachOption => (
                <option key={eachOption.id}>{eachOption.displayText}</option>
              ))}
            </select>
          </div>
        </div>
        <hr />
      </>
    )
  }

  renderRestaurantsView = () => {
    const {allRestaurants, showNoRes} = this.state
    // console.log(allRestaurants)
    return (
      <>
        {showNoRes ? (
          <p>No Restaurants Found</p>
        ) : (
          <ul className="RestaurantList">
            {allRestaurants.map(each => (
              <ListItem key={each.id} item={each} />
            ))}
          </ul>
        )}
      </>
    )
  }

  noRestaurantsView = () => (
    <div className="NoResContainer">
      <p className="NoResPara">No Restaurants Found!</p>
    </div>
  )

  onRenderDisplayCarousel = () => {
    const {carouselApiStatus} = this.state

    switch (carouselApiStatus) {
      case apiStatus.success:
        return this.displayCarouselImages()

      case apiStatus.inProgress:
        return this.carouselDisplayLoading()

      default:
        return null
    }
  }

  onRenderDisplayRestaurants = () => {
    const {restaurantApi} = this.state

    switch (restaurantApi) {
      case apiStatus.success:
        return this.renderRestaurantsView()
      case apiStatus.inProgress:
        return this.restaurantsDisplayLoading()
      case apiStatus.failure:
        return this.noRestaurantsView()
      default:
        return null
    }
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="HomeContainer">
          <div className="MainContainer">
            {this.onRenderDisplayCarousel()}
            {this.popularRestaurantsView()}
            {this.onRenderDisplayRestaurants()}
            <Counter pageChangeFunction={this.getActivePage} />
          </div>
          {isLoading && <Footer />}
        </div>
      </>
    )
  }
}

export default Home
