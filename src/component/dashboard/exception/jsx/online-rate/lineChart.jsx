import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';


// const option = {
//   grid: {
//     left: '3%',
//     right: '4%',
//     bottom: '3%',
//     containLabel: true,
//   },
//   tooltip: {
//     trigger: 'axis',
//   },
//   xAxis: {
//     type: 'category',
//     boundaryGap: false,
//     data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
//   },
//   yAxis: {
//     type: 'value',
//   },
//   series: [
//     {
//       name: '邮件营销',
//       type: 'line',
//       stack: '总量',
//       data: [120, 132, 101, 134, 90, 230, 210],
//       lineStyle: {
//         color: '#40a9ff',
//       },
//     },
//     {
//       name: '联盟广告',
//       type: 'line',
//       stack: '总量',
//       data: [220, 182, 191, 234, 290, 330, 310],
//       lineStyle: {
//         color: '#73d13d',
//       },
//     },
//   ],
// };

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
    data: ['蒸发量', '降水量', '平均温度'],
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
      name: '水量',
      axisLabel: {
        formatter: '{value} ml',
      },
    },
    {
      type: 'value',
      name: '温度',
      axisLabel: {
        formatter: '{value} °C',
      },
    },
  ],
  series: [

    {
      name: '蒸发量',
      type: 'bar',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
    },
    {
      name: '降水量',
      type: 'bar',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
    },
    {
      name: '平均温度',
      type: 'line',
      yAxisIndex: 1,
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
    },
  ],
};


const LineChart = props => (
  <div>
    <div>
      <ReactEcharts option={option} />
    </div>
  </div>
);

export default LineChart;

