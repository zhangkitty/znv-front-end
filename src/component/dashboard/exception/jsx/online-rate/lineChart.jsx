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
    const temp = dataSource.map(v =>
      // (assign({},v,{dataTime:v.dataTime.split(':').length===2?moment().format("YYYY-MM-DD")}))
      (Object.assign({}, v, { dataTime: v.dataTime.split(':').length === 2 ? moment().format('YYYY-MM-DD') : v.dataTime }))).filter((t) => {
      if (t.dataTime === v) {
        return true;
      }
      // if (idx === selectDay.length - 1 && t.dataTime.split('-').length === 1) {
      //   return true;
      // }
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
        magicType: { show: true, type: ['line'] },
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
      type: 'scroll',
      data: [
        '被监控设备总数',
        '被监控设备在线数',
        '被监控设备在线率',
        '监控单元在线数',
        '监控单元在线率',
        '监控单元入网数',
        '入网进度',

        '监控单元总数',
        '未开通监控单元资产数量',
        '监控单元安装进度',
        '监控单元离线数',
        '今日新增云运维在线数',
        '今日新增云运维离线数',
        '云运维在线数净增长',
        '频繁离线数量',
        '稳定在线数',
        '离线时间超长数量',
        '今日新增资产数',
        '今日新增被监控设备在线数',
        '今日新增被监控设备离线数',
        '净增长被监控设备在线数',
      ],
      selected: {
        被监控设备总数: false,
        被监控设备在线数: false,
        被监控设备在线率: true,
        监控单元在线数: false,
        监控单元在线率: true,
        监控单元入网数: false,
        入网进度: true,

        监控单元总数: false,
        未开通监控单元资产数量: false,
        监控单元安装进度: false,
        监控单元离线数: false,
        今日新增云运维在线数: false,
        今日新增云运维离线数: false,
        云运维在线数净增长: false,
        频繁离线数量: false,
        稳定在线数: false,
        离线时间超长数量: false,
        今日新增资产数: false,
        今日新增被监控设备在线数: false,
        今日新增被监控设备离线数: false,
        净增长被监控设备在线数: false,
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
        name: '被监控设备总数',
        type: 'line',
        data: toList('devTotal'),
      },
      {
        name: '被监控设备在线数',
        type: 'line',
        data: toList('devOnlineNum'),
      },
      {
        name: '被监控设备在线率',
        type: 'line',
        yAxisIndex: 1,
        data: toList('onlineNumRate').map(v => `${Number(v * 100).toFixed(2)}`),
      },
      {
        name: '监控单元在线数',
        type: 'line',
        data: toList('onlineNum'),
      },
      {
        name: '监控单元在线率',
        type: 'line',
        yAxisIndex: 1,
        data: toList('onlineRate').map(v => `${Number(v * 100).toFixed(2)}`),
      },
      {
        name: '监控单元入网数',
        type: 'line',
        data: toList('openNum'),
      },
      {
        name: '入网进度',
        type: 'line',
        yAxisIndex: 1,
        data: toList('openRate').map(v => `${Number(v * 100).toFixed(2)}`),
      },


      {
        name: '监控单元总数',
        type: 'line',
        data: toList('fsuTotal'),
      },
      {
        name: '未开通监控单元资产数量',
        type: 'line',
        data: toList('notOpenNum'),
      },
      {
        name: '监控单元安装进度',
        type: 'line',
        yAxisIndex: 1,
        data: toList('fsuInsRate'),
      },
      {
        name: '监控单元离线数',
        type: 'line',
        data: toList('fsuNotOnlineNum'),
      },
      {
        name: '今日新增云运维在线数',
        type: 'line',
        data: toList('onlineNumAdd'),
      },
      {
        name: '今日新增云运维离线数',
        type: 'line',
        data: toList('fsuNotOnlineNumAdd'),
      },
      {
        name: '云运维在线数净增长',
        type: 'line',
        data: toList('fsuNetAdd'),
      },
      {
        name: '频繁离线数量',
        type: 'line',
        data: toList('offlineFrequentNum'),
      },
      {
        name: '稳定在线数',
        type: 'line',
        data: toList('onlineStableNum'),
      },
      {
        name: '离线时间超长数量',
        type: 'line',
        data: toList('offlineOvertimeNum'),
      },
      {
        name: '今日新增资产数',
        type: 'line',
        data: toList('devAdd'),
      },
      {
        name: '今日新增被监控设备在线数',
        type: 'line',
        data: toList('devOnlineNumAdd'),
      },
      {
        name: '今日新增被监控设备离线数',
        type: 'line',
        data: toList('devNotOnlineNumAdd'),
      },
      {
        name: '净增长被监控设备在线数',
        type: 'line',
        data: toList('devNetAdd'),
      },
    ],
  };

  const onEvents = {
    click: e => console.log(e),
  };

  const columns = [
    {
      title: '日期',
      render: 'dataTime',
    },
    {
      title: '监控单元总数',
      render: 'fsuTotal',
    },
    {
      title: '被监控设备总数',
      render: 'devTotal',
    },
    {
      title: '未开通监控单元资产数量',
      render: 'notOpenNum',
    },
    {
      title: '监控单元入网数',
      render: 'openNum',
    },
    {
      title: '入网进度',
      render: d => `${Number(d.openRate * 100).toFixed(2)}%`,
    },
    {
      title: '监控单元安装进度',
      render: d => `${Number(d.fsuInsRate * 100).toFixed(2)}%`,
    },
    {
      title: '监控单元在线数',
      render: 'onlineNum',
    },
    {
      title: '监控单元离线数',
      render: 'fsuNotOnlineNum',
    },
    {
      title: '监控单元在线率',
      render: d => `${Number(d.onlineRate * 100).toFixed(2)}%`,
    },
    {
      title: '今日新增云运维在线数',
      render: 'onlineNumAdd',
    },
    {
      title: '今日新增云运维离线数',
      render: 'fsuNotOnlineNumAdd',
    },
    {
      title: '云运维在线数净增长',
      render: 'fsuNetAdd',
    },
    {
      title: '频繁离线数量',
      render: 'offlineFrequentNum',
    },
    {
      title: '稳定在线数',
      render: 'onlineStableNum',
    },
    {
      title: '离线时间超长数量',
      render: 'offlineOvertimeNum',
    },
    {
      title: '今日新增资产数',
      render: 'devAdd',
    },
    {
      title: '今日新增被监控设备在线数',
      render: 'devOnlineNumAdd',
    },
    {
      title: '今日新增被监控设备离线数',
      render: 'devNotOnlineNumAdd',
    },
    {
      title: '净增长被监控设备在线数',
      render: 'devNetAdd',
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
            data={dataSource}
            style={{ padding: '0 20 0 20', height: 600 }}
            rowsInView={10}
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

