import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import { Table } from 'shineout';

require('echarts/map/js/china.js');

function addStr(str) {
  if (str) {
    return str.padEnd(10, ' ');
  }
  return ''.padEnd(10, ' ');
}

const ChinaMap = (props) => {
  const map = {
    130000: '河北',
    370000: '山东',
    410000: '河南',
    500000: '重庆',
    450000: '广西',
    510000: '四川',
    460000: '海南',
    110000: '北京',
    120000: '天津',
    310000: '上海',
    320000: '江苏',
    330000: '浙江',
    350000: '福建',
    340000: '安徽',
    360000: '江西',
    420000: '湖北',
    430000: '湖南',
    440000: '广东',
    210000: '辽宁',
    220000: '吉林',
    230000: '黑龙江',
    150000: '内蒙古',
    530000: '云南',
    520000: '贵州',
    140000: '山西',
    610000: '陕西',
    620000: '甘肃',
    650000: '新疆',
    540000: '西藏',
    630000: '青海',
    640000: '宁夏',
  };
  const { staffAttendance: { detailData: { dataSource } } } = props;
  const mydata = dataSource.map(v => ({
    name: map[v.areaCode],
    value: v.workRate,
  }));

  const tipData = dataSource.map(v => ({
    name: map[v.areaCode],
    value: v.cityRateRspDto,
  }));


  const option = {
    // backgroundColor: '#f2f2f2',
    title: {
      text: '全国运维人员出勤率',
      subtext: '省级图',
      x: 'center',
      y: '5%',
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        let value;
        tipData.map((v) => {
          if (v.name === params.name) {
            value = v.value;
            console.log(value, 'value');
            return 1;
          }
          return 1;
        });
        if (value) {
          // if (value[0].areaName !== '城市') {
          //   value.unshift({
          //     areaName: '城市',
          //     workNum: '出勤人数',
          //     workRate: '出勤率',
          //     workTime: '平均工时',
          //     workDistance: '平均路程',
          //   });
          // }
          console.log(value, '66666666');


          return value.map(t => `城市:${addStr(t.areaName)}|出勤人数:${addStr(t.workNum)}|出勤率${addStr(Number(t.workRate * 100).toFixed(2))}%|平均工时${addStr(Number(t.workTime * 100).toFixed(2))}h|平均路程${addStr(Number(t.workDistance * 100).toFixed(2))}km`).join('</br>');
        }
        return '';
      },
    },
    roam: true,
    dataRange: {
      min: 0,
      max: 5,
      x: '5%',
      y: '80%',

      splitList: [
        {
          start: 1,
          end: 2,
          label: '出勤率=100%',
          color: '#b3ffb3',

        }, {
          start: 0.9,
          end: 0.99999,
          label: '90%<=出勤率<100%',
          color: '#80bfff',
        }, {
          start: 0.8,
          end: 0.899999,
          label: '80%<=出勤率<90%',
          color: '#ff704d',
        },

        {
          start: 0,
          end: 0.799999,
          label: '出勤率<80%',
          color: '#5cd65c',
        },

      ],
      color: ['red', 'gold', 'lightgrey'],

    },
    toolbox: {
      show: true,
      itemGap: 20,
      orient: 'vertical',
      x: 'right',
      y: 'center',
      feature: {
        mark: {
          show: true,
        },
        dataView: {
          show: true,
          readOnly: false,
        },
        dataZoom: {
          show: true,
        },
        restore: {
          show: true,
        },
        saveAsImage: {
          show: true,
        },
      },
    },
    roamController: {
      show: true,
      x: 'right',
      mapTypeControl: {
        china: true,
      },
    },
    series: [{
      // name: '生猪',
      type: 'map',
      mapType: 'china',
      roam: false,
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
      data: mydata,
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

export default ChinaMap;

