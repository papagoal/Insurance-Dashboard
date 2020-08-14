import * as React from 'react'
import { Input } from 'baseui/input'
import { ALIGNMENT, BEHAVIOR, Grid, Cell } from 'baseui/layout-grid'
import { useStyletron } from 'baseui'
import { StatefulList } from 'baseui/dnd-list'
import { connect } from 'react-redux'
import { FormControl } from "baseui/form-control"
import { RadioGroup, Radio, ALIGN } from "baseui/radio"
import { Button } from "baseui/button"
import { Heading, HeadingLevel } from 'baseui/heading'

class DemographicsForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      default: '',
    }
  }
  render () {
    return (
      <div>
        <Grid align={ALIGNMENT.center} behavior={BEHAVIOR.fluid} gridGaps={10} gridGutters={20} gridMargins={1}>
          <Cell span={12}>
            <FormControl
              label='Do you currently have an active Crop Insurance contract or have you had one in the past?'
            >
              <RadioGroup
                align={ALIGN.horizontal}
              >
                <Radio value='true'>Yes</Radio>
                <Radio value='false'>No</Radio>
              </RadioGroup>
            </FormControl>
          </Cell>
          <Cell span={1}>
            <p>Contract Name</p>
          </Cell>
          <Cell span={2}>
            <Input />
          </Cell>
          <Cell span={1}>
            <p>Contract</p>
          </Cell>
          <Cell span={2}>
            <Input
              startEnhancer='#'
            />
          </Cell>
          <Cell span={1}>
            <p>Status</p>
          </Cell>
          <Cell span={2}>
            <Input />
          </Cell>
          <Cell span={1}>
            <p>balance Owing</p>
          </Cell>
          <Cell span={2}>
            <Input
              startEnhancer='$'
            />
          </Cell>
          <Cell span={1}>
            <p>Contract Name</p>
          </Cell>
          <Cell span={2}>
            <Input />
          </Cell>
          <Cell span={1}>
            <p>Contract</p>
          </Cell>
          <Cell span={2}>
            <Input
              startEnhancer='#'
            />
          </Cell>
          <Cell span={1}>
            <p>Status</p>
          </Cell>
          <Cell span={2}>
            <Input />
          </Cell>
          <Cell span={1}>
            <p>balance Owing</p>
          </Cell>
          <Cell span={2}>
            <Input
              startEnhancer='$'
            />
          </Cell>
          <Cell span={3}>
            <FormControl
              label='Are you in AgriStability?'
            >
              <RadioGroup
                align={ALIGN.horizontal}
              >
                <Radio value='true'>Yes</Radio>
                <Radio value='false'>No</Radio>
              </RadioGroup>
            </FormControl>
          </Cell>
          <Cell span={1}>
            <p>PIN</p>
          </Cell>
          <Cell span={2}>
            <Input />
          </Cell>
          <Cell span={3}>
            <FormControl
              label='Are you Agrilnvest?'
            >
              <RadioGroup
                align={ALIGN.horizontal}
              >
                <Radio value='true'>Yes</Radio>
                <Radio value='false'>No</Radio>
              </RadioGroup>
            </FormControl>
          </Cell>
          <Cell span={1}>
            <p>PIN</p>
          </Cell>
          <Cell span={2}>
            <Input />
          </Cell>
        </Grid>
      </div>
    )
  }
}

export default DemographicsForm