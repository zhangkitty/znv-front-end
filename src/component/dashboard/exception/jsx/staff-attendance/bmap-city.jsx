import React from 'react';
import { Progress, Button } from 'shineout';
import ReactEcharts from 'echarts-for-react';
import 'echarts/extension/bmap/bmap';
import styles from './style.css';
import { changeCityCenter } from '../../action';

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
    this.reactEcharts.getEchartsInstance()
      .getModel()
      .getComponent('bmap')
      .getBMap()
      .addControl(new BMap.NavigationControl());
  }

  render() {
    const { staffAttendance: { detailData: { dataSource, choosedData, cityCenter } } } = this.props;
    const { staffAttendance: { trend: { dataSource: dataSource1 } } } = this.props;
    const { dispatch } = this.props;
    let allLongitude = 0;
    let allLatitude = 0;
    let num = 0;
    console.log(dataSource, 'pppppppppp');
    const lines = dataSource.filter(t => t.workTime > 0).map((v) => {
      if (v.traceInfo) {
        num += (v.traceInfo.length - 1);
      }
      if (v.traceInfo && v.traceInfo.length > 0) {
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

    console.log(allLatitude, 'sb', allLongitude, 'mdzz');
    console.log(num);


    const option = {
      animation: false,
      bmap: {
        center: num ? cityCenter.length > 0 ? cityCenter : lines[0][0][0].coord : [118.7845062719, 31.8446580547],
        zoom: 13,
        roam: true,
      },
      tooltip: {
        trigger: 'axis',
      },


      series: lines.map((v, idx) => (
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
      )),
    };
    return (
      <div className={styles.map}>
        <div className={styles.mapLeft}>
          <div>出勤率:</div>
          <div style={{ marginBottom: 10 }}>{dataSource1.filter(v => v.dataTime === choosedData)[0] && `${Number(dataSource1.filter(v => v.dataTime === choosedData)[0].workRate * 100).toFixed(2)}%`}</div>
          <div>出勤人数:</div>
          <div style={{ marginBottom: 10 }}>{lines.length}</div>
          <div>平均工时/h:</div>
          <div style={{ marginBottom: 10 }}>{dataSource1.filter(v => v.dataTime === choosedData)[0] && Number(dataSource1.filter(v => v.dataTime === choosedData)[0].workTime).toFixed(2)}</div>
          <div>平均路程/km:</div>
          <div style={{ marginBottom: 10 }}>{dataSource1.filter(v => v.dataTime === choosedData)[0] && Number(dataSource1.filter(v => v.dataTime === choosedData)[0].workDistance).toFixed(2)}</div>
          <div style={{ color: 'red', fontSize: 14 }}>未出勤人员:</div>
          {
            dataSource.map((v) => {
              if (+v.workTime === 0) {
                return <div style={{ marginBottom: 8 }}>{v.executorName}</div>;
              }
            })
          }
          <div style={{ color: 'green', fontSize: 14 }}>出勤人员:</div>
          {
            lines.map(v => (
              <div style={{ marginBottom: 8 }}>
                <Button
                  size="small"
                  style={{ color: v && v[0] && v[0][0].color, width: 50 }}
                  onClick={() => {
                    console.log(lines);
                    console.log(v);
                    dispatch(changeCityCenter(v[0][1].coord));
                  }}
                >{v && v[0] && v[0][0].executorName}
                </Button>
                <Progress color={v && v[0] && v[0][0].color} value={100} style={{ width: '80%' }} />
              </div>
            ))
          }
        </div>
        <ReactEcharts
          className={styles.mapRight}
          option={option}
          ref={(node) => { this.reactEcharts = node; }}
        />
      </div>
    );
  }
}

