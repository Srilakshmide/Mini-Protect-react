import './index.css'

const NotFound = props => {
  const onAdd = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <h1 className="Heading">Not Found</h1>
      <button type="button" onClick={onAdd}>
        Return
      </button>
    </div>
  )
}

export default NotFound
