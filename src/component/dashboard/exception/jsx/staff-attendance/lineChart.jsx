import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

const option = {
  tooltip: {
    trigger: 'axis',
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  calculable: true,
  legend: {
    data: [
      '出勤率',
      '出勤人数',
      '平均工时',
      '平均路程',
    ],
  },
  xAxis: [
    {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '数目',
      axisLabel: {
        formatter: '{value}',
      },
    },
    {
      type: 'value',
      name: '百分比',
      axisLabel: {
        formatter: '{value} %',
      },
    },
  ],
  series: [
    {
      name: '出勤率',
      type: 'line',
      data: [30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000],
    },
    {
      name: '出勤人数',
      type: 'line',
      data: [30000, 29000, 28000, 27000, 26000, 25000, 24000, 23000, 22000, 21000, 20000, 19000],
    },
    {
      name: '平均工时',
      type: 'line',
      yAxisIndex: 1,
      data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
    },
    {
      name: '平均路程',
      type: 'line',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
    },
  ],
};


const LineChart = (props) => {
  console.log(props);
  return (
    <div>
      <ReactEcharts option={option} />
    </div>
  );
};


export default LineChart;

