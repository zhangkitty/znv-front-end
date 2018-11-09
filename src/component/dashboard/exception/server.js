import { under2Camal } from 'shein-lib/camal-case-convertor';
import { request } from 'utils/index';
import moment from 'moment';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  const trendData = {
    type: 1,
    startTime: moment(props.onlineRate.trend.dateValue[0]).format('YYYYMMDD'),
    endTime: moment(props.onlineRate.trend.dateValue[1]).format('YYYYMMDD'),
    areaCode: null,
    executor: null,
  };
  const detailData = {
    dataTime: (props.onlineRate.detailData.choosedData),
    countType: 1,
    areaCode: null,
  };

  return Promise.all([
    request({
      url: '/rqs/exception/getCityTree',
      method: 'get',
    }),
    request({
      url: '/rqs/exception/rate',
      method: 'get',
    }),
    request({
      url: `/rqs/exception/rate${getParam(trendData)}`,
    }),
    request({
      url: `/rqs/exception/detailrate${getParam(detailData)}`,
    }),
  ]).then(res => res);
};

export const getExceptionRateSer = (props) => {
  const { node } = props;
  const tableData = {
    type: 1,
    startTime: null,
    endTime: null,
    areaCode: node && node.areaCode,
    executor: null,
  };

  const trendData = {
    type: 1,
    startTime: moment(props.onlineRate.trend.dateValue[0]).format('YYYYMMDD'),
    endTime: moment(props.onlineRate.trend.dateValue[1]).format('YYYYMMDD'),
    areaCode: node && node.areaCode,
    executor: null,
  };

  const detailData = {
    dataTime: props.onlineRate.detailData.choosedData,
    countType: 1,
    areaCode: node && node.areaCode,
  };

  return Promise.all([
    request({
      url: `/rqs/exception/rate${getParam(tableData)}`,
      method: 'get',
    }),
    request({
      url: `/rqs/exception/rate${getParam(trendData)}`,
    }),
    request({
      url: `/rqs/exception/detailrate${getParam(detailData)}`,
    }),
  ]);
};


export const changeDetailDaySer = (props) => {
  const { node } = props;
  const detailData = {
    dataTime: props.onlineRate.detailData.choosedData,
    countType: 1,
    areaCode: node && node.areaCode,
  };
  return request({
    url: `/rqs/exception/detailrate${getParam(detailData)}`,
  });
};


export const changeTrendDaysSer = (props) => {
  const { node } = props;
  const trendData = {
    type: 1,
    startTime: moment(props.onlineRate.trend.dateValue[0]).format('YYYYMMDD'),
    endTime: moment(props.onlineRate.trend.dateValue[1]).format('YYYYMMDD'),
    areaCode: node && node.areaCode,
    executor: null,
  };
  return request({
    url: `/rqs/exception/rate${getParam(trendData)}`,
  });
};
