import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Button } from 'shineout';
import { changeMeteButton } from '../actions';


const mete = (props) => {
  const { dispatch, meteTable, idx } = props;
  const { isShow, dataSource } = meteTable[idx];
  const X = dataSource.map(v => v.statHour || v.statDay);
  const YMAX = dataSource.map(v => v.maxValue);
  const YMIN = dataSource.map(v => v.minValue);

  const option = {

    legend: {
      data: ['最大值', '最小值'],
      bottom: 0,
    },
    grid: {
      y: 20,
      y2: 40,
    },

    xAxis: {
      type: 'category',
      data: X,
    },

    yAxis: {
      type: 'value',
      min(value) {
        return value.min - (value.max - value.min);
      },
    },
    series: [
      {
        name: '最大值',
        data: YMAX,
        type: 'line',
      },
      {
        name: '最小值',
        data: YMIN,
        type: 'line',
      },
    ],
  };
  return (
    isShow && <div>
      <div>
        <Button
          onClick={() => dispatch(changeMeteButton(props, 2, idx))}
        >12h趋势
        </Button>
        <Button
          onClick={() => dispatch(changeMeteButton(props, 3, idx))}
        >7天趋势
        </Button>
      </div>
      <ReactEcharts
        style={{ height: 200 }}
        option={option}
      />
    </div>
  );
};

export default mete;
