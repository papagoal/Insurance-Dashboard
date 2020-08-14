import React,{Component} from 'react';
import { connect } from 'react-redux'
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { ALIGNMENT, BEHAVIOR, Cell, Grid } from 'baseui/layout-grid'
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { Button } from "baseui/button";
import { Heading, HeadingLevel } from 'baseui/heading';
import { Textarea } from "baseui/textarea";
import {Checkbox} from 'baseui/checkbox';
import { Datepicker } from "baseui/datepicker";

export class GeneralInformation extends Component {
  constructor(props){
    super(props);
    this.state = this.props.form.generalInformation;
  }

  componentWillUnmount(){
    this.props.onChange(this.state);
  }

  render(){
    return(<Grid align={ALIGNMENT.center} behavior={BEHAVIOR.fluid} gridGaps={10} gridGutters={20} gridMargins={1}>
      <Cell span={12}>
        <FormControl label="Seeding Intentions?">
          <Textarea
            value={this.state.seeding_value}
            onChange={event => this.setState({ seeding_value:event.currentTarget.value })}
          />
        </FormControl>
      </Cell>
      <Cell span={12}>
        <FormControl label="Crop Rotations?">
          <Textarea
            value={this.state.crop_rotation_value}
            onChange={event => this.setState({ crop_rotation_value:event.currentTarget.value })}
          />
        </FormControl>
      </Cell>
      <Cell span={12}>
        <FormControl label="Fertilizer and Chemical Plans?">
          <Textarea
            value={this.state.fertilizer_plan_value}
            onChange={event => this.setState({ fertilizer_plan_value:event.currentTarget.value })}
          />
        </FormControl>
      </Cell>
      <Cell span={12}>
        <FormControl label="Labour and Harvest Plans?">
          <Textarea
            value={this.state.labour_plan}
            onChange={event => this.setState({ labour_plan:event.currentTarget.value })}
          />
        </FormControl>
      </Cell>
      <Cell span={12}>
        <Checkbox
          checked={this.state.attached}
          onChange={(event)=>{this.setState({attached:!this.state.attached})}}
        >
          A Guarantee is required for all corporate contracts to ensure that officers and directors accept the financial obligation of the contract.  A Band Council Resolution (BCR) is required for all First Nation or First Nation related company contracts.  The BCR is to be completed by the band council authorizing the band to guarantee the premium of either the First Nation contract or related corporate contract.Is Guarantee or Band Council Resolution attached?
        </Checkbox>
      </Cell>
      <Cell span={12}>
        <Checkbox
          checked={this.state.declaration}
          onChange={(event)=>{this.setState({declaration:!this.state.declaration})}}
        >
          I/We declare that the parties listed on the above application are at least 18 years of age.  I/We declare that all information provided in the document is true and correct and I/We am/are aware that false information will void the contract. I/We agree to provide documentation, upon request, that may be required to verify the foregoing information. Should this application for insurance be accepted by Saskatchewan Crop Insurance Corporation, I/We declare that I/We understand and agree to all terms and conditions contained in the contract.
        </Checkbox>
      </Cell>
      <Cell skip={8} span={4}>
        <FormControl
          label={() => "Date"}
          caption={() => ""}
        >
          <Datepicker
            value={this.state.date}
            onChange={({ date }) =>{this.setState({date})}}
          />
        </FormControl>
      </Cell>
    </Grid>);
  }
}

const mapStateToProps = state => state
const dispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps,dispatchToProps)(GeneralInformation)