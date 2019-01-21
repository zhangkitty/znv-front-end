import React from 'react';
import ReactEcharts from 'echarts-for-react';
import time from 'utils/time';

// 入网进度
const tmp = (props) => {
  const {
    dispatch, onlineRate: {
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

  // 入网进度
  // const a = chooseCity.map(v => timeValue.map(t => dataSource.filter(s => s.areaCode == v).filter(t => t.dataTime)[0].openRate));
  const a = chooseCity.map((v) => {
    const tmp = dataSource.filter(s => s.areaCode == v).reduce((accumulator, value) => {
      accumulator[value.dataTime] = value.openRate;
      return accumulator;
    }, {});
    return timeValue.map((v) => {
      if (tmp[moment(v).format('YYYY-MM-DD')]) {
        return tmp[moment(v).format('YYYY-MM-DD')];
      }
      return 0;
    });
  });

  // const b = chooseCity.map(v => timeValue.map(t => dataSource.filter(s => s.areaCode == v).filter(t => t.dataTime)[0].areaName));
  //
  // // areaName
  // const c = b.map((v) => {
  //   const set = new Set();
  //   v.map(t => set.add(t));
  //   return [...set][0];
  // });

  const c = cityList.filter(v => chooseCity.includes(v.areaCode)).map(t => t.areaName);

  const option = {
    title: {
      left: 'center',
      text: '入网进度',
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
