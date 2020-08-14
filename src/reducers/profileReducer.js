import { createAction, handleActions } from 'redux-actions'

const INITIAL_APP_STATE = {
  // Basic Form
  basicForm: {
    home_quarter: '',
    home_run: '',
    application_type: '',
    contract_name: '',
    alternate_address: '',
    home_phone: '',
    alternate_phone: '',
    description: '',
    cell_number: '',
    fax_number: '',
    email: '',
    SIN: '',
    business_number: '',
    direct_deposit: false,
    release_attached: false
  },
  operationalIndependence: {
    share_equipment: false,
    name_1: '',
    relationship_1: '',
    name_2: '',
    relationship_2: '',
    grain_storage: '',
    bin_share: false,
    name_3: '',
    relationship_3: '',
    name_4: '',
    relationship_4: '',
    explain_circumstances: '',
    custom_farm_operation: false,
    labour_paid: false,
    name_5: '',
    relationship_5: ''
  },
  financialIndependenceForm: {
    who_buys_text: '',
    where_accounts_text: '',
    provide_receipts: false,
    who_claims_text: '',
    who_absorbs_text: ''
  }
}

export const updateHomeQuarter = createAction('UPDATE_HOME_QUARTER')
export const updateHomeRun = createAction('UPDATE_HOME_RUN')
export const updateApplicationType = createAction('UPDATE_APPLICATION-TYPE')
export const updateContractName = createAction('UPDATE_NAME')
export const updateAlternateAddress = createAction('UPDATE_ALTERNATE_ADDRESS')
export const updateHomePhone = createAction('UPDATE_HOME_PHONE')
export const updateAlternatePhone = createAction('UPDATE_ALTERNATE_PHONE')
export const updateDescription = createAction('UPDATE_DESCRIPTION')
export const updateCellNumber = createAction('UPDATE_CELL_NUMBER')
export const updateFaxNumber = createAction('UPDATE_FAX_NUMBER')
export const updateEmail = createAction('EMAIL')
export const updateSIN = createAction('UPDATE_SIN')
export const updateBusinessNumber = createAction('UPDATE_BUSINESS_NUMBER')
export const updateDirectDeposit = createAction('UPDATE_DIRECT_DEPOSIT')
export const updateReleaseAttached = createAction('UPDATE_RELEASE_ATTACHED')

export const profileReducer = handleActions({
  [updateHomeQuarter]: (state, { payload: quarter }) => ({
    ...state,
    basicForm: { ...state.basicForm, home_quarter: quarter }
  }),
  [updateHomeRun]: (state, { payload: run }) => ({
    ...state,
    basicForm: { ...state.basicForm, home_run: run }
  }),
  [updateApplicationType]: (state, { payload: type }) => ({
    ...state,
    basicForm: { ...state.basicForm, application_type: type }
  }),
  [updateContractName]: (state, { payload: name }) => ({
    ...state,
    basicForm: { ...state.basicForm, contract_name: name }
  }),
  [updateAlternateAddress]: (state, { payload: address }) => ({
    ...state,
    basicForm: { ...state.basicForm, alternate_address: address }
  }),
  [updateHomePhone]: (state, { payload: phone }) => ({
    ...state,
    basicForm: { ...state.basicForm, home_phone: phone }
  }),
  [updateAlternatePhone]: (state, { payload: phone }) => ({
    ...state,
    basicForm: { ...state.basicForm, alternate_phone: phone }
  }),
  [updateDescription]: (state, { payload: description }) => ({
    ...state,
    basicForm: { ...state.basicForm, description: description }
  }),
  [updateCellNumber]: (state, { payload: cell }) => ({
    ...state,
    basicForm: { ...state.basicForm, cell_number: cell }
  }),
  [updateFaxNumber]: (state, { payload: fax }) => ({
    ...state,
    basicForm: { ...state.basicForm, fax_number: fax}
  }),
  [updateEmail]: (state, { payload: email }) => ({
    ...state,
    basicForm: { ...state.basicForm, email: email}
  }),
  [updateSIN]: (state, { payload: sin }) => ({
    ...state,
    basicForm: { ...state.basicForm, SIN: sin}
  }),
  [updateBusinessNumber]: (state, { payload: number }) => ({
    ...state,
    basicForm: { ...state.basicForm, business_number: number}
  }),
  [updateDirectDeposit]: (state, { payload: choose }) => ({
    ...state,
    basicForm: { ...state.basicForm, direct_deposit: choose }
  }),
  [updateReleaseAttached]: (state, { payload: choose }) => ({
    ...state,
    basicForm: { ...state.basicForm, release_attached: choose }
  })
}, INITIAL_APP_STATE)
