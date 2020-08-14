import React from 'react'
import { MarkSeries, VerticalBarSeries, XAxis, XYPlot, YAxis } from 'react-vis'
import { charts } from './style'

const convertToDateString = m => (new Date((m + 1) + '/1/1900')).toLocaleString('default', { month: 'short' })

export default function Charts ({
  data, title, children,
  highlight, highlightedMonth,
  select, selectedMonth
}) {
  if (!data) return <div style={charts} />
  const { rainfall = [], snow = [] } = data

  const selectedRainfall = rainfall.map(d => {
    let color = '#125C77'
    if (d.month === selectedMonth) { color = '#19CDD7' }
    if (d.month === highlightedMonth) { color = '#17B8BE' }
    return { ...d, color }
  })

  return (
    <div style={charts}>
      <h2>{title}</h2>
      <p>{children}</p>
      <XYPlot
        margin={{ left: 40, right: 25, top: 10, bottom: 25 }}
        height={140} width={480} yDomain={[0, 1000]}
        onMouseLeave={() => highlight(null)}
      >
        <XAxis
          tickFormat={m => convertToDateString(m)}
          tickSizeInner={0}
          tickValues={[0, 3, 6, 9, 11]}
        />
        <YAxis tickFormat={d => (d / 100).toFixed(0) + '%'} />

        <VerticalBarSeries
          colorType='literal'
          data={selectedRainfall}
          onValueMouseOver={d => highlight(d.month)}
          onValueClick={d => select(d.month)}
          style={{ cursor: 'pointer' }}
        />
        <MarkSeries data={snow} color='#f08' opacity='0.5' size='3' />
      </XYPlot>
    </div>
  )
}
