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
    map.on('click', e => console.log(e));
    window.AMapUI.loadUI(['control/BasicControl'], (BasicControl) => {
      map.addControl(new BasicControl.Zoom({
        position: 'lt', // left top，左上角
        showZoomNum: true, // 显示zoom值
      }));
    });

    window.AMapUI.loadUI(['overlay/SimpleMarker'], (SimpleMarker) => {
      this.initPage(SimpleMarker);
    });
  }

  fly(PathSimplifier, val) {
    const map = this.props.__map__;

    pathSimplifierIns.setData([
      {
        name: val.executorName,
        path: JSON.parse(`[${val.traceList ? val.traceList : `[${val.longitude},${val.latitude}]`}]`).reverse(),
      },
    ]);
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

    nowtracelist.filter(v => v.traceList != null && v.taskList != null)
      .map((t, idx) => {
        t.taskList.split('|').map((v) => {
          if (v.slice(1, -1).split(',')[0] !== '' && v.slice(1, -1).split(',')[1] !== '') {
            const marker = new AMap.Marker({
              map,
              zIndex: 1,
              position: [v.slice(1, -1).split(',')[0], v.slice(1, -1).split(',')[1]],
            });
          }
        });
      });
  }


  initPage(SimpleMarker) {
    const map = this.props.__map__;

    const { nowtracelist } = this.props.staffAttendance;
    // 创建SimpleMarker实例
    nowtracelist.map((v) => {
      if (v.attendanceStatus == 0) {
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
          iconStyle: 'lightgray',
          // ...其他Marker选项...，不包括content
          map,
          position: [Number(v.longitude) + Math.random() * 0.01, Number(v.latitude) + Math.random() * 0.01],
        });
      } else {
        const marker = new SimpleMarker({
          // 前景文字
          containerClassNames: JSON.stringify(v),
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
          iconStyle: 'green',
          // ...其他Marker选项...，不包括content
          map,
          position: JSON.parse(`[${v.traceList}]`)[0],
        });
        window.AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], (PathSimplifier) => {
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
              return null;
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
          marker.on('click', (e) => {
            const val = JSON.parse(e.target.opts.containerClassNames);
            function onload() {
              pathSimplifierIns.renderLater();
            }

            function onerror(e) {
              alert('图片加载失败！');
            }
            pathSimplifierIns.setData([
              {
                name: val.executorName,
                path: JSON.parse(`[${val.traceList ? val.traceList : `[${val.longitude},${val.latitude}]`}]`).reverse(),
              },
            ]);
            pathSimplifierIns.show();
            const navg0 = pathSimplifierIns.createPathNavigator(0, {
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
            val.taskList.split('|').map((v) => {
              if (v.slice(1, -1).split(',')[0] !== '' && v.slice(1, -1).split(',')[1] !== '') {
                console.log(v);
                AMapUI.loadUI(['overlay/SimpleInfoWindow'], (SimpleInfoWindow) => {
                  const tmp = v.slice(1, -1);
                  const infoWindow = new SimpleInfoWindow({
                    infoTitle: '<strong>任务详情</strong>',
                    infoBody: `<p>设备编号:${tmp.split(',')[4]}</p><p>任务名称:${tmp.split(',')[3]}</p><p>任务时间:${tmp.split(',')[2]}</p>`,
                  });

                  const marker = new AMap.Marker({
                    extData: val.executor,
                    map,
                    zIndex: 1,
                    position: [v.slice(1, -1).split(',')[0], v.slice(1, -1).split(',')[1]],
                  });
                  marker.on('click', (e) => {
                    infoWindow.open(map, marker.getPosition());
                  });
                });
              }
            });
          }, v);

          marker.on('rightclick', (e) => {
            const that = e;
            const arr = map.getAllOverlays('marker').filter((v) => {
              if (v instanceof SimpleMarker) {
                return false;
              }
              return true;
            }).filter(t => (
              JSON.parse(that.target.opts.containerClassNames).executor === t.getExtData()
            ));
            map.remove(arr);
            map.clearInfoWindow();
            pathSimplifierIns.hide();
          });
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
