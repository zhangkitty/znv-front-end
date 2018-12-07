import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);
    console.log(1);
  }

  onChartClick = (param, echarts) => {
    console.log(param, echarts);
  };


  render() {
    const { staffAttendance: { detailData: { dataSource } } } = this.props;

    const X = dataSource.map(v => (v.areaName || v.executorName));

    const toList = type => dataSource.map(v => v[type]);

    const option = {
      tooltip: {
        trigger: 'axis',
      },
      toolbox: {
        show: true,
        itemGap: 20,
        feature: {
          mark: { show: true },
          dataView: { show: false, readOnly: false },
          magicType: { show: true, type: ['bar'] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
        orient: 'vertical',
        x: 'right',
        y: 'center',
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

    const onEvents = {
      click: this.onChartClick,
    };


    return (
      <div>
        <ReactEcharts
          option={option}
          onEvents={{
            click: (param, echarts) => {
              console.log(param);
              console.log(echarts);
            },
          }}
        />
      </div>
    );
  }
}

