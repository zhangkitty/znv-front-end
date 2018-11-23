import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactEcharts from 'echarts-for-react';
import { Table } from 'shineout';


const LineChart = (props) => {
  const { onlineRate: { trend: { dateValue, dataSource, choosedShowType } } } = props;

  const selectDay = [];
  for (let i = 0; i < (moment(dateValue[1]).endOf('days').unix() - moment(dateValue[0]).startOf('days').unix()) / (3600 * 24); i++) {
    selectDay.push(moment(dateValue[0]).add(i, 'd').format('YYYY-MM-DD'));
  }


  const toList = type => selectDay.map((v, idx) => {
    const temp = dataSource.filter((t) => {
      if (t.dataTime === v) {
        return true;
      }
      if (idx === selectDay.length - 1 && t.dataTime.split('-').length === 1) {
        return true;
      }
      return false;
    });
    if (temp.length) {
      return temp[0][type];
    }
    return 0;
  });


  const option = {
    tooltip: {
      trigger: 'axis',
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: false, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
      itemGap: 20,
      orient: 'vertical',
      x: 'right',
      y: 'center',
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
      selected: {
        广告机总数: false,
        广告机在线数: false,
        广告机在线率: true,
        云运维FSU在线数: false,
        FSU在线率: true,
        FSU入网数: false,
        入网进度: true,
      },
    },
    xAxis: [
      {
        type: 'category',
        data: selectDay,
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
        type: 'line',
        data: toList('devTotal'),
      },
      {
        name: '广告机在线数',
        type: 'line',
        data: toList('devOnlineNum'),
      },
      {
        name: '广告机在线率',
        type: 'line',
        yAxisIndex: 1,
        data: toList('onlineNumRate'),
      },
      {
        name: '云运维FSU在线数',
        type: 'line',
        data: toList('onlineNum'),
      },
      {
        name: 'FSU在线率',
        type: 'line',
        yAxisIndex: 1,
        data: toList('onlineRate'),
      },
      {
        name: 'FSU入网数',
        type: 'line',
        data: toList('openNum'),
      },
      {
        name: '入网进度',
        type: 'line',
        yAxisIndex: 1,
        data: toList('openNum') / toList('onlineNum'),
      },
    ],
  };

  const onEvents = {
    click: e => console.log(e),
  };

  const columns = [
    {
      title: 'FSU总数',
      render: 0,
    },
    {
      title: '广告机总数',
      render: 0,
    },
    {
      title: '未开通FSU资产数量',
      render: 0,
    },
    {
      title: 'FSU入网数',
      render: 0,
    },
    {
      title: '入网进度',
      render: 0,
    },
    {
      title: 'FSU安装进度',
      render: 0,
    },
    {
      title: '云运维FSU在线数',
      render: 0,
    },
    {
      title: '云运维FSU离线数',
      render: 0,
    },
    {
      title: '云运维FSU在线率',
      render: 0,
    },
    {
      title: '今日新增云运维在线数',
      render: 0,
    },
    {
      title: '今日新增云运维离线数',
      render: 0,
    },
    {
      title: '云运维在线数净增长',
      render: 0,
    },
    {
      title: '频繁离线数量',
      render: 0,
    },
    {
      title: '稳定在线数',
      render: 0,
    },
    {
      title: '在线波动数',
      render: 0,
    },
    {
      title: '离线时间超长数量',
      render: 0,
    },
    {
      title: '广告机总数',
      render: 0,
    },
    {
      title: '今日新增资产数',
      render: 0,
    },
    {
      title: '今日新增资产数',
      render: 0,
    },
    {
      title: '今日新增广告机在线数',
      render: 0,
    },
    {
      title: '今日新增广告机在线数',
      render: 0,
    },
    {
      title: '净增长广告机在线数',
      render: 0,
    },
    {
      title: '广告机在线率',
      render: 0,
    },
    {
      title: '在线率是否提升',
      render: 0,
    },
  ];

  return (
    <div style={{ paddingTop: 10, width: '100%' }}>
      {
        choosedShowType === 1 ?
          <Table
            columns={columns}
            fixed="both"
            width={2500}
            data={[{ 0: 0 }]}
            style={{ padding: '0 20 0 20' }}
          />
          :
          <ReactEcharts
            option={option}
            onEvents={onEvents}
          />
      }
    </div>
  );
};


export default LineChart;

