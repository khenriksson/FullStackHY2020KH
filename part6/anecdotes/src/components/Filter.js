import React from 'react'
import { filterAction } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    event.preventDefault()
    const filter = event.target.value

    props.filterAction(filter)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterAction,
}

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log('MAP STATE TO PROPS', state)
  console.log('MAP STATE TO ANECODTES', state.anecdotes)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default ConnectedFilter
