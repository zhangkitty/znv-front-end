import { under2Camal } from 'shein-lib/camal-case-convertor';
import { csv } from 'd3-fetch';

import { request } from 'utils/index';
import getParam from 'utils/getParam';
import moment from 'moment';


// export const initSer = () => {
//   console.log('pp');
//   const DATA_URL =
//     'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'; // eslint-disable-line
//   return csv(DATA_URL).then((res) => {
//     console.log(res, 'mdzzzzzzz');
//     const data = res.map(d => [Number(d.lng), Number(d.lat)]);
//     return data;
//   });
// };

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


export const initSer = (props) => {
  const temp = {
    dataTime: moment(props.dataTime).format('YYYYMMDD'),
    quotaType: props.quotaType,
  };

  return request({
    url: `/rqsonline/rqs/exception/devicecoordinate${getParam(temp)}`,
  });
};

export const onHoverSer = (action) => {
  const { hoveredObject, props } = action;
  const temp = {
    longitude: (hoveredObject.points[0])[0],
    latitude: (hoveredObject.points[0])[1],
    dataTime: moment(props.dataTime).format('YYYYMMDD'),
  };
  return request({
    url: `/rqsonline/rqs/exception/cityrateday${getParam(temp)}`,
  });
};

