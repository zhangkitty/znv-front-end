import React from 'react';
import { Modal } from 'shineout';
import ReactEcharts from 'echarts-for-react';
import styles from '../style.css';
import { closeMydefineModal } from '../../../action';


export const tmp = (props) => {
  const { dispatch, onlineRate: { headTable: { mydefineActionResult, visiable, mychoose } } } = props;


  const mychooseTable = {
    11: 'onlineNumRate',
    12: 'onlineRate',
    13: 'openRate',
  };


  const data = mydefineActionResult.map(v => v[mychooseTable[mychoose]]).reverse().map(t => t * 100);
  const ydata = mydefineActionResult.map(v => v.areaName || v.executorName).reverse();


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
      visible={visiable}
      onClose={() => dispatch(closeMydefineModal())}
    >
      <ReactEcharts
        style={{ height: data.length * 100 }}
        option={option}
      />
    </Modal>
  );
};

export default tmp;
