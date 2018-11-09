import React from 'react';
import ReactEcharts from 'echarts-for-react';

const BarChart = (props) => {
  const { onlineRate: { detailData: { dataSource } } } = props;


  const X = dataSource.map(v => (v.areaName));

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
      left: '20px',
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
        data: X,
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
        data: toList('devTotal'),
      },
      {
        name: '广告机在线数',
        type: 'bar',
        data: toList('devOnlineNum'),
      },
      {
        name: '广告机在线率',
        type: 'bar',
        yAxisIndex: 1,
        data: toList('onlineNumRate'),
      },
      {
        name: '云运维FSU在线数',
        type: 'bar',
        data: toList('onlineNum'),
      },
      {
        name: 'FSU在线率',
        type: 'bar',
        data: toList('onlineRate'),
      },
      {
        name: 'FSU入网数',
        type: 'bar',
        data: toList('openNum'),
      },
      {
        name: '入网进度',
        type: 'bar',
        yAxisIndex: 1,
        data: toList('openNum') / toList('onlineNum'),
      },
    ],
  };
  return (
    <div style={{ paddingTop: 10 }}>
      <ReactEcharts option={option} />
    </div>
  );
};

export default BarChart;
