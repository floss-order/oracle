/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { epochToDate, maxNumber } from '../utils/transformers';
import { Heading } from '@chakra-ui/react';
import randomColor from '../utils/randomColor';

const Chart = React.forwardRef(({ data, dataKeys, chartSettings }, ref) => {
  const [bottom, setBottom] = useState(1000);
  const [top, setTop] = useState(0);
  const [chartInitialState, setChartInitialState] = useState({
    left: 'dataMin',
    right: 'dataMax',
    refAreaLeft: '',
    refAreaRight: '',
    top: 'dataMax+1',
    bottom: 'dataMin-1',
    top2: 'dataMax+20',
    bottom2: 'dataMin-20',
    animation: true,
  });

  useEffect(() => {
    if (data && chartSettings) {
      setBottom(maxNumber(data, chartSettings.datakeysY));
    }
  }, [bottom, data, chartSettings, ref]);

  function getAxisYDomain(from, to, ref, offset) {
    const refData = initialData.slice(from - 1, to);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];

    refData.forEach(d => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });

    return [(bottom | 0) - offset, (top | 0) + offset];
  }

  function zoom() {
    let { refAreaLeft, refAreaRight } = chartInitialState;
    const { data } = chartInitialState;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      setChartInitialState(prevState => ({
        ...prevState,
        refAreaLeft: '',
        refAreaRight: '',
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'cost', 1);
    const [bottom2, top2] = getAxisYDomain(
      refAreaLeft,
      refAreaRight,
      'impression',
      50
    );

    setChartInitialState({
      refAreaLeft: '',
      refAreaRight: '',
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
      bottom2,
      top2,
    });
  }

  function zoomOut() {
    const { data } = this.state;
    this.setState(() => ({
      data: data.slice(),
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin',
      top2: 'dataMax+50',
      bottom2: 'dataMin+50',
    }));
  }

  return (
    <div
      style={{
        width: '100%',
        height: 800,
        background: 'white',
        padding: '20px 20px 60px',
        borderRadius: 5,
      }}
      ref={ref}
    >
      <Heading size="md" mb={4}>
        {chartSettings && chartSettings.title
          ? chartSettings.title
          : 'Заголовок'}
      </Heading>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <YAxis
            allowDataOverflow
            domain={[top, bottom]}
            type="number"
            yAxisId="1"
          />
          <XAxis
            dataKey={chartSettings?.datakeyX}
            tickFormatter={epoch => epochToDate(epoch)}
            fontWeight="600"
            minTickGap={40}
          />
          {chartSettings?.datakeysY.map((dataKey, index) => (
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={randomColor()}
              yAxisId="1"
              key={index}
            />
          ))}
          <Tooltip
            labelFormatter={epoch => epochToDate(epoch, true)}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Legend verticalAlign="bottom" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default Chart;
