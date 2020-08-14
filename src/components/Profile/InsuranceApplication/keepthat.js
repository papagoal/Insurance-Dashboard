import React, { Component } from 'react'
// import { Button } from 'baseui/button'
import { connect } from 'react-redux'
import { updateName } from '../../../reducers/profileReducer'
import { Input } from 'baseui/input'


export class BasicInformForm extends Component {
  render () {
    return (
      <div>
        This the basic form
        <br />
        Name: {this.props.profile.contract_name}
        <button onClick={() => this.props.dispatch(updateName('Dan'))}>Hello</button>
        <br />
      </div>
    )
  }
}

const mapStateToProps = state => state
const dispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, dispatchToProps)(BasicInformForm)
