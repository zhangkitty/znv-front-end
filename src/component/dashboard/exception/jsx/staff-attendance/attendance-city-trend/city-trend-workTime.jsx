import React from 'react';
import ReactEcharts from 'echarts-for-react';
import time from 'utils/time';


const tmp = (props) => {
  const {
    dispatch, staffAttendance: {
      cityTrend: {
        cityList, chooseCity, dateValue, dataSource,
      },
    },
  } = props;

  const data = dataSource.filter((v) => {
    if (chooseCity.includes(v.areaCode)) {
      return true;
    }
    return false;
  });


  const timeValue = time(dateValue);

  const a = chooseCity.map((v) => {
    const tmp = dataSource.filter(s => s.areaCode == v).reduce((accumulator, value) => {
      accumulator[value.dataTime] = value.workTime;
      return accumulator;
    }, {});
    return timeValue.map((v) => {
      if (tmp[moment(v).format('YYYY-MM-DD')]) {
        return tmp[moment(v).format('YYYY-MM-DD')];
      }
      return 0;
    });
  });

  const b = chooseCity.map(v => timeValue.map(t => dataSource.filter(s => s.areaCode == v).filter(t => t.dataTime)[0].areaName));

  const c = b.map((v) => {
    const set = new Set();
    v.map(t => set.add(t));
    return [...set][0];
  });

  const option = {
    title: {
      left: 'center',
      text: '平均工时',
    },
    // grid: {
    //   y: 50,
    // },
    legend: {
      type: 'scroll',
      data: c,
      top: 30,
    },
    xAxis: {
      type: 'category',
      data: timeValue.map(v => moment(v).format('YYYY-MM-DD')),
      axisLabel: {
        interval: 0,
        rotate: 40,
      },
    },
    yAxis: {
      type: 'value',
      min(value) {
        return value.min - (value.max - value.min);
      },
    },
    series: a.map((v, idx) => (
      {
        name: c[idx],
        data: v,
        type: 'line',
      }
    )),
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
