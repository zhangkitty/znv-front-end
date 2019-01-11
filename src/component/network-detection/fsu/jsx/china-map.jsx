import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { changeValue, getProviceData, getPicture, intoMap } from '../actions';

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

export default class ChinaMap extends React.Component {
  componentDidMount() {
    const { province, dispatch } = this.props;
    console.log(province, 'province');
    this.reactEcharts.getEchartsInstance().on('click', (params) => {
      if (params.name === '温州市') {
        dispatch(changeValue('bmapShow', true));
        dispatch(intoMap([120.8556079834, 27.9188764652, '442c051f03ff']));
        return null;
      }
      if (params.name === '深圳市') {
        dispatch(changeValue('bmapShow', true));
        dispatch(intoMap([114.0661345267, 22.5485544122, '442c051f0334']));
        return null;
      }
      if (params.data.groupId < 100) {
        dispatch(changeValue('name', params.name));
        dispatch(getProviceData(params.data.groupId));
        this.reactEcharts.getEchartsInstance().setOption(
          {
            title: {
              text: `${params.name}FSU离线率`,
              subtext: '市级图',
              x: 'center',
              y: '5%',
            },
            series: [{
              type: 'map',
              mapType: params.name,
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
              data: province,
            }],
          },
          false,
          false,
        );
      }
    });
  }


  render() {
    const { china, province, name } = this.props;

    if (province.length > 0) {
      this.reactEcharts && this.reactEcharts.getEchartsInstance().setOption(
        {
          series: [{
            type: 'map',
            mapType: name,
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
            data: province,
          }],
        },
        false,
        false,
      );
    }


    const option = {
      // backgroundColor: '#f2f2f2',
      title: {
        text: '全国FSU离线率',
        subtext: '省级图',
        x: 'center',
        y: '5%',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}:{c}',
      },
      roam: true,
      dataRange: {
        min: 0,
        max: 5,
        x: '5%',
        y: '80%',

        splitList: [
          {
            start: 2,
            label: '离线率>=2%',
            color: '#ff704d',

          }, {
            start: 1.3,
            end: 2,
            label: '1.3%<=离线率<2%',
            color: '#80bfff',
          }, {
            start: 0.6,
            end: 1.3,
            label: '0.6%<=离线率<1.3%',
            color: '#5cd65c',
          },

          {
            start: 0,
            end: 0.6,
            label: '离线率<0.6%',
            color: '#b3ffb3',
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
        data: china,

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

