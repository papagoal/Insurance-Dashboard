import { createAction, handleActions } from 'redux-actions'

// INITIAL_APP_STATE
export const initialAppState =
  {
    basicInformation: {
      home_quarter: '',
      home_rn: '',
      address: '',
      application_type: '',
      contract_name: '',
      alternate_address: '',
      description: '',
      home_phone: '',
      cell_number: '',
      fax_number: '',
      email_address: '',
      sin: '',
      business_number: '',
      direct_deposit: false,
      release_of_info: false
    },
    demographicsInformation:{
      active_contract: false,
      name: '',
      contract: '',
      status: '',
      balance: '',
      agristability: false,
      pin1: '',
      agriInvest765: false,
      pin2: ''
    },
    operationalIndependence: {
      share_equipment: false,
      name_1: '',
      relationship_1: '',
      name_2: '',
      relationship_2: '',
      name_3: '',
      relationship_3: '',
      grain_storage: '',
      bin_share: false,
      name_4: '',
      relationship_4: '',
      name_5: '',
      relationship_5: '',
      explain_circumstances: '',
      custom_farm_operation: false,
      labour_paid: false,
      name_6: '',
      relationship_6: ''
    },
    financialIndependenceForm: {
      who_buys_text: '',
      where_accounts_text: '',
      provide_receipts: false,
      who_claims_text: '',
      who_absorbs_text: ''
    },
    legalIndependence: {
      lands: [{
        name: '',
        relationship: '',
        type: ''
      }],
      ownership: '',
      proof: false,
      agreement: false,
      verbal: false,
      explain: '',
      permit: ''
    },
    generalInformation:{
      seeding_value: '',
      crop_rotation_value: '',
      fertilizer_plan_value: '',
      labour_plan: '',
      attached: false,
      declaration: false,
      date: new Date()
    }
  }

export const updateApplication = createAction('UPDATE_APPLICATION')

export const formReducer = handleActions({
  [updateApplication] : (state, action) => (action.payload)
}, initialAppState)