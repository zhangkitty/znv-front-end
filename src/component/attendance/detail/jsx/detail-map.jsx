import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/extension/bmap/bmap';


export default class PersonMap extends React.Component {
  constructor(props) {
    super(props);
    console.log(1);
  }
  componentDidMount() {
    const map = this.reactEcharts.getEchartsInstance().getModel().getComponent('bmap').getBMap();
    map.addControl(new BMap.NavigationControl());
  }

  componentDidUpdate() {
    const map = this.reactEcharts.getEchartsInstance().getModel().getComponent('bmap').getBMap();
    const { taskList } = this.props;
    const task = taskList.map(v => ({
      name: v.taskName,
      assetCode: v.assetCode,
      recordTime: v.recordTime,
      value: [v.longitude, v.latitude],
    }));


    // map.clearOverlays();
    task.map((v) => {
      const point = new BMap.Point(v.value[0], v.value[1]);
      const marker = new BMap.Marker(point);
      map.addOverlay(marker);
      const infoWindow = new BMap.InfoWindow(`资产编码:${v.assetCode}</br>任务名称:${v.name}</br>执行任务时间:${v.recordTime}`);
      marker.addEventListener('click', () => {
        map.openInfoWindow(infoWindow, point);
      });
      return null;
    });
  }


  render() {
    const { traceList, taskList, dataSource } = this.props;

    const lines = traceList.slice(0, taskList.length - 1).map((v, idx) => [
      {
        coord: [v.longitude, v.latitude],
      },
      {
        coord: [traceList[idx + 1].longitude, traceList[idx + 1].latitude],
      },
    ]);


    const option = {
      animation: false,
      bmap: {
        center: traceList.length > 1 ? [traceList[0].longitude, traceList[1].latitude] : [120.17230173496, 30.244159254102],
        zoom: 12,
        // roam: 'move',
        roam: 'true',
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
              color: 'green',
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
          data: dataSource.length > 0 ? [[dataSource[0].Longitude, dataSource[0].Latitude], [dataSource[1].Longitude, dataSource[1].Latitude]] : [],
        },
      ],
    };

    return (
      <div>
        <ReactEcharts
          style={{ height: '600px', width: '100%' }}
          option={option}
          ref={(node) => { this.reactEcharts = node; }}
        />
      </div>
    );
  }
}
