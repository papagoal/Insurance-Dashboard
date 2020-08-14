import { ALIGNMENT, BEHAVIOR, Cell, Grid } from 'baseui/layout-grid'
import 'mapbox-gl/dist/mapbox-gl.css'
import React from 'react'
import NavBar from '../../components/NavBar'
import { Button } from 'baseui/button'
import Plus from 'baseui/icon/plus'
import Grab from 'baseui/icon/grab'
import { Link } from 'react-router-dom'

const ListButton = () =>
  <Link to='/link/list' style={{ textDecoration: 'none', color: 'black' }}>
    <Button startEnhancer={() => <Grab size={24} />}>
      All Links
    </Button>
  </Link>

const CreateButton = () =>
  <Link to='/link/create' style={{ textDecoration: 'none', color: 'black' }}>
    <Button startEnhancer={() => <Plus size={24} />}>
      Create Link
    </Button>
  </Link>

const LinkLayout = ({ children, ...rest }) =>
  <Grid align={ALIGNMENT.center} behavior={BEHAVIOR.fluid} gridGaps={10} gridGutters={20} gridMargins={1}>
    <Cell span={12}>
      <NavBar right={[<ListButton key='list' />, <CreateButton key='create' />]} {...rest} />
    </Cell>
    <Cell span={6} skip={2}>
      {children}
    </Cell>
  </Grid>

export default LinkLayout
