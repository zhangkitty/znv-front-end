import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/extension/bmap/bmap';
import styles from './style.css';


function Color() {
  this.r = Math.floor(Math.random() * 255);
  this.g = Math.floor(Math.random() * 255);
  this.b = Math.floor(Math.random() * 255);
  this.color = `rgba(${this.r},${this.g},${this.b},0.8)`;
}

const BmapCity = (props) => {
  // const { rawData } = props;

  const { staffAttendance: { detailData: { dataSource } } } = props;


  // const lines = rawData.track.slice(0, rawData.track.length - 1).map((seg, idx) =>
  //   [
  //     {
  //       coord: seg.coord,
  //     },
  //     {
  //       coord: rawData.track[idx + 1].coord,
  //     },
  //   ]);
  //
  // const lines1 = rawData.track.slice(0, rawData.track.length - 1).map((seg, idx) =>
  //   [
  //     {
  //       coord: seg.coord.map(v => v + 0.1),
  //     },
  //     {
  //       coord: rawData.track[idx + 1].coord.map(v => v + 0.1),
  //     },
  //   ]);


  let allLongitude = 0;
  let allLatitude = 0;
  let num = 0;
  const lines = dataSource.map((v) => {
    num += (v.traceInfo.length - 1);
    if (v.traceInfo && v.traceInfo.length > 0) {
      const x = v.traceInfo.slice(0, v.traceInfo.length - 1).map((t, idx) => {
        allLongitude += (+t.longitude);
        allLatitude += (+t.latitude);
        return [
          {
            coord: [t.longitude, t.latitude],
          },
          {
            coord: [v.traceInfo[idx + 1].longitude, v.traceInfo[idx + 1].latitude],
          },
        ];
      });
      return x;
    }
    return null;
  });

  // const color = lines.map(v=>Math.random())
  if (lines.length > 0) {
  }


  const option = {
    animation: false,
    bmap: {
      center: num ? [allLongitude / num, allLatitude / num] : [120.14266322374, 30.235018034923],
      zoom: 12,
      roam: true,
      // mapStyle: {
      //   styleJson: [{
      //     featureType: 'water',
      //     elementType: 'all',
      //     stylers: {
      //       color: '#d1d1d1',
      //     },
      //   }, {
      //     featureType: 'land',
      //     elementType: 'all',
      //     stylers: {
      //       color: '#f3f3f3',
      //     },
      //   }, {
      //     featureType: 'railway',
      //     elementType: 'all',
      //     stylers: {
      //       visibility: 'off',
      //     },
      //   }, {
      //     featureType: 'highway',
      //     elementType: 'all',
      //     stylers: {
      //       color: '#fdfdfd',
      //     },
      //   }, {
      //     featureType: 'highway',
      //     elementType: 'labels',
      //     stylers: {
      //       visibility: 'off',
      //     },
      //   }, {
      //     featureType: 'arterial',
      //     elementType: 'geometry',
      //     stylers: {
      //       color: '#fefefe',
      //     },
      //   }, {
      //     featureType: 'arterial',
      //     elementType: 'geometry.fill',
      //     stylers: {
      //       color: '#fefefe',
      //     },
      //   }, {
      //     featureType: 'poi',
      //     elementType: 'all',
      //     stylers: {
      //       visibility: 'off',
      //     },
      //   }, {
      //     featureType: 'green',
      //     elementType: 'all',
      //     stylers: {
      //       visibility: 'off',
      //     },
      //   }, {
      //     featureType: 'subway',
      //     elementType: 'all',
      //     stylers: {
      //       visibility: 'off',
      //     },
      //   }, {
      //     featureType: 'manmade',
      //     elementType: 'all',
      //     stylers: {
      //       color: '#d1d1d1',
      //     },
      //   }, {
      //     featureType: 'local',
      //     elementType: 'all',
      //     stylers: {
      //       color: '#d1d1d1',
      //     },
      //   }, {
      //     featureType: 'arterial',
      //     elementType: 'labels',
      //     stylers: {
      //       visibility: 'off',
      //     },
      //   }, {
      //     featureType: 'boundary',
      //     elementType: 'all',
      //     stylers: {
      //       color: '#fefefe',
      //     },
      //   }, {
      //     featureType: 'building',
      //     elementType: 'all',
      //     stylers: {
      //       color: '#d1d1d1',
      //     },
      //   }, {
      //     featureType: 'label',
      //     elementType: 'geometry.fill',
      //     stylers: {
      //       color: '#848484',
      //     },
      //   }, {
      //     featureType: 'label',
      //     elementType: 'geometry',
      //     stylers: {
      //       visibility: 'off',
      //     },
      //   }],
      // },
    },
    tooltip: {
      trigger: 'axis',
    },


    series: lines.length > 0 ? lines.map(v => (
      {
        type: 'lines',
        coordinateSystem: 'bmap',
        data: v,
        tooltip: {
          show: true,
        },
        lineStyle: {
          normal: {
            width: 1,
            opacity: 1,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 3,
          },
          emphasis: {
            color: 'blue',
          },
        },
        animationDelay(idx) {
          return idx * 20;
        },
      }
    )) :
      [
        {
          type: 'lines',
          coordinateSystem: 'bmap',
          data: lines[0],
          tooltip: {
            show: true,
          },
          lineStyle: {
            normal: {
              width: 1,
              opacity: 1,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 3,
            },
            emphasis: {
              color: 'blue',
            },
          },
          animationDelay(idx) {
            return idx * 20;
          },
        },
      ],
    // [
    // {
    //   type: 'lines',
    //   coordinateSystem: 'bmap',
    //   data: lines,
    //   tooltip: {
    //     show: true,
    //   },
    //   lineStyle: {
    //     normal: {
    //       width: 1,
    //       opacity: 1,
    //       shadowColor: 'rgba(0, 0, 0, 0.5)',
    //       shadowBlur: 3,
    //     },
    //     emphasis: {
    //       color: 'blue',
    //     },
    //   },
    //   animationDelay(idx) {
    //     return idx * 20;
    //   },
    // },
    // {
    //   type: 'lines',
    //   coordinateSystem: 'bmap',
    //   data: lines1,
    //   tooltip: {
    //     show: true,
    //   },
    //   lineStyle: {
    //     normal: {
    //       width: 1,
    //       opacity: 1,
    //       shadowColor: 'rgba(0, 0, 0, 0.5)',
    //       shadowBlur: 3,
    //     },
    //     emphasis: {
    //       color: 'black',
    //     },
    //   },
    //   animationDelay(idx) {
    //     return idx * 20;
    //   },
    // },
    // {
    //   type: 'lines',
    //   coordinateSystem: 'bmap',
    //   data: lines[0],
    //   tooltip: {
    //     show: true,
    //   },
    //   lineStyle: {
    //     normal: {
    //       width: 1,
    //       opacity: 1,
    //       shadowColor: 'rgba(0, 0, 0, 0.5)',
    //       shadowBlur: 3,
    //     },
    //     emphasis: {
    //       color: 'black',
    //     },
    //   },
    //   // animationDelay(idx) {
    //   //   return idx * 20;
    //   // },
    // },
    // {
    //   type: 'lines',
    //   coordinateSystem: 'bmap',
    //   data: lines[1],
    //   tooltip: {
    //     show: true,
    //   },
    //   lineStyle: {
    //     normal: {
    //       width: 1,
    //       opacity: 1,
    //       shadowColor: 'rgba(0, 0, 0, 0.5)',
    //       shadowBlur: 3,
    //     },
    //     emphasis: {
    //       color: 'red',
    //     },
    //   },
    //   // animationDelay(idx) {
    //   //   return idx * 20;
    //   // },
    // },
    // ],
  };
  return (
    <div className={styles.map}>
      <div className={styles.mapLeft}>
        {
          dataSource.map(v => (
            <div style={{ background: (new Color()).color }}>{v.executorName}</div>
          ))
        }
      </div>
      <ReactEcharts
        className={styles.mapRight}
        option={option}
      />
    </div>
  );
};

export default BmapCity;
