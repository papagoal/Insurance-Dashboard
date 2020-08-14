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
import { NavLink } from 'react-router-dom'
import { FormInput, FormCheckBox } from '../index'
import { Checkbox } from 'baseui/checkbox'

class FinancialForm extends Component {
  constructor (props) {
    super(props)
    this.state = this.props.form.financialIndependenceForm
  }

  componentWillUnmount () {
    this.props.onChange(this.state);
  }

  render () {
    return (
      <div>
        <Grid align={ALIGNMENT.center} behavior={BEHAVIOR.fluid} gridGaps={10} gridGutters={20} gridMargins={1}>
          <Cell span={12}>
            <FormControl label='Who buys seed and fertilzer for this farm operation?'>
              <Textarea
                value={this.state.who_buys_text}
                onChange={event => this.setState({ who_buys_text: event.currentTarget.value })}
              />
            </FormControl>
          </Cell>
          <Cell span={6}>
            <FormControl label='Where are accounts set up for the inputs'>
              <Textarea
                value={this.state.where_accounts_text}
                onChange={event => this.setState({ where_accounts_text: event.currentTarget.value })}
              />
            </FormControl>
          </Cell>
          <Cell span={6}>
            <Checkbox
              checked={this.state.provide_receipts}
              onChange={(event) => { this.setState({ provide_receipts: !this.state.provide_receipts }) }}
            >
              Can you provide receipts for inputs if needed?
            </Checkbox>
          </Cell>
          <Cell span={12}>
            <FormControl label='Who claims income and expense for this farm operation?'>
              <Textarea
                value={this.state.where_accounts_text}
                onChange={event => this.setState({ where_accounts_text: event.currentTarget.value })}
              />
            </FormControl>
          </Cell>
          <Cell span={12}>
            <FormControl label='Who absorbs the farming loss if there is one?'>
              <Textarea
                value={this.state.who_claims_text}
                onChange={event => this.setState({ who_claims_text: event.currentTarget.value })}
              />
            </FormControl>
          </Cell>
          <Cell span={6}>
            <FormInput
              label='What name is your farm income tax return filed under?'
              value={this.state.who_absorbs_text}
              onChange={(event) => { this.setState({ who_absorbs_text: event.currentTarget.value }) }}
            />
          </Cell>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => state
const dispatchToProps = dispatch => ({ dispatch })
export default connect(mapStateToProps, dispatchToProps)(FinancialForm)
