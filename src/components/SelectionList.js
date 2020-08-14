import { useStyletron } from 'baseui'
import { Avatar } from 'baseui/avatar'
import { Button } from 'baseui/button'
import Delete from 'baseui/icon/delete'
import Plus from 'baseui/icon/plus'
import { ARTWORK_SIZES, ListItem, ListItemLabel } from 'baseui/list'
import { OptionProfile, StatefulMenu } from 'baseui/menu'
import { ACCESSIBILITY_TYPE, PLACEMENT, StatefulPopover, TRIGGER_TYPE } from 'baseui/popover'
import { Paragraph3 } from 'baseui/typography'
import React from 'react'
import { connect } from 'react-redux'
import { removeQuarterSection } from '../reducers/homeReducer'
import PremiumRiskChart from './PremiumRiskChart'
import TotalButton from './TotalButton'
import { useQuery } from 'react-apollo'
import { GET_LLDS } from '../pages/App'

const defaultStyle = {
  borderRadius: 3,
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  fontFamily:
    'ff-clan-web-pro, "Helvetica Neue", Helvetica, sans-serif !important',
  fontSize: '12px',
  lineHeight: 1.833,
  width: 375,
  position: 'absolute',
  top: '130px',
  right: '20px',
  padding: '20px',
  zIndex: 100,
  background: 'white'
}

const ITEMS = [
  { crop: 'Wheat', variety: 'Hard Red Winter', premium: Math.random() * 10, imgUrl: 'https://iconsplace.com/wp-content/uploads/_icons/000000/256/png/wheat-icon-256.png' },
  { crop: 'Corn', variety: 'Dent Corn', premium: Math.random() * 10, imgUrl: 'https://image0.flaticon.com/icons/png/128/1357/1357806.png' },
  { crop: 'Soy', variety: 'Canadian Edamame', premium: Math.random() * 10, imgUrl: 'http://icons.iconarchive.com/icons/icons8/windows-8/64/Plants-Soy-icon.png' }
]

const SelectionList = ({ selectedFeatureIndexes, total, handleOnRemove }) => {
  const [css] = useStyletron()
  const { loading, error, data } = useQuery(GET_LLDS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { llds: { features } } = data
  const labels = Array.from(selectedFeatureIndexes)
    .map(i => features[i])
    .map(({ properties }) => ({
      ...properties,
      imgUrl: properties.cropType ? ITEMS
        .filter(({ crop }) => crop.toLowerCase() === properties.cropType.toLowerCase())
        .map(({ imgUrl }) => imgUrl)[0] : ''
    }))

  const popoverContent = (<Paragraph3 padding='scale1000'>Please select a quarter section on the map</Paragraph3>)
  const listHeader = 'Selected LLD' + ((labels.length === 0) ? '' : `s (${labels.length})`)
  const listItems = (labels.length === 0)
    ? <ListItem
      artworkSize={ARTWORK_SIZES.LARGE}
      artwork={() =>
        <StatefulPopover
          placement={PLACEMENT.left}
          triggerType={TRIGGER_TYPE.hover}
          content={popoverContent}
          accessibilityType={ACCESSIBILITY_TYPE.tooltip}
        >
          <Button size='mini' kind='minimal' shape='round'>
            <Plus />
          </Button>
        </StatefulPopover>}
      >
      <ListItemLabel>No selections</ListItemLabel>
      </ListItem>
    : labels.map(({ name, premium, imgUrl }, i) =>
      <ListItem
        key={i}
        artworkSize={ARTWORK_SIZES.LARGE}
        artwork={() =>
          <StatefulPopover
            className={css({
              zIndex: 1000
            })}
            placement={PLACEMENT.left}
            content={({ close }) => (
              <StatefulMenu
                items={ITEMS}
                onItemSelect={() => close()}
                overrides={{
                  List: {},
                  Option: {
                    component: OptionProfile,
                    props: {
                      getProfileItemLabels: ({ crop, premium, variety }) => ({
                        title: crop,
                        subtitle: `2019 premium: $${premium.toFixed(2)} / acre`,
                        body: variety
                      }),
                      getProfileItemImg: item => item.imgUrl,
                      getProfileItemImgText: item => item.title
                    }
                  }
                }}
              />
            )}
          >
            <Button size='mini' kind='minimal' shape='round'>
              <Avatar
                name='Crop'
                size='scale1000'
                src={imgUrl}
              />
            </Button>
          </StatefulPopover>}
        endEnhancer={() =>
          <Button
            size='compact' kind='secondary' shape='round'
            onClick={() => {
              const index = selectedFeatureIndexes[i]
              handleOnRemove(index)
            }}
          >
            <Delete />
          </Button>}
      >
        <ListItemLabel description={`$${parseFloat(premium).toFixed(2)} / acre`}>{name}</ListItemLabel>
      </ListItem>
    )

  const history = Array.from(selectedFeatureIndexes).map(i => features[i])
  return (
    <div className={css(defaultStyle)}>
      {selectedFeatureIndexes.size > 0 ? <PremiumRiskChart history={history} /> : null}
      <h2>{listHeader}</h2>
      <ul className={css({
        width: '375px',
        paddingLeft: 0,
        paddingRight: 0
      })}
      >{listItems}
      </ul>
      {labels.length > 0 ? <TotalButton>{total}</TotalButton> : null}
    </div>
  )
}

const mapStateToProps = state => {
  const { selectedFeatureIndexes } = state.home
  return {
    selectedFeatureIndexes,
    total: 10
  }
}
const dispatchToProps = dispatch => ({
  handleOnRemove: i => dispatch(removeQuarterSection(i))
})

export default connect(mapStateToProps, dispatchToProps)(SelectionList)
