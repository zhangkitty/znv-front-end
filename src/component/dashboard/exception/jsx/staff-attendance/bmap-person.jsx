import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/extension/bmap/bmap';
import styles from './style.css';


const BmapCity = (props) => {
  const { staffAttendance: { detailData: { dataSourcePerson } } } = props;


  let allLatitude = 0;
  let allLongitude = 0;
  let num = 0;

  const lines = dataSourcePerson.slice(0, dataSourcePerson.length - 1).map((v, idx) => {
    allLatitude += (+v.latitude);
    allLongitude += (+v.longitude);
    return [
      {
        coord: [v.latitude, v.longitude],
      },
      {
        coord: [dataSourcePerson[idx + 1].latitude, dataSourcePerson[idx + 1].longitude],
      },
    ];
  });
  num = lines.length;


  const option = {
    animation: false,
    bmap: {
      center: num ? [allLatitude / num, allLongitude / num] : [120.14266322374, 30.235018034923],
      zoom: 13,
      roam: true,
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
            width: 6,
            opacity: 1,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
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
      />
    </div>
  );
};

export default BmapCity;
