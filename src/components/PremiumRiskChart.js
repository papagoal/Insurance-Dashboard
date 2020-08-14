import React, { Component } from 'react'
import { TimeSeries } from 'pondjs'
import { premiumRiskChartStyle } from './style'
import { ChartContainer, ChartRow, Charts, YAxis, BandChart, ScatterChart, LineChart, Resizable, styler, EventMarker } from 'react-timeseries-charts'
import { connect } from 'react-redux'

const PremiumRiskChart = ({ history }) => {
  const [points] = history.map(() => ([
    ['2019', ['1', '5'], '3']
  ]))
  const series = new TimeSeries({
    name: 'series',
    columns: ['index', 't', 'median'],
    points
  })

  const style = styler([
    { key: 't', color: 'steelblue', width: 1, opacity: 1 },
    { key: 'median', color: '#aaa', width: 1 }
  ])

  return (
    <div style={premiumRiskChartStyle}>
      <div className='row'>
        <div className='col-md-12'>
          <b>Premium Vs Risk Benchmark Chart</b>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <Resizable>
            <ChartContainer timeRange={series.range()} format='20%y' timeAxisTickCount={5}>
              <ChartRow height='240'>
                <YAxis
                  id='t-axis'
                  label='time (s)'
                  min={0}
                  max={1000}
                  format='d'
                  width='50'
                  type='linear'
                />
                <Charts>
                  <BandChart
                    axis='t-axis'
                    style={style}
                    spacing={1}
                    column='t'
                    interpolation='curveBasis'
                    series={series}
                  />
                  <ScatterChart
                    axis='t-axis'
                    style={style}
                    spacing={1}
                    columns={['median']}
                    series={series}
                  />
                  <LineChart
                    axis='t-axis'
                    style={style}
                    spacing={1}
                    columns={['median']}
                    series={series}
                  />
                  <EventMarker
                    type='flag'
                    axis='axis'
                    column='temperature'
                    infoTimeFormat='%Y'
                    infoWidth={120}
                    markerRadius={2}
                    markerStyle={{ fill: 'black' }}
                  />
                </Charts>
              </ChartRow>
            </ChartContainer>
          </Resizable>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => state
const dispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, dispatchToProps)(PremiumRiskChart)
