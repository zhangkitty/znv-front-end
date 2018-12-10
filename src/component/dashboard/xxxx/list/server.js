import { under2Camal } from 'shein-lib/camal-case-convertor';
import { csv } from 'd3-fetch';

// import { request } from 'utils/index';


export const initSer = () => {
  console.log('pp');
  const DATA_URL =
    'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'; // eslint-disable-line
  return csv(DATA_URL).then((res) => {
    console.log(res);
    const data = res.map(d => [Number(d.lng), Number(d.lat)]);
    return data;
  });
};

