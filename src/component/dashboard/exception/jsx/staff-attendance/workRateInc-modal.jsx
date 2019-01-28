import React from 'react';
import { Modal } from 'shineout';
import ReactEcharts from 'echarts-for-react';

import { closeWorkRateInc } from '../../action';
import styles from './style.css';


const modal = (props) => {
  const { dispatch, staffAttendance: { workRateIncModal: { visible, dataSource } } } = props;

  const { node } = props;
  const len = node.id.split('.').length;

  const ydata = dataSource.map(v => v.areaName).reverse();
  const data = dataSource.map(v => v.workRateCh * 100).reverse();
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
      axisLabel: {
        show: true,
        interval: 'auto',
        formatter: '{value} %',
      },

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
        barWidth: '10',
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
      onClose={() => dispatch(closeWorkRateInc())}
    >
      {
        len == 3 ? <div>人员出勤率变化详情（今日相比昨日）</div> : <div>城市出勤率变化详情（今日相比昨日）</div>
      }
      <ReactEcharts
        className={styles.workRateIncModalEcharts}
        style={{ height: data.length * 25, minHeight: 300 }}
        option={option}
      />
    </Modal>
  );
};


export default modal;

