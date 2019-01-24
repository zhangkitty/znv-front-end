import React from 'react';
import ReactEcharts from 'echarts-for-react';

import { getLastcoordinate } from '../../../action';

require('echarts-amap');


export default class tmp extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    setInterval(
      () => dispatch(getLastcoordinate()),
      10000,
    );
  }

  render() {
    const option = {
      amap: {
        center: [116.397475, 39.908695],
        zoom: 5,
        // mapStyle: 'blue_night',
      },
      series: [{
        type: 'effectScatter',
        coordinateSystem: 'amap',
        rippleEffect: {
          brushType: 'stroke',
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: '{b}',
          },
        },
        symbolSize: 20,
        itemStyle: {
          normal: {
            color: '#f44336',
          },
        },
        data: [{
          name: '首都',
          value: [116.397475, 39.908695],
        }],
      }],
    };
    return (
      <div>
        <hr />
        <ReactEcharts
          option={option}
        />
      </div>
    );
  }
}
