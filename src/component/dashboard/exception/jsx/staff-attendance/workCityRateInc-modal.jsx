import React from 'react';
import { Modal } from 'shineout';
import ReactEcharts from 'echarts-for-react';

import { closeCityWorkRateInc } from '../../action';
import styles from './style.css';


const modal = (props) => {
  const { dispatch, staffAttendance: { workCityRateIncModal: { visible, dataSource } } } = props;

  const labelRight = {
    normal: {
      position: 'right',
    },
  };
  const ydata = dataSource.map(v => v.executorName).reverse();
  const data = dataSource.map(v => v.workStatus).reverse();
  // const data = dataSource.map(v => v.workRateCh * 100).reverse().map((t) => {
  //   if (t == 0) {
  //     return { value: 0, label: labelRight };
  //   }
  //   return t;
  // });


  const option = {
    color: ['#3398DB'],


    xAxis: {
      type: 'value',
      position: 'top',
      splitLine: { lineStyle: { type: 'dashed' } },
      // axisLabel: {
      //   show: true,
      //   interval: 'auto',
      //   formatter: '{value} %',
      // },

    },
    yAxis: {
      type: 'category',
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      data: ydata,
      splitLine: {
        lineStyle: { color: 'blue' },
      },
    },
    series: [
      {
        name: '生活费',
        type: 'bar',
        stack: '总量',
        itemStyle: {
          color(params) {
            const index_color = params.value;
            if (index_color < 0) {
              return 'green';
            }
            if (index_color > 0) {
              return 'red';
            }
            return 'black';
          },
        },
        label: {
          normal: {
            show: true,
            formatter: '{b}',
          },
        },
        data,
      },
    ],
  };

  return (
    <Modal
      className={styles.workRateIncModal}
      visible={visible}
      onClose={() => dispatch(closeCityWorkRateInc())}
    >
      <ReactEcharts
        className={styles.workRateIncModalEcharts}
        option={option}
      />
    </Modal>
  );
};


export default modal;

