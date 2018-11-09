import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

require('echarts/map/js/province/jiangsu.js');


const ProvinceMap = (props) => {
  const option = {
    series: [{
      type: 'map',
      mapType: '江苏',
      itemStyle: {
        normal: {
          label: {
            show: true,
          },
        },
        emphasis: {
          label: {
            show: true,
          },
        },
      },
    }],
  };
  return (
    <div>
      <ReactEcharts
        option={option}
        style={{ height: 800 }}
      />
    </div>
  );
};

export default ProvinceMap;
