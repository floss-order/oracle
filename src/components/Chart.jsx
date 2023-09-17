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
  Brush,
} from 'recharts';
import { epochToDate, maxNumber } from '../utils/transformers';
import randomColor from '../utils/randomColor';
import { minNumber } from '../utils/transformers/maxNumber';
import { Button, Flex } from '@chakra-ui/react';
import colors from '../utils/colors';
import { Link } from '@chakra-ui/react';

const Chart = React.forwardRef(({ data, dataKeys, chartSettings }, ref) => {
  const [bottom, setBottom] = useState(650);
  const [top, setTop] = useState(0);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (data && chartSettings) {
      setBottom(maxNumber(data, chartSettings.datakeysY));
    }
  }, [data, chartSettings]);

  useEffect(() => {
    let filteredData = data;

    if (selectedYear) {
      filteredData = filteredData.filter(
        entry =>
          new Date(entry.epoch_time * 1000).getFullYear() === selectedYear
      );
    }

    if (selectedMonth) {
      filteredData = filteredData.filter(
        entry => new Date(entry.epoch_time * 1000).getMonth() === selectedMonth
      );
    }

    if (selectedDay) {
      filteredData = filteredData.filter(
        entry => new Date(entry.epoch_time * 1000).getDate() === selectedDay
      );
    }

    setFilteredData(filteredData);
    if (data && chartSettings) {
      setBottom(maxNumber(data, chartSettings.datakeysY));
    }
  }, [selectedYear, selectedMonth, selectedDay, data, chartSettings]);

  const uniqueYears = Array.isArray(data)
    ? data.reduce((years, entry) => {
        const year = new Date(entry.epoch_time * 1000).getFullYear();
        if (!years.includes(year)) {
          years.push(year);
        }
        return years;
      }, [])
    : [];

  const uniqueMonths = Array.isArray(data)
    ? data.reduce((months, entry) => {
        const month = new Date(entry.epoch_time * 1000).getMonth();
        if (!months.includes(month)) {
          months.push(month);
        }
        return months;
      }, [])
    : [];

  const uniqueDays = Array.isArray(data)
    ? data
        .map(entry => new Date(entry.epoch_time * 1000).getDate())
        .filter((day, index, daysArray) => daysArray.indexOf(day) === index)
        .sort((a, b) => a - b)
    : [];

  const handleYearChange = event => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  const handleMonthChange = event => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  const handleDayChange = event => {
    setSelectedDay(parseInt(event.target.value, 10));
  };

  if (!filteredData) {
    return null;
  }

  return (
    <div
      style={{
        width: '100%',
        height: 700,
        marginBottom: 50,
      }}
      ref={ref}
    >
      <Flex gap={5} mb={10}>
        <Flex direction="column">
          <label htmlFor="year-select">Выберите год</label>
          <select
            id="year-select"
            onChange={handleYearChange}
            value={selectedYear || ''}
          >
            <option value="">Все годы</option>
            {uniqueYears.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </Flex>
        <Flex direction="column">
          <label htmlFor="month-select">Выберите месяц</label>
          <select
            id="month-select"
            onChange={handleMonthChange}
            value={selectedMonth || ''}
          >
            <option value="">Все месяцы</option>
            {uniqueMonths.map(month => (
              <option key={month} value={month}>
                {new Date(0, month).toLocaleString('ru-RU', { month: 'long' })}
              </option>
            ))}
          </select>
        </Flex>
        <Flex direction="column">
          <label htmlFor="day-select">Выберите день</label>
          <select
            id="day-select"
            onChange={handleDayChange}
            value={selectedDay || ''}
          >
            <option value="">Все дни</option>
            {uniqueDays.map(day => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </Flex>
        <Link href="./data.csv" download>
          Скачать csv
        </Link>
      </Flex>

      <ResponsiveContainer>
        <LineChart
          data={filteredData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <YAxis
            allowDataOverflow
            domain={[-100, bottom]}
            type="number"
            yAxisId="1"
          />
          <XAxis
            dataKey={chartSettings?.datakeyX}
            tickFormatter={epoch => epochToDate(epoch)}
            fontWeight="600"
            minTickGap={40}
            allowDataOverflow
          />
          {chartSettings?.datakeysY.map((dataKey, index) => (
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={colors[index]}
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
          <Brush
            // startIndex={0}
            endIndex={data && data.length > 50 ? 50 : undefined}
            // dataKey={chartSettings?.datakeyX}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default Chart;
