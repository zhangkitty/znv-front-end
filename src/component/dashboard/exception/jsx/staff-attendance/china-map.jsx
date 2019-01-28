import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import { Table } from 'shineout';

require('echarts/map/js/china.js');
require('echarts/map/js/province/jiangsu');
require('echarts/map/js/province/zhejiang');
require('echarts/map/js/province/anhui');
require('echarts/map/js/province/aomen');
require('echarts/map/js/province/beijing');
require('echarts/map/js/province/chongqing');
require('echarts/map/js/province/fujian');
require('echarts/map/js/province/gansu');
require('echarts/map/js/province/guangdong');
require('echarts/map/js/province/guangxi');
require('echarts/map/js/province/guizhou');
require('echarts/map/js/province/hainan');
require('echarts/map/js/province/hebei');
require('echarts/map/js/province/heilongjiang');
require('echarts/map/js/province/henan');
require('echarts/map/js/province/hubei');
require('echarts/map/js/province/hunan');
require('echarts/map/js/province/jiangxi');
require('echarts/map/js/province/jilin');
require('echarts/map/js/province/liaoning');
require('echarts/map/js/province/neimenggu');
require('echarts/map/js/province/ningxia');
require('echarts/map/js/province/qinghai');
require('echarts/map/js/province/shandong');
require('echarts/map/js/province/shanghai');
require('echarts/map/js/province/shanxi');
require('echarts/map/js/province/shanxi1');
require('echarts/map/js/province/sichuan');
require('echarts/map/js/province/taiwan');
require('echarts/map/js/province/tianjin');
require('echarts/map/js/province/xianggang');
require('echarts/map/js/province/xinjiang');
require('echarts/map/js/province/xizang');
require('echarts/map/js/province/yunnan');

function addStr(str) {
  if (str) {
    return str.padEnd(10, ' ');
  }
  return ''.padEnd(10, ' ');
}

export default class ChinaMap extends React.Component {
  state={
    // 两个图层之间的跳转
    jump: false,
  }

  componentDidMount() {
    const { staffAttendance: { detailData: { dataSource } } } = this.props;
    this.reactEcharts.getEchartsInstance().on('click', (params) => {
      if (['上海', '北京', '天津', '重庆'].includes(params.name)) {
        return null;
      }
      if (params.name === '') {
        this.setState({ jump: !this.state.jump });
      }


      const cityRateRspDto = params.data.dataSource.filter(v => v.areaCode === params.data.areaCode)[0].cityRateRspDto;
      this.reactEcharts.getEchartsInstance().setOption(
        {
          title: {
            text: `${params.name}省考勤率`,
            subtext: '省级图',
            x: 'center',
            y: '5%',
          },
          series: [{
            type: 'map',
            mapType: `${params.name}`,
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
            data: cityRateRspDto.map(v => Object.assign({}, v, {
              name: v.areaName,
              value: v.workRate,
            })),
          }],
        },
        false,
        false,
      );
    });
  }


  render() {
    console.log(this.state.visible);
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
    const { staffAttendance: { detailData: { dataSource } } } = this.props;
    const mydata = dataSource.map(v => ({
      name: map[v.areaCode],
      value: v.workRate,
      areaCode: v.areaCode,
      dataSource,
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


            return value.map(t => `城市:${addStr(t.areaName)}|出勤人数:${addStr(t.workNum)}|出勤率${addStr(Number(t.workRate * 100).toFixed(2))}%|平均工时${addStr(Number(t.workTime).toFixed(2))}h|平均路程${addStr(Number(t.workDistance).toFixed(2))}km`).join('</br>');
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
          ref={(node) => { this.reactEcharts = node; }}
        />
      </div>
    );
  }
}

