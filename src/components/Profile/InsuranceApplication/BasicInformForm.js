import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ALIGNMENT, BEHAVIOR, Cell, Grid } from 'baseui/layout-grid'
import { FormInput, FormCheckBox } from '../index'

export class BasicInformation extends Component {
  constructor (props) {
    super(props)
    this.state = this.props.form.basicInformation
  }

  componentWillUnmount () {
    this.props.onChange(this.state)
  }

  render () {
    return (<Grid align={ALIGNMENT.center} behavior={BEHAVIOR.fluid} gridGaps={10} gridGutters={20} gridMargins={1}>
      <Cell span={4}>
        <FormInput
          label='Home Quarter'
          value={this.state.home_quarter}
          onChange={(event) => {
            this.setState({ home_quarter: event.currentTarget.value })
          }}
        />
      </Cell>
      <Cell span={4}>
        <FormInput
          label='Home RN'
          value={this.state.home_rn}
          onChange={(event) => {
            this.setState({home_rn:event.currentTarget.value})
          }}
        />
      </Cell>
      <Cell span={4}>
        <FormInput
          label = {"Application Type"}
          value = {this.state.application_type}
          onChange ={(event)=>{
            this.setState({application_type:event.currentTarget.value})
          }}
        />
      </Cell>
      <Cell span={12}>
        <FormInput
          label = {"Contact Name"}
          value = {this.state.name}
          onChange ={(event)=>{
            this.setState({name:event.currentTarget.value})
          }}
        />
      </Cell>
      <Cell span={12}>
        <FormInput
          label={"Address"}
          value = {this.state.address}
          onChange ={(event)=>{
            this.setState({address:event.currentTarget.value})
          }}
        />
      </Cell>
      <Cell span={8}>
        <FormInput
          label={"Alternate Address"}
          value = {this.state.alternate_address}
          onChange ={(event)=>{
            this.setState({alternate_address:event.currentTarget.value})
          }}
        />
      </Cell>
      <Cell span={4}>
        <FormInput
          label={"Home Phone Number"}
          value = {this.state.home_phone}
          onChange ={(event)=>{
            this.setState({home_phone:event.currentTarget.value})
          }}
        />
      </Cell>
      <Cell span={4}>
        <FormInput
          label={"Alternate Phone Number"}
          value = {this.state.alternate_phone}
          onChange ={(event)=>{
            this.setState({alternate_phone:event.currentTarget.value})
          }}
        />
      </Cell>
      <Cell span={4}>
        <FormInput
          label={"Description"}
          value = {this.state.description}
          onChange ={(event)=>{
            this.setState({description:event.currentTarget.value})
          }}
        />
      </Cell>
      <Cell span={4}>
        <FormInput
          label={"Cell Number"}
          value = {this.state.cell_number}
          onChange ={(event)=>{
            this.setState({cell_number:event.currentTarget.value})
          }}
        />
      </Cell>
      <Cell span={4}>
        <FormInput
          label={"Fax Number"}
          value = {this.state.fax_number}
          onChange ={(event)=>{
            this.setState({fax_number:event.currentTarget.value})
          }}
        />
      </Cell>
      <Cell span={4}>
        <FormInput
          label={"Email Address"}
          value = {this.state.email_address}
          onChange ={(event)=>{
            this.setState({email_address:event.currentTarget.value})
          }}
        />
      </Cell>
      <Cell span={4}>
        <FormInput
          label={"SIN"}
          value = {this.state.sin}
          onChange ={(event)=>{
            this.setState({sin:event.currentTarget.value})
          }}
        />
      </Cell>
      <Cell span={4}>
        <FormInput
          label={"Business Number"}
          value = {this.state.business_number}
          onChange ={(event)=>{
            this.setState({business_number:event.currentTarget.value})
          }}
        />
      </Cell>
      <Cell span={4}>
        <FormCheckBox
          checked={this.state.direct_deposit}
          onChange={(event)=>{this.setState({direct_deposit:!this.state.direct_deposit})}}
          text = {"Direct Deposit form attached?"}
        />
      </Cell>
      <Cell span={4}>
        <FormCheckBox
          checked={this.state.release_of_info}
          onChange={(event)=>{this.setState({release_of_info:!this.state.release_of_info})}}
          text="Release of Info attached?"
        />
      </Cell>
    </Grid>);
  }
}

const mapStateToProps = state => state
const dispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps,dispatchToProps)(BasicInformation)