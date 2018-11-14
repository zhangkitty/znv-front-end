import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactEcharts from 'echarts-for-react';


const LineChart = (props) => {
  const { onlineRate: { trend: { dateValue, dataSource } } } = props;

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

  return (
    <div style={{ paddingTop: 10 }}>
      <ReactEcharts
        option={option}
        onEvents={onEvents}
      />
    </div>
  );
};


export default LineChart;

