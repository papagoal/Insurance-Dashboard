import React,{Component} from 'react';
import { connect } from 'react-redux'
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { ALIGNMENT, BEHAVIOR, Cell, Grid } from 'baseui/layout-grid'
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { Button } from "baseui/button";
import { Heading, HeadingLevel } from 'baseui/heading';
import { array } from 'datalib/src/util';
import {Plus, Delete} from 'baseui/icon';
import {Checkbox} from 'baseui/checkbox';
import { Select } from "baseui/select";


export class LegalIndependence extends Component {
  constructor(props){
    super(props);
    this.state = this.props.form.legalIndependence;
  }

  componentWillUnmount(){
    this.props.onChange(this.state);
  }

  render(){
    return(<Grid align={ALIGNMENT.center} behavior={BEHAVIOR.fluid} gridGaps={10} gridGutters={20} gridMargins={1}>
      <Cell span={12}>
        <FormControl
          label={() => "Explain ownership of land"}
          caption={() => ""}
        >
          <Input
            value = {this.state.ownership}
            onChange ={(event)=>{
              this.setState({ownership:event.currentTarget.value})
            }}
          />
        </FormControl>
      </Cell>
      <Cell span={12}>
        <Checkbox
          checked={this.state.proof}
          onChange={(event)=>{this.setState({proof:!this.state.proof})}}
        >
          Is proof of ownership attached?
        </Checkbox>
      </Cell>
      <Cell span={12}>
        <Button startEnhancer ={Plus} onClick={()=>{ this.setState({ lands:[...this.state.lands,{name:"",relationship:"",type:""}]})}}>Add a Landlord Land</Button>
      </Cell>
      {
        this.state.lands.map((land,index,array)=>{
          return (
            <Cell span={12}>
              <Grid
                align={ALIGNMENT.center}
                behavior={BEHAVIOR.fluid}
                gridGaps={10}
                gridGutters={20}
                gridMargins={1}>
                <Cell span={4}>
                  <FormControl
                    label={() => "Landlord Name"}
                    caption={() => ""}
                  >
                    <Input
                      value={land.name}
                      onChange={
                        (event)=>{
                          array[index].name = event.currentTarget.value;
                          this.setState({lands:array})
                        }
                      }
                    />
                  </FormControl>
                </Cell>
                <Cell span={4}>
                  <FormControl
                    label={() => "Relationship"}
                    caption={() => ""}
                  >
                    <Input
                      value ={land.relationship}
                      onChange={
                        (event)=>{
                          array[index].relationship = event.currentTarget.value;
                          this.setState({lands:array})
                        }
                      }
                    />
                  </FormControl>
                </Cell>
                <Cell span={3}>
                  <FormControl label="Type of Agreement">
                    <Select
                      id="select-id"
                      value={land.type}
                      onChange={({value}) => {
                        array[index].type = value;
                        this.setState({lands:array})
                      }}
                      options={[
                        {type: 'crop-share-verbal', id: 'Crop share - Verbal'},
                        {type: 'crop-share-written', id: 'Crop share - Written'},
                        {type: 'cash-verbal', id: 'Cash - Verbal'},
                        {type: 'cash-written', id: 'Cash - Written'},
                        {type: 'other', id: 'Other'},
                      ]}
                      labelKey="id"
                      valueKey="type"
                    />
                  </FormControl>
                </Cell>
                <Cell span={1}>
                  <FormControl
                    label={() => "Options"}
                    caption={() => ""}
                  >
                    <Button startEnhancer = {Delete} onClick={()=>{
                      var array = [...this.state.lands];
                      array.splice(index,1);
                      this.setState({lands:array});
                    }}>Delete</Button>
                  </FormControl>
                </Cell>
              </Grid>
            </Cell>
          );
        })
      }
      <Cell span={8}>
        <Checkbox
          checked={this.state.agreement}
          onChange={(event)=>{this.setState({agreement:!this.state.agreement})}}
        >
          If the land operated is only rented land the Rental Agreement must be provided or the application will not be approved.Is the Rental Agreement attached?
        </Checkbox>
      </Cell>
      <Cell span={4}>
        <FormControl
          label={() => "If No, Explain"}
          caption={() => ""}
        >
          <Input
            value = {this.state.explain}
            onChange ={(event)=>{this.setState({explain:event.currentTarget.value})}}
          />
        </FormControl>
      </Cell>
      <Cell span={8}>
        <Checkbox
          checked={this.state.verbal}
          onChange={(event)=>{this.setState({ verbal: !this.state.verbal })}}
        >
          If all land that is operated is rented by a verbal agreement, we require a Confirmation of Verbal Agreement to verify legal access to the land. Is Confirmation of Verbal Agreement attached?
        </Checkbox>
      </Cell>
      <Cell span={4}>
        <FormControl
          label={() => "Permit number(s) for Wild Rice"}
          caption={() => ""}
        >
          <Input
            value = {this.state.permit}
            onChange ={(event)=>{this.setState({permit:event.currentTarget.value})}}
          />
        </FormControl>
      </Cell>
    </Grid>);
  }
}

const mapStateToProps = state => state
const dispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps,dispatchToProps)(LegalIndependence)