import React from 'react';
import ReactEcharts from 'echarts-for-react';
import time from 'utils/time';
import moment from 'moment';


// 监控单元在线率
const tmp = (props) => {
  const {
    dispatch, onlineRate: {
      cityTrend: {
        cityList, chooseCity, dateValue, dataSource,
      },
    },
  } = props;


  const timeValue = time(dateValue).map(val => moment(val).format('YYYY-MM-DD'));

  const cal = (list, key) => list.map((v) => {
    const arr = dataSource.filter(t => v.areaCode === t.areaCode);
    const dateArr = arr.map(x => x.dataTime);
    return timeValue.map((k) => {
      if (dateArr.includes(k)) {
        return arr.filter(y => y.dataTime === k)[0][key];
      }
      return 0;
    });
  });

  const seriesArray = cityList.map((v, idx) => (
    {
      name: v.areaName,
      data: cal(cityList, 'onlineRate')[idx].map(v => Number(v * 100).toFixed(2)),
      type: 'line',
    }
  ));

  const option = {
    title: {
      left: 'center',
      text: '监控单元在线率',
    },

    tooltip: {
      trigger: 'axis',
      // formatter: '{a}{b}{c}',
    },

    legend: {
      selected: cityList.reduce((sum, val) => { sum[val.areaName] = chooseCity.includes(val.areaCode); return sum; }, {}),
      type: 'scroll',
      data: cityList.map(v => v.areaName),
      top: 30,
    },

    // grid: {
    //   left: '5px',
    // },

    xAxis: {
      type: 'category',
      data: timeValue,
      axisLabel: {
        interval: 0,
        rotate: 40,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        margin: 6,
        show: true,
        interval: 'auto',
        // rotate: 40,
        formatter: (value, index) => (`${Number(value).toFixed(0)}%`),
      },
      min(value) {
        return value.min - (value.max - value.min);
      },
    },
    series: seriesArray,
  };


  return (
    <div style={{ width: '100%' }}>
      <ReactEcharts
        option={option}
      />
    </div>
  );
};

export default tmp;
