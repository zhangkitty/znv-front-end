import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

const BarChart = (props) => {
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
        '广告机总数',
        '广告机在线数',
        '广告机在线率',
        '云运维FSU在线数',
        'FSU在线率',
        'FSU入网数',
        '入网进度',
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
        name: '广告机总数',
        type: 'bar',
        data: [30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000],
      },
      {
        name: '广告机在线数',
        type: 'bar',
        data: [30000, 29000, 28000, 27000, 26000, 25000, 24000, 23000, 22000, 21000, 20000, 19000],
      },
      {
        name: '广告机在线率',
        type: 'bar',
        yAxisIndex: 1,
        data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
      },
      {
        name: '云运维FSU在线数',
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      },
      {
        name: 'FSU在线率',
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      },
      {
        name: 'FSU入网数',
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      },
      {
        name: '入网进度',
        type: 'bar',
        yAxisIndex: 1,
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
      },
    ],
  };
  return (
    <div>
      <ReactEcharts option={option} />
    </div>
  );
};

export default BarChart;
