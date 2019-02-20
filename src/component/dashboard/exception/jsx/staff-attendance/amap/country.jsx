import React from 'react';
import { Map as Amap } from 'react-amap';
import { Wrapper, DistrictExplorer } from 'react-amapui-wrapper';
import { getNowtracelist } from '../../../action';
import styles from './style.css';

const car = require('./car.png');


class UIMarker extends React.Component {
  constructor() {
    super();
  }

  loadUI() {
    this.props.__map__.clearMap();
    const map = this.props.__map__;
    window.AMapUI.loadUI(['control/BasicControl'], (BasicControl) => {
      map.addControl(new BasicControl.Zoom({
        position: 'lt', // left top，左上角
        showZoomNum: true, // 显示zoom值
      }));
    });

    window.AMapUI.loadUI(['overlay/SimpleMarker'], (SimpleMarker) => {
      this.initPage(SimpleMarker);
    });

    window.AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], (PathSimplifier) => {
      this.allfly(PathSimplifier);
    });
  }

  fly(pathSimplifierIns, t, idx) {
    // 设置数据
    pathSimplifierIns.setData([
      {
        name: idx,
        path: [
          t.traceList,
        ],
      },
    ]);
    // 对第一条线路（即索引 0）创建一个巡航器
    const navg = pathSimplifierIns.createPathNavigator(idx, {
      loop: true, // 循环播放
      speed: 5000, // 巡航速度，单位千米/小时
    });
    navg.start();
  }

  allfly(PathSimplifier) {
    const map = this.props.__map__;
    if (!PathSimplifier.supportCanvas) {
      alert('当前环境不支持 Canvas！');
      return;
    }
    const colors = [
      '#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00',
      '#b82e2e', '#316395', '#994499', '#22aa99', '#aaaa11', '#6633cc', '#e67300', '#8b0707',
      '#651067', '#329262', '#5574a6', '#3b3eac',
    ];
    const pathSimplifierIns = new PathSimplifier({
      zIndex: 100,
      // autoSetFitView:false,
      map, // 所属的地图实例

      getPath(pathData) {
        return pathData.path;
      },
      getHoverTitle(pathData, pathIndex, pointIndex) {
        return pathData.name;
        if (pointIndex >= 0) {
          // point
          return `${pathData.name}，点：${pointIndex}/${pathData.path.length}`;
        }

        return `${pathData.name}，点数量${pathData.path.length}`;
      },
      renderOptions: {
        pathLineStyle: {
          dirArrowStyle: true,
        },
        getPathStyle(pathItem, zoom) {
          let color = colors[pathItem.pathIndex % colors.length],
            lineWidth = Math.round(4 * Math.pow(1.1, zoom - 3));

          return {
            pathLineStyle: {
              strokeStyle: color,
              lineWidth,
            },
            pathLineSelectedStyle: {
              lineWidth: lineWidth + 2,
            },
            pathNavigatorStyle: {
              fillStyle: color,
            },
          };
        },
      },
    });
    const { nowtracelist } = this.props.staffAttendance;


    pathSimplifierIns.setData(nowtracelist.filter(v => v.traceList != null).map((t, idx) => (
      {
        name: t.executorName,
        path: JSON.parse(`[${t.traceList ? t.traceList : `[${t.longitude},${t.latitude}]`}]`).reverse(),
      }
    )));


    nowtracelist.filter(v => v.traceList != null).map((t, idx) => {
      function onload() {
        pathSimplifierIns.renderLater();
      }

      function onerror(e) {
        alert('图片加载失败！');
      }
      const navg0 = pathSimplifierIns.createPathNavigator(idx, {
        loop: true, // 循环播放
        speed: 1000,
        pathNavigatorStyle: {
          autoRotate: true, // 禁止调整方向
          pathLinePassedStyle: null,
          width: 12,
          height: 12,
          content: PathSimplifier.Render.Canvas.getImageContent(car, onload, onerror),
          strokeStyle: null,
          fillStyle: null,
        },
      });

      navg0.start();
    });
  }


  initPage(SimpleMarker) {
    const map = this.props.__map__;

    const { nowtracelist } = this.props.staffAttendance;
    // 创建SimpleMarker实例
    nowtracelist.map((v) => {
      if (v.traceList == null) {
        new SimpleMarker({
          // 前景文字
          iconLabel: {
            innerHTML: `<i>${v.executorName}</i>`, // 设置文字内容
            style: {
              color: '#fff', // 设置文字颜色
              fontSize: '12px',
              transform: 'scale(0.8)',
            },
          },
          // 图标主题
          iconTheme: 'fresh',
          // 背景图标样式
          iconStyle: 'red',
          // ...其他Marker选项...，不包括content
          map,
          position: [v.longitude, v.latitude],
        });
      } else {
        new SimpleMarker({
          // 前景文字
          iconLabel: {
            innerHTML: `<i>${v.executorName}</i>`, // 设置文字内容
            style: {
              color: '#fff', // 设置文字颜色
              fontSize: '12px',
              transform: 'scale(0.8)',
            },
          },
          // 图标主题
          iconTheme: 'fresh',
          // 背景图标样式
          iconStyle: 'black',
          // ...其他Marker选项...，不包括content
          map,
          position: JSON.parse(`[${v.traceList}]`)[0],
        });
      }
    });
  }

  render() {
    this.loadUI();
    return null;
  }
}


export default class tmp extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch(getNowtracelist());
    // setInterval(
    //   () => dispatch(getNowtracelist()),
    //   100000,
    // );
  }


  render() {
    const initCallback = () => {
      console.log('AMapUI Loaded Done');
    };
    return (
      <div style={{ width: '100%', height: '800px' }}>
        <Amap useAMapUI={initCallback} >
          <UIMarker {...this.props} />
        </Amap>
      </div>
    );
  }
}
