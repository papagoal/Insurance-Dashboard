import React,{Component} from 'react';
import {ProgressSteps, NumberedStep} from 'baseui/progress-steps';
import {Button} from 'baseui/button';
import {useStyletron} from 'baseui';
import LegalIndependence from '../components/Profile/InsuranceApplication/LegalIndependence';
import GeneralInformation from '../components/Profile/InsuranceApplication/GeneralInformationForm';
import BasicInformation from '../components/Profile/InsuranceApplication/BasicInformForm'
import DemographicsInformation from '../components/Profile/InsuranceApplication/DemographicsInformation';
import OperationalForm from '../components/Profile/InsuranceApplication/OperationalForm'
import FinancialForm from '../components/Profile/InsuranceApplication/FinancialForm'
import { Heading, HeadingLevel } from 'baseui/heading';
import { connect } from 'react-redux'
import { updateApplication } from '../reducers/testFormReducer'

function SpacedButton(props) {
  return (
    <Button
      {...props}
      overrides={{
        BaseButton: {
          style: ({$theme}) => ({
            marginLeft: $theme.sizing.scale200,
            marginRight: $theme.sizing.scale200,
            marginTop: $theme.sizing.scale200,
          }),
        },
      }}
    />
  );
}

export class CropInsuranceApplication extends Component {
  constructor (props) {
    super(props)
    const { basicInformation, demographicsInformation, operationalIndependence, financialIndependenceForm, legalIndependence, generalInformation } = this.props.form
    this.state = {
      current: 0,
      basicInformation,
      demographicsInformation,
      operationalIndependence,
      financialIndependenceForm,
      legalIndependence,
      generalInformation
    }
  }

  render () {
    console.log(this.state);
    return (<div>
      <HeadingLevel>
        <Heading styleLevel={5} style={{textAlign:'left'}} >
          Crop Insurance Application
        </Heading>
      </HeadingLevel>
      <ProgressSteps
        current={this.state.current}>
        <NumberedStep
          title="Basic Information">
          <BasicInformation
            onChange={(basicInformation)=>{
              this.setState({basicInformation})
            }}
          />
          <SpacedButton disabled>
            Previous
          </SpacedButton>
          <SpacedButton
            onClick={() => {
              this.props.onClick(this.state);
              this.setState({current:1})}
            }>
            Next
          </SpacedButton>
        </NumberedStep>
        <NumberedStep
          title="Demographics Information">
          <DemographicsInformation
            onChange={(demographicsInformation)=>{this.setState({demographicsInformation})}}
          />
          <SpacedButton
            onClick={()=>{
              this.props.onClick(this.state);
              this.setState({current:0});
            }}
          >
            Previous
          </SpacedButton>
          <SpacedButton
            onClick={() => {
              this.props.onClick(this.state);
              this.setState({current:2})}
            }>
            Next
          </SpacedButton>
        </NumberedStep>
        <NumberedStep title='Operational Independence'>
          <OperationalForm
            onChange={(operationalForm) => { console.log(operationalForm); this.setState({ operationalForm }) }}
          />
          <SpacedButton
            onClick={() => {
              this.props.onClick(this.state);
              this.setState({current:1});
            }
            }>
            Previous
          </SpacedButton>
          <SpacedButton
            onClick={() => {
              this.props.onClick(this.state);
              this.setState({current:3})}
            }
          >
            Next
          </SpacedButton>
        </NumberedStep>
        <NumberedStep title='Financial Independence'>
          <FinancialForm
            onChange={(financialForm) => { console.log(financialForm); this.setState({ financialForm }) }}
          />
          <SpacedButton
            onClick={() => {
              this.props.onClick(this.state);
              this.setState({current:2});
            }
            }>
            Previous
          </SpacedButton>
          <SpacedButton
            onClick={() => {
              this.props.onClick(this.state);
              this.setState({current:4})}
            }
          >
            Next
          </SpacedButton>
        </NumberedStep>
        <NumberedStep
          title="Legal Independence">
          <LegalIndependence
            onChange={(legalIndependence)=>{this.setState({legalIndependence})}}
          />
          <SpacedButton
            onClick={() => {
              this.props.onClick(this.state);
              this.setState({current:3});
            }}
          >
            Previous
          </SpacedButton>
          <SpacedButton
            onClick={() => {
              this.props.onClick(this.state);
              this.setState({current:5})}
            }>
            Next
          </SpacedButton>
        </NumberedStep>
        <NumberedStep title="General Information">
          <GeneralInformation
            onChange={(generalInformation)=>{console.log(generalInformation); this.setState({generalInformation})}}
          />
          <SpacedButton
            onClick={() => {
              this.props.onClick(this.state);
              this.setState({current:4});
            }
            }>
            Previous
          </SpacedButton>
          <SpacedButton
            disabled>
            Next
          </SpacedButton>
        </NumberedStep>
      </ProgressSteps>
    </div>);
  }
}

const mapStateToProps = state => state
const dispatchToProps = dispatch => ({ onClick: (state) => dispatch(updateApplication(state)) })

export default connect(mapStateToProps, dispatchToProps)(CropInsuranceApplication)