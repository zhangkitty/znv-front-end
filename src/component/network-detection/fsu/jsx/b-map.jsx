import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/extension/bmap/bmap';
import styles from './style.css';
import Content from './content';
import { changeValue, getPicture } from '../actions';

export default class MyBMap extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const map = this.reactEcharts.getEchartsInstance().getModel().getComponent('bmap').getBMap();

    map.addControl(new BMap.NavigationControl());

    const point = new BMap.Point(120.8556079834, 27.9188764652);
    const marker = new BMap.Marker(point);
    map.addOverlay(marker);
    const infoWindow = new BMap.InfoWindow('');
    marker.addEventListener('click', () => {
      // map.openInfoWindow(infoWindow, point);
      dispatch(changeValue('modelVisiable', true));
      dispatch(getPicture(this.props));
    });
  }


  render() {
    const option = {
      animation: false,
      bmap: {
        center: [120.8556079834, 27.9188764652],
        zoom: 15,
        roam: true,
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
          data: [],
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
