import * as React from 'react'
import { Input } from 'baseui/input'
import { ALIGNMENT, BEHAVIOR, Grid, Cell } from 'baseui/layout-grid'
import { useStyletron } from 'baseui'
import { StatefulList } from 'baseui/dnd-list'
import { FormControl } from "baseui/form-control"
import { RadioGroup, Radio, ALIGN } from "baseui/radio"
import { Button } from "baseui/button"
import { Heading, HeadingLevel } from 'baseui/heading'
import { connect } from 'react-redux'
import { Textarea } from 'baseui/textarea'
import { PhoneInput } from 'baseui/phone-input'
import { Checkbox } from 'baseui/checkbox'
import {
  updateHomeQuarter,
  updateHomeRun,
  updateApplicationType,
  updateContractName,
  updateAlternateAddress,
  updateHomePhone,
  updateAlternatePhone
} from '../../../reducers/profileReducer'
import { Select } from 'baseui/select'

class BasicInformForm_2 extends React.Component {
  render () {
    return (
      <div>
        <Grid align={ALIGNMENT.center} behavior={BEHAVIOR.fluid} gridGaps={10} gridGutters={20} gridMargins={1}>
          <Cell span={2}>
            <p>Home Quarter</p>
          </Cell>
          <Cell span={2}>
            <Input
              value={this.props.profile.basicForm.home_quarter}
              // onChange={event => this.setState({ home_quarter: event.currentTarget.value })}
              onChange={event => this.props.dispatch(updateHomeQuarter(event.currentTarget.value))}
              placeholder='Home Quarter'
            />
          </Cell>
          <Cell span={2}>
            <p>Home Run</p>
          </Cell>
          <Cell span={2}>
            <Input
              value={this.props.profile.basicForm.home_run}
              onChange={event => this.props.dispatch(updateHomeRun(event.currentTarget.value))}
              placeholder='Home Run'
            />
          </Cell>
          <Cell span={2}>
            <p>Application Type</p>
          </Cell>
          <Cell span={2}>
            <Select
              options={[
                { label: 'Individual', id: 'Individual' },
                { label: 'Joint Venture', id: 'Joint Venture' },
                { label: 'partnership', id: 'partnership' },
                { label: 'Ltd Company', id: 'Ltd Company' },
                { label: 'Cooperative', id: 'Cooperative' }
              ]}
              // value={this.props.profile.basicForm.application_type}
              // onChange={event => this.props.dispatch(updateApplicationType(event.currentTarget.value))}
              // placeholder='Application Type'
            />
          </Cell>
          <Cell span={1}>
            <p>Contract name</p>
          </Cell>
          <Cell span={11}>
            <Input
              value={this.props.profile.basicForm.contract_name}
              onChange={event => this.props.dispatch(updateContractName(event.currentTarget.value))}
              placeholder='Contract Name'
            />
          </Cell>
          <Cell span={1}>
            <p>Alternate Address</p>
          </Cell>
          <Cell span={7}>
            <Input
              value={this.props.profile.basicForm.alternate_address}
              onChange={event => this.props.dispatch(updateAlternateAddress(event.currentTarget.value))}
              placeholder='Alternate Address'
            />
          </Cell>
          <Cell span={1}>
            <p>Home Phone Number</p>
          </Cell>
          <Cell span={3}>
            <PhoneInput
              text={this.props.profile.basicForm.home_phone}
              onTextChange={event => this.props.dispatch(updateHomePhone(event.currentTarget.value))}
              placeholder='Home Phone Number'
            />
          </Cell>
          <Cell span={1}>
            <p>Alternate Phone Number</p>
          </Cell>
          <Cell span={3}>
            <PhoneInput
              text={this.props.profile.basicForm.alternate_phone}
              onTextChange={event => this.props.dispatch(updateAlternatePhone(event.currentTarget.value))}
              placeholder='Alternate Phone Number'
            />
          </Cell>
          <Cell span={1}>
            <p>Description</p>
          </Cell>
          <Cell span={3}>
            <Input
              placeholder='Description'
            />
          </Cell>
          <Cell span={1}>
            <p>Cell Number</p>
          </Cell>
          <Cell span={3}>
            <Input
              placeholder='Cell Number'
            />
          </Cell>
          <Cell span={1}>
            <p>Fax Number</p>
          </Cell>
          <Cell span={3}>
            <Input
              placeholder='Fax Number'
            />
          </Cell>
          <Cell span={1}>
            <p>Email Address</p>
          </Cell>
          <Cell span={3}>
            <Input
              placeholder='Email Address'
            />
          </Cell>
          <Cell span={1}>
            <p>SIN.</p>
          </Cell>
          <Cell span={3}>
            <Input
              placeholder='SIN.'
            />
          </Cell>
          <Cell span={1}>
            <p>Business Number</p>
          </Cell>
          <Cell span={3}>
            <Input
              placeholder='Business Number'
            />
          </Cell>
          <Cell span={4}>
            <FormControl
              label='Direct Deposit form attached'
            >
              <RadioGroup
                value='true'
                onChange={event => this.setState({ direct_deposit: event.currentTarget.value })}
                align={ALIGN.horizontal}
              >
                <Radio value='true'>Yes</Radio>
                <Radio value='false'>No</Radio>
              </RadioGroup>
            </FormControl>
          </Cell>
          <Cell span={4}>
            <FormControl
              label='Release of Info attached'
            >
              <RadioGroup
                align={ALIGN.horizontal}
              >
                <Checkbox value='true'>Yes</Checkbox>
                <Checkbox value='false'>No</Checkbox>
              </RadioGroup>
            </FormControl>
          </Cell>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => state
const dispatchToProps = dispatch => ({ dispatch })
export default connect(mapStateToProps, dispatchToProps)(BasicInformForm_2)

