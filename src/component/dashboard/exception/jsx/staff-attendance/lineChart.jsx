import React from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';


const LineChart = (props) => {
  const { staffAttendance: { trend: { dateValue, dataSource } } } = props;
  const { node } = props;
  const len = node.id.split('.').length;


  const selectDay = [];
  for (let i = 0; i < (moment(dateValue[1]).endOf('days').unix() - moment(dateValue[0]).startOf('days').unix()) / (3600 * 24); i++) {
    selectDay.push(moment(dateValue[0]).add(i, 'd').format('YYYY-MM-DD'));
  }
  const toList = type => selectDay.map((v, idx) => {
    const temp = dataSource.filter((t) => {
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
      data: len > 3 ? [
        '工作时长',
        '工作路程',
      ] :
        [
          '平均工时',
          '出勤率',
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
        name: len > 3 ? '工作时长/h' : '平均工时/h',
        axisLabel: {
          formatter: '{value}',
        },
      },
      {
        type: 'value',
        name: len > 3 ? '工作路程/km' : '出勤率%',
        axisLabel: {
          formatter: len > 3 ? '{value}' : '{value} %',
        },
      },
    ],
    series:
      [
        {
          name: len > 3 ? '工作时长' : '平均工时',
          type: 'line',
          data: toList('workTime'),
        },
        {
          name: len > 3 ? '工作路程' : '出勤率',
          type: 'line',
          yAxisIndex: 1,
          data: len > 3 ? toList('workDistance') : toList('workRate').map(v => `${Number(v * 100).toFixed(2)}`),
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

