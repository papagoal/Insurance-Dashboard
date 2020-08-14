import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const Callback = props => {
  useEffect(() => {
    props.history.replace('/')
  }, [])

  return (<span>Loading...</span>)
}

export default withRouter(Callback)
