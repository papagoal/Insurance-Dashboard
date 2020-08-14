import * as React from 'react'
import { ProgressSteps, NumberedStep } from 'baseui/progress-steps'
import { Button } from 'baseui/button'
import { useStyletron } from 'baseui'
import { Heading, HeadingLevel } from 'baseui/heading'
import BasicInformForm from '../components/Profile/InsuranceApplication/BasicInformForm_2'
import DemographicsForm from '../components/Profile/InsuranceApplication/DemographicsForm'
import OperationalForm from '../components/Profile/InsuranceApplication/OperationalForm'
import FinancialForm from '../components/Profile/InsuranceApplication/FinancialForm'

function SpacedButton (props) {
  return (
    <Button
      {...props}
      overrides={{
        BaseButton: {
          style: ({ $theme }) => ({
            marginLeft: $theme.sizing.scale200,
            marginRight: $theme.sizing.scale200,
            marginTop: $theme.sizing.scale200,
          })
        }
      }}
    />
  )
}

function Profile () {
  const [current, setCurrent] = React.useState(0)
  const [css, theme] = useStyletron()
  return (<div>
    <HeadingLevel>
      <Heading styleLevel={6} style={{ textAlign:'left' }}>
        CropInsuranceApplication
      </Heading>
    </HeadingLevel>
    <ProgressSteps current={current}>
      <NumberedStep title='BASIC'>
        <div className={css({...theme.typography.font300})}>
          <BasicInformForm />
        </div>
        <SpacedButton disabled>Previous</SpacedButton>
        <SpacedButton onClick={() => setCurrent(1)}>Next</SpacedButton>
      </NumberedStep>
      <NumberedStep title='DEMOGRAPHICS'>
        <div className={css({ ...theme.typography.font300 })}>
          <DemographicsForm />
        </div>
        <SpacedButton onClick={() => setCurrent(0)}>Previous</SpacedButton>
        <SpacedButton onClick={() => setCurrent(2)}>Next</SpacedButton>
      </NumberedStep>
      <NumberedStep title='OPERATIONAL INDEPENDENCE'>
        <div className={css({ ...theme.typography.font300 })}>
          <OperationalForm />
        </div>
        <SpacedButton onClick={() => setCurrent(1)}>Previous</SpacedButton>
        <SpacedButton onClick={() => setCurrent(3)}>Next</SpacedButton>
      </NumberedStep>
      <NumberedStep title='FINCIAL INDEPENDENCE'>
        <div className={css({ ...theme.typography.font300 })}>
          <FinancialForm />
        </div>
        <SpacedButton onClick={() => setCurrent(2)}>Previous</SpacedButton>
        <SpacedButton disabled>Submit</SpacedButton>
      </NumberedStep>
    </ProgressSteps>
  </div>)
}

export default Profile
