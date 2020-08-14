import React, { Component } from 'react'
import { Input } from 'baseui/input'
import { ALIGNMENT, BEHAVIOR, Grid, Cell } from 'baseui/layout-grid'
import { useStyletron } from 'baseui'
import { StatefulList } from 'baseui/dnd-list'
import { connect } from 'react-redux'
import { FormControl } from 'baseui/form-control'
import { RadioGroup, Radio, ALIGN } from 'baseui/radio'
import { Button } from 'baseui/button'
import { Heading, HeadingLevel } from 'baseui/heading'
import { Textarea } from 'baseui/textarea'
import { FormInput, FormCheckBox } from '../index'
import { Checkbox } from 'baseui/checkbox'

class OperationalForm extends Component {
  constructor (props) {
    super(props)
    this.state = this.props.form.operationalIndependence
  }

  componentWillUnmount () {
    this.props.onChange(this.state)
  }

  render () {
    return (
      <div>
        <Grid align={ALIGNMENT.center} behavior={BEHAVIOR.fluid} gridGaps={10} gridGutters={20} gridMargins={1}>
          <Cell span={12}>
            <Checkbox
              checked={this.state.share_equipment}
              onChange={(event) => { this.setState({ share_equipment: !this.state.share_equipment }) }}
            >
              Do you share equipment?
            </Checkbox>
          </Cell>
          <Cell span={6}>
            <FormInput
              label='Name'
              value={this.state.name_1}
              onChange={(event) => { this.setState({ name_1: event.currentTarget.value }) }}
            />
          </Cell>
          <Cell span={6}>
            <FormInput
              label='Relationship'
              value={this.state.relationship_1}
              onChange={(event) => { this.setState({ relationship_2: event.currentTarget.value }) }}
            />
          </Cell>
          <Cell span={6}>
            <FormInput
              label='Name'
              value={this.state.name_2}
              onChange={(event) => { this.setState({ name_2: event.currentTarget.value }) }}
            />
          </Cell>
          <Cell span={6}>
            <FormInput
              label='Relationship'
              value={this.state.relationship_2}
              onChange={(event) => { this.setState({ relationship_2: event.currentTarget.value }) }}
            />
          </Cell>
          <Cell span={6}>
            <FormInput
              label='Name'
              value={this.state.name_3}
              onChange={(event) => { this.setState({ name_3: event.currentTarget.value }) }}
            />
          </Cell>
          <Cell span={6}>
            <FormInput
              label='Relationship'
              value={this.state.relationship_}
              onChange={(event) => { this.setState({ relationship_3: event.currentTarget.value }) }}
            />
          </Cell>
          <Cell span={12}>
            <FormControl label='Grain Storage - Describe type and location(provide bin map)'>
              <Textarea
                value={this.state.grain_storage}
                onChange={event => this.setState({ grain_storage: event.currentTarget.value })}
              />
            </FormControl>
          </Cell>
          <Cell span={12}>
            <Checkbox
              checked={this.state.bin_share}
              onChange={(event) => { this.setState({ bin_share: !this.state.bin_share }) }}
            >
              Do you share bins?
            </Checkbox>
          </Cell>
          <Cell span={6}>
            <FormInput
              label='Name'
              value={this.state.name_4}
              onChange={(event) => { this.setState({ name_4: event.currentTarget.value }) }}
            />
          </Cell>
          <Cell span={6}>
            <FormInput
              label='Relationship'
              value={this.state.relationship_4}
              onChange={(event) => { this.setState({ relationship_4: event.currentTarget.value }) }}
            />
          </Cell>
          <Cell span={6}>
            <FormInput
              label='Name'
              value={this.state.name_5}
              onChange={(event) => { this.setState({ name_5: event.currentTarget.value }) }}
            />
          </Cell>
          <Cell span={6}>
            <FormInput
              label='Relationship'
              value={this.state.relationship_5}
              onChange={(event) => { this.setState({ relationship_5: event.currentTarget.value }) }}
            />
          </Cell>
          <Cell span={12}>
            <FormControl label='Explain cirumstances where grain may be mixed with another producer. Discussion'>
              <Textarea
                value={this.state.explain_circumstances}
                onChange={event => this.setState({ explain_circumstances: event.currentTarget.value })}
              />
            </FormControl>
          </Cell>
          <Cell span={6}>
            <Checkbox
              checked={this.state.custom_farm_operation}
              onChange={(event) => { this.setState({ custom_farm_operation: !this.state.custom_farm_operation }) }}
            >
              Are you involed in a custom farm operation?
            </Checkbox>
          </Cell>
          <Cell span={6}>
            <Checkbox
              checked={this.state.labour_paid}
              onChange={(event) => { this.setState({ labour_paid: !this.state.labour_paid }) }}
            >
              Is labour for with production?
            </Checkbox>
          </Cell>
          <Cell span={6}>
            <FormInput
              label='Name'
              value={this.state.name_6}
              onChange={(event) => { this.setState({ name_6: event.currentTarget.value }) }}
            />
          </Cell>
          <Cell span={6}>
            <FormInput
              label='Relationship'
              value={this.state.relationship_6}
              onChange={(event) => { this.setState({ relationship_6: event.currentTarget.value }) }}
            />
          </Cell>
        </Grid>
      </div>
    )
  }
}
const mapStateToProps = state => state
const dispatchToProps = dispatch => ({ dispatch })
export default connect(mapStateToProps, dispatchToProps)(OperationalForm)
