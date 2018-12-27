import React from 'react';
import { Progress, Button } from 'shineout';
import ReactEcharts from 'echarts-for-react';
import 'echarts/extension/bmap/bmap';
import styles from './style.css';
import { changeCityCenter, staffAttendanceInit } from '../../action';
import assign from 'object-assign';

function getRandomIntInclusive(min, max) {
  const a = Math.ceil(min);
  const b = Math.floor(max);
  return Math.floor(Math.random() * (a - b + 1)) + min;
}

function Color() {
  const r = Math.floor(getRandomIntInclusive(100, 255));
  const g = Math.floor(getRandomIntInclusive(100, 255));
  const b = Math.floor(getRandomIntInclusive(100, 255));
  const color = `rgba(${r},${g},${b},0.8)`;
  return color;
}

export default class BmapCity extends React.Component {
  componentDidMount() {
    console.log('componentDidMount');
    const Instance = this.reactEcharts.getEchartsInstance();
    Instance
      .getModel()
      .getComponent('bmap')
      .getBMap()
      .addControl(new BMap.NavigationControl());
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    const Instance = this.reactEcharts.getEchartsInstance();
    Instance
      .getModel()
      .getComponent('bmap')
      .getBMap()
      .addControl(new BMap.NavigationControl());
  }


  render() {
    const { staffAttendance: { detailData: { dataSource, choosedData, cityCenter } } } = this.props;
    const { staffAttendance: { trend: { dataSource: dataSource1 } } } = this.props;
    const { dispatch } = this.props;
    const {
      TabValue, node, clickedId, cityTree,
    } = this.props;
    let allLongitude = 0;
    let allLatitude = 0;
    let num = 0;
    const lines = dataSource.filter(t => t.workTime > 0).map((v) => {
      if (v.traceInfo) {
        num += (v.traceInfo.length - 1);
      }
      if (v.traceInfo && v.traceInfo.length > 1) {
        const x = v.traceInfo.slice(0, v.traceInfo.length - 1).map((t, idx) => {
          allLongitude += (+t.longitude);
          allLatitude += (+t.latitude);
          return [
            {
              coord: [t.longitude, t.latitude],
              color: Color(),
              executorName: v.executorName,
            },
            {
              coord: [v.traceInfo[idx + 1].longitude, v.traceInfo[idx + 1].latitude],
            },
          ];
        });
        return x;
      }
      return [[
        {
          coord: [],
          color: Color(),
          executorName: v.executorName,
        },
        {
          coord: [],
        },
      ]];
    });

    console.log(lines, 'lines');

    const point = dataSource.filter(t => t.workTime > 0 && t.traceInfo.length > 0).map(v => ({
      id: `${v.executor}`,
      name: `${v.executorName}的终点`,
      value: [v.traceInfo.slice(-1)[0].longitude, v.traceInfo.slice(-1)[0].latitude],
    }));


    const option = {
      animation: false,
      bmap: {
        // center: num ? cityCenter.length > 0 ? cityCenter : lines[0][0][0].coord : [node.lng, node.lat],
        center: [node.lng, node.lat],
        zoom: 12,
        roam: 'move',
      },
      tooltip: {
        trigger: 'axis',
      },


      series:
        lines.map((v, idx) => (
          {
            type: 'lines',
            coordinateSystem: 'bmap',
            data: v,
            tooltip: {
              show: true,
              formatter: () => {
                console.log(1);
                console.log(2);
              },
            },
            lineStyle: {
              normal: {
                type: 'dashed',
                color: v[0] && v[0][0] && v[0][0].color,
                width: 3,
                opacity: 1,
                // shadowColor: 'black',
                shadowBlur: 3,
              },
            },
            animationDelay(idx) {
              return idx * 20;
            },
          }
        )).concat(point.map((v, idx) => (
          {
            type: 'scatter',
            coordinateSystem: 'bmap',
            symbol: 'path://M54.227,12.611c-0.338-0.336-0.736-0.505-1.196-0.505c-0.229,0-0.712,0.188-1.446,0.559  c-0.735,0.372-1.515,0.786-2.336,1.248c-0.823,0.459-1.797,0.875-2.921,1.247c-1.123,0.371-2.163,0.559-3.12,0.559  c-0.884,0-1.664-0.168-2.336-0.505c-2.229-1.044-4.168-1.823-5.814-2.337c-1.646-0.513-3.416-0.771-5.311-0.771  c-3.272,0-6.999,1.064-11.177,3.188c-0.862,0.43-1.48,0.763-1.88,1.007l-0.397-2.911c0.897-0.779,1.476-1.914,1.476-3.195  c0-2.347-1.902-4.249-4.249-4.249c-2.347,0-4.249,1.902-4.249,4.249c0,1.531,0.818,2.862,2.032,3.61l5.74,42.09  c0.171,1.253,1.243,2.162,2.474,2.162c0.112,0,0.226-0.007,0.341-0.022c1.368-0.188,2.326-1.447,2.139-2.815L19.69,38.303  c4.186-2.077,7.807-3.124,10.853-3.124c1.293,0,2.554,0.193,3.783,0.583c1.23,0.391,2.253,0.815,3.067,1.274  c0.814,0.46,1.775,0.886,2.88,1.274c1.107,0.39,2.2,0.585,3.279,0.585c2.726,0,5.991-1.027,9.796-3.08  c0.478-0.248,0.828-0.492,1.049-0.731c0.221-0.239,0.332-0.579,0.332-1.021V13.806C54.729,13.347,54.562,12.948,54.227,12.611z',
            symbolSize: 30,
            symbolOffset: [15, -15],
            tooltip: {
              show: false,
            },
            itemStyle: {
              normal: {
                color: 'red',
                borderWidth: 1,
                borderColor: '#fff',
              },
            },
            label: {
              normal: {
                textStyle: {
                  fontWeight: 'bold',
                  color: 'red',
                },
                show: true,
                position: 'right',
                formatter: '{b}',
              },
            },
            data: [v],
          }
        ))),


    };


    function f(node, id) {
      if (node.cityList.length === 0) {
        return null;
      }
      if (node.cityList.filter(v => v.areaCode === id).length === 1) {
        return node.cityList.filter(v => v.areaCode === id)[0];
      }
      for (const i of node.cityList) {
        return f(i, id);
      }
    }

    return (
      <div className={styles.map}>
        <div className={styles.mapLeft}>
          <div>出勤率:{dataSource1.filter(v => v.dataTime === choosedData)[0] && `${Number(dataSource1.filter(v => v.dataTime === choosedData)[0].workRate * 100).toFixed(2)}%`}</div>
          <div>出勤人数:{lines.length}</div>
          <div>平均工时/h:{dataSource1.filter(v => v.dataTime === choosedData)[0] && Number(dataSource1.filter(v => v.dataTime === choosedData)[0].workTime).toFixed(2)}</div>
          <div>平均路程/km:{dataSource1.filter(v => v.dataTime === choosedData)[0] && Number(dataSource1.filter(v => v.dataTime === choosedData)[0].workDistance).toFixed(2)}</div>
        </div>
        <div className={styles.mapLeft}>
          <div style={{ color: 'red', fontSize: 14 }}>未出勤人员:</div>
          <div className={styles.people}>
            {
              dataSource.map((v) => {
                if (+v.workTime === 0) {
                  return <div style={{ margin: 4 }}>{v.executorName}</div>;
                }
              })
            }
          </div>

        </div>
        <div className={styles.mapLeft}>
          <div style={{ color: 'green', fontSize: 14 }}>出勤人员:</div>
          <div className={styles.people}>
            {
              lines.map(v => (
                <div>
                  <Button
                    size="small"
                    style={{ color: v && v[0] && v[0][0].color, width: 50 }}
                    onClick={() => {
                      dispatch(changeCityCenter(v[0][1].coord));
                    }}
                  >{v && v[0] && v[0][0].executorName}
                  </Button>
                  {/* <Progress color={v && v[0] && v[0][0].color} value={100} style={{ width: '80%' }} /> */}
                </div>
              ))
            }
          </div>
        </div>

        <ReactEcharts
          className={styles.mapRight}
          option={option}
          ref={(node) => { this.reactEcharts = node; }}
          onEvents={{
            click: (param, echarts) => {
              if (param.data.id) {
                if (TabValue === 1) {
                  return dispatch(staffAttendanceInit(assign({}, this.props, {
                    node: Object.assign({}, f(node, param.data.id), {
                      id: `${f(node, param.data.id).level}.${param.data.id}`,
                    }),
                    clickedId: `${f(node, param.data.id).level}.${param.data.id}`,
                  })));
                }
              }
            },
          }}
        />
      </div>
    );
  }
}

