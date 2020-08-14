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

export class DemographicsInformation extends Component {

  constructor(props){
    super(props);
    this.state = this.props.form.demographicsInformation;
  }

  componentWillUnmount(){
    this.props.onChange(this.state);
  }

  render(){
    return(<Grid align={ALIGNMENT.center} behavior={BEHAVIOR.fluid} gridGaps={10} gridGutters={20} gridMargins={1}>
      <Cell span={12}>
        <Checkbox
          checked={this.state.active_contract}
          onChange={(event)=>{this.setState({active_contract:!this.state.active_contract})}}
        >
          Do you currently have an active Crop Insurance contract or have you had one in the past?
        </Checkbox>
      </Cell>
      <Cell span={6}>
        <FormControl
          label={() => "Contract Name"}
          caption={() => ""}
        >
          <Input
            value = {this.state.name}
            onChange ={(event)=>{
              this.setState({name:event.currentTarget.value})
            }}
          />
        </FormControl>
      </Cell>
      <Cell span={6}>
        <FormControl
          label={() => "Contract"}
          caption={() => ""}
        >
          <Input
            value = {this.state.contract}
            onChange ={(event)=>{
              this.setState({contract:event.currentTarget.value})
            }}
          />
        </FormControl>
      </Cell>
      <Cell span={6}>
        <FormControl
          label={() => "Status"}
          caption={() => ""}
        >
          <Input
            value = {this.state.status}
            onChange ={(event)=>{
              this.setState({status:event.currentTarget.value})
            }}
          />
        </FormControl>
      </Cell>
      <Cell span={6}>
        <FormControl
          label={() => "Balance Owing"}
          caption={() => ""}
        >
          <Input
            value = {this.state.balance}
            onChange ={(event)=>{
              this.setState({balance:event.currentTarget.value})
            }}
          />
        </FormControl>
      </Cell>
      <Cell span={2}>
        <Checkbox
          checked={this.state.agristability}
          onChange={(event)=>{this.setState({agristability:!this.state.agristability})}}
        >
          Are you in AgriStability?
        </Checkbox>
      </Cell>
      <Cell span={4}>
        <FormControl
          label={() => "PIN"}
          caption={() => ""}
        >
          <Input
            value = {this.state.pin1}
            onChange ={(event)=>{
              this.setState({pin1:event.currentTarget.value})
            }}
          />
        </FormControl>
      </Cell>
      <Cell span={2}>
        <Checkbox
          checked={this.state.agriInvest}
          onChange={(event)=>{this.setState({agriInvest:!this.state.agriInvest})}}
        >
          Are you Agrilnvest?
        </Checkbox>
      </Cell>
      <Cell span={4}>
        <FormControl
          label={() => "PIN"}
          caption={() => ""}
        >
          <Input
            value = {this.state.pin2}
            onChange ={(event)=>{
              this.setState({pin2:event.currentTarget.value})
            }}
          />
        </FormControl>
      </Cell>
    </Grid>);
  }
}

const mapStateToProps = state => state
const dispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps,dispatchToProps)(DemographicsInformation)