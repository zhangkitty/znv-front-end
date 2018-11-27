import React from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';


const LineChart = (props) => {
  const { staffAttendance: { trend: { dateValue, dataSource } } } = props;


  const selectDay = [];
  for (let i = 0; i < (moment(dateValue[1]).endOf('days').unix() - moment(dateValue[0]).startOf('days').unix()) / (3600 * 24); i++) {
    selectDay.push(moment(dateValue[0]).add(i, 'd').format('YYYY-MM-DD'));
  }
  const toList = type => selectDay.map((v, idx) => {
    console.log('mdzz');
    console.log(dataSource);
    const temp = dataSource.filter((t) => {
      // todo 有问题;Cannot read property 'dataTime' of null
      if (t && t.dataTime === v) {
        return true;
      }
      if (idx === selectDay.length - 1 && t && t.dataTime.split('-').length === 1) {
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
        name: '出勤率',
        type: 'line',
        yAxisIndex: 1,
        data: toList('workRate').map(v => `${Number(v * 100).toFixed(2)}`),
      },
      {
        name: '出勤人数',
        type: 'line',
        data: toList('workNum'),
      },
      {
        name: '平均工时',
        type: 'line',
        data: toList('workTime'),
      },
      {
        name: '平均路程',
        type: 'line',
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


export default LineChart;

