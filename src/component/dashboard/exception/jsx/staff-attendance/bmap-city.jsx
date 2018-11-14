import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/extension/bmap/bmap';
import styles from './style.css';


const BmapCity = (props) => {
  const { rawData } = props;

  const lines = rawData.track.slice(0, rawData.track.length - 1).map((seg, idx) =>
    [
      {
        coord: seg.coord,
      },
      {
        coord: rawData.track[idx + 1].coord,
      },
    ]);

  const lines1 = rawData.track.slice(0, rawData.track.length - 1).map((seg, idx) =>
    [
      {
        coord: seg.coord.map(v => v + 0.1),
      },
      {
        coord: rawData.track[idx + 1].coord.map(v => v + 0.1),
      },
    ]);

  const option = {
    animation: false,
    bmap: {
      center: [120.14266322374, 30.235018034923],
      zoom: 12,
      roam: true,
      mapStyle: {
        styleJson: [{
          featureType: 'water',
          elementType: 'all',
          stylers: {
            color: '#d1d1d1',
          },
        }, {
          featureType: 'land',
          elementType: 'all',
          stylers: {
            color: '#f3f3f3',
          },
        }, {
          featureType: 'railway',
          elementType: 'all',
          stylers: {
            visibility: 'off',
          },
        }, {
          featureType: 'highway',
          elementType: 'all',
          stylers: {
            color: '#fdfdfd',
          },
        }, {
          featureType: 'highway',
          elementType: 'labels',
          stylers: {
            visibility: 'off',
          },
        }, {
          featureType: 'arterial',
          elementType: 'geometry',
          stylers: {
            color: '#fefefe',
          },
        }, {
          featureType: 'arterial',
          elementType: 'geometry.fill',
          stylers: {
            color: '#fefefe',
          },
        }, {
          featureType: 'poi',
          elementType: 'all',
          stylers: {
            visibility: 'off',
          },
        }, {
          featureType: 'green',
          elementType: 'all',
          stylers: {
            visibility: 'off',
          },
        }, {
          featureType: 'subway',
          elementType: 'all',
          stylers: {
            visibility: 'off',
          },
        }, {
          featureType: 'manmade',
          elementType: 'all',
          stylers: {
            color: '#d1d1d1',
          },
        }, {
          featureType: 'local',
          elementType: 'all',
          stylers: {
            color: '#d1d1d1',
          },
        }, {
          featureType: 'arterial',
          elementType: 'labels',
          stylers: {
            visibility: 'off',
          },
        }, {
          featureType: 'boundary',
          elementType: 'all',
          stylers: {
            color: '#fefefe',
          },
        }, {
          featureType: 'building',
          elementType: 'all',
          stylers: {
            color: '#d1d1d1',
          },
        }, {
          featureType: 'label',
          elementType: 'geometry.fill',
          stylers: {
            color: '#848484',
          },
        }, {
          featureType: 'label',
          elementType: 'geometry',
          stylers: {
            visibility: 'off',
          },
        }],
      },
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
      {
        type: 'lines',
        coordinateSystem: 'bmap',
        data: lines1,
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
            color: 'red',
          },
        },
        animationDelay(idx) {
          return idx * 20;
        },
      },
    ],
  };
  return (
    <div className={styles.map}>
      <div className={styles.mapLeft}>asfdfaf</div>
      <ReactEcharts
        className={styles.mapRight}
        option={option}
      />
    </div>
  );
};

export default BmapCity;
