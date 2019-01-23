import React from 'react';
import { Modal } from 'shineout';
import ReactEcharts from 'echarts-for-react';
import styles from '../style.css';
import { closeMydefineModal } from '../../../action';


export const tmp = (props) => {
  const { dispatch, onlineRate: { headTable: { mydefineActionResult, visiable, mychoose } } } = props;
  const { node } = props;
  const len = node.id.split('.').length;


  const mychooseTable = {
    11: 'onlineNumRate',
    12: 'onlineRate',
    13: 'openRate',
  };

  const mychooseTable_cn = {
    11: '广告机在线率',
    12: 'FSU在线率',
    13: '入网进度',
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
      visible={visiable}
      onClose={() => dispatch(closeMydefineModal())}
    >
      {
        len === 3 ? <div>人员{mychooseTable_cn[mychoose]}变化详情（今日相比昨日）</div> : <div>城市{mychooseTable_cn[mychoose]}变化详情（今日相比昨日）</div>
      }
      <ReactEcharts
        style={{ height: data.length * 25 }}
        option={option}
      />
    </Modal>
  );
};

export default tmp;
