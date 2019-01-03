import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/extension/bmap/bmap';
import styles from './style.css';
import { changeMarker } from '../../action';


export default class BmapCity extends React.Component {
  constructor(props) {
    super(props);
    this.marker = [];
  }


  componentDidMount() {
    this.reactEcharts.getEchartsInstance().getModel().getComponent('bmap').getBMap()
      .addControl(new BMap.NavigationControl());
    const { staffAttendance: { detailData: { dataSourcePerson, dataSourceTask } } } = this.props;
    const task = dataSourceTask.map(v => ({
      name: v.taskName,
      assetCode: v.assetCode,
      recordTime: v.recordTime,
      value: [v.longitude, v.latitude],
    }));
    const map = this.reactEcharts.getEchartsInstance().getModel().getComponent('bmap').getBMap();

    task.map((v) => {
      const point = new BMap.Point(v.value[0], v.value[1]);
      const marker = new BMap.Marker(point);
      map.addOverlay(marker);
      this.marker.push(marker);
      const infoWindow = new BMap.InfoWindow(`资产编码:${v.assetCode}</br>任务名称:${v.name}</br>执行任务时间:${v.recordTime}`);
      marker.addEventListener('click', () => {
        map.openInfoWindow(infoWindow, point);
      });
      return null;
    });
  }

  componentDidUpdate() {
    const { staffAttendance: { detailData: { dataSourcePerson, dataSourceTask } } } = this.props;

    const task = dataSourceTask.map(v => ({
      name: v.taskName,
      assetCode: v.assetCode,
      recordTime: v.recordTime,
      value: [v.longitude, v.latitude],
    }));
    const map = this.reactEcharts.getEchartsInstance().getModel().getComponent('bmap').getBMap();

    this.marker.map(v => map.removeOverlay(v));

    // map.clearOverlays();
    task.map((v) => {
      const point = new BMap.Point(v.value[0], v.value[1]);
      const marker = new BMap.Marker(point);
      map.addOverlay(marker);
      this.marker.push(marker);
      const infoWindow = new BMap.InfoWindow(`资产编码:${v.assetCode}</br>任务名称:${v.name}</br>执行任务时间:${v.recordTime}`);
      marker.addEventListener('click', () => {
        map.openInfoWindow(infoWindow, point);
      });
      return null;
    });
  }

  render() {
    const { staffAttendance: { detailData: { dataSourcePerson, dataSourceTask } } } = this.props;
    const { node } = this.props;
    let allLatitude = 0;
    let allLongitude = 0;
    let num = 0;

    const lines = dataSourcePerson.slice(0, dataSourcePerson.length - 1).map((v, idx) => {
      allLatitude += (+v.latitude);
      allLongitude += (+v.longitude);
      return [
        {
          coord: [v.longitude, v.latitude],
        },
        {
          coord: [dataSourcePerson[idx + 1].longitude, dataSourcePerson[idx + 1].latitude],
        },
      ];
    });


    const task = dataSourceTask.map(v => ({
      name: v.taskName,
      value: [v.longitude, v.latitude],
    }));


    num = lines.length;


    const option = {
      animation: false,
      bmap: {
        center: num ? [allLongitude / num, allLatitude / num] : [node.lng, node.lat],
        zoom: 15,
        roam: 'move',
        NavigationControl: true,
        ScaleControl: true,
        OverviewMapControl: true,
        MapTypeControl: true,
      },
      tooltip: {
        trigger: 'axis',
      },


      series: [
        {
          type: 'lines',
          coordinateSystem: 'bmap',
          data: lines,
          tooltip: {
            show: false,
          },
          lineStyle: {
            normal: {
              type: 'dashed',
              width: 3,
              opacity: 1,
              Color: 'rgba(224, 116, 200,1)',
              shadowBlur: 3,
            },
            emphasis: {
              color: '#f6fd40',
            },
          },
          animationDelay(idx) {
            return idx * 20;
          },
        },
      ],
    };
    return (
      <div className={styles.mapPerson}>
        <ReactEcharts
          style={{ height: '100%' }}
          option={option}
          className="react_for_echarts"
          ref={(node) => { this.reactEcharts = node; }}
        />
      </div>
    );
  }
}

