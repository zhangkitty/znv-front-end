import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/extension/bmap/bmap';
import styles from './style.css';
import { changeValue, getPicture, initContent } from '../actions';
import blue from './blue.jpeg';

export default class MyBMap extends React.Component {
  componentDidMount() {
    console.log('componentDidMount');
    let marker;
    let point;
    const { dispatch, bmap: { center, points } } = this.props;
    if (points.length === 0) {
      return null;
    }
    const map = this.reactEcharts.getEchartsInstance().getModel().getComponent('bmap').getBMap();

    map.addControl(new BMap.NavigationControl());

    points.map((v) => {
      point = new BMap.Point(v.lng, v.lat);
      marker = new BMap.Marker(point);
      map.addOverlay(marker);
      marker.addEventListener('click', () => {
        dispatch(changeValue('modelVisiable', true));
        dispatch(getPicture(this.props));
      });
    });
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    let marker;
    let point;
    const { dispatch, bmap: { center, points } } = this.props;
    const map = this.reactEcharts.getEchartsInstance().getModel().getComponent('bmap').getBMap();
    map.addControl(new BMap.NavigationControl());

    const allOverlay = map.getOverlays();
    for (let i = 0; i < allOverlay.length - 1; i++) {
      map.removeOverlay(allOverlay[i]);
    }


    points.map((v) => {
      point = new BMap.Point(v.lng, v.lat);
      // const myIcon = new BMap.Icon(blue, new BMap.Size(23, 25));
      // marker = new BMap.Marker(point, { icon: myIcon });
      marker = new BMap.Marker(point);
      map.addOverlay(marker);
      console.log(v.deviceId, 'v.deviceId');
      marker.addEventListener('click', () => {
        dispatch(initContent(Object.assign({}, this.props, {
          id: v.deviceId,
        })));
        dispatch(changeValue('modelVisiable', true));
        dispatch(getPicture(this.props));
      });
    });
  }


  render() {
    const { dispatch, bmap: { center, Points } } = this.props;
    const option = {
      animation: false,
      bmap: {
        center,
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
        <div style={{ backgroundImage: blue }}>aa</div>
      </div>
    );
  }
}
