import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

const BarChart = (props) => {
  const { staffAttendance: { detailData: { dataSource } } } = props;


  const X = dataSource.map(v => (v.areaName || v.executorName));

  const toList = type => dataSource.map(v => v[type]);

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
        '工作时长',
        '工作路程',
      ],
    },
    xAxis: [
      {
        type: 'category',
        data: X,
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '工作时长',
        axisLabel: {
          formatter: '{value}',
        },
      },
      {
        type: 'value',
        name: '工作路程',
        axisLabel: {
          formatter: '{value}',
        },
      },
    ],
    series: [
      {
        name: '工作时长',
        type: 'bar',
        data: toList('workTime'),
      },
      {
        name: '工作路程',
        type: 'bar',
        yAxisIndex: 1,
        data: toList('workDistance'),
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
