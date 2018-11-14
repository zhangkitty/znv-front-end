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
  const len = node.id.split('.').length;
  const tableData =
    {
      type: 1,
      startTime: null,
      endTime: null,
      areaCode: node.person === true ? null : node.areaCode,
      executor: node.person === true ? node && node.areaCode : null,
    };

  const trendData = {
    type: 1,
    startTime: moment(props.onlineRate.trend.dateValue[0]).format('YYYYMMDD'),
    endTime: moment(props.onlineRate.trend.dateValue[1]).format('YYYYMMDD'),
    areaCode: node.person === true ? null : node.areaCode,
    executor: node.person === true ? node && node.areaCode : null,
  };

  const detailData = {
    dataTime: props.onlineRate.detailData.choosedData,
    countType: 1,
    areaCode: node && node.areaCode,
  };

  const devicedetail = {
    dataTime: moment(props.onlineRate.detailData.choosedData).format('YYYYMMDD'),
    countType: 1,
    executor: len === 3 ? null : node.areaCode,
    areaCode: len === 3 ? node.areaCode : null,
    quotaType: 1,
  };

  const arr = [
    `/rqs/exception/rate${getParam(tableData)}`,
    `/rqs/exception/rate${getParam(trendData)}`,
    `/rqs/exception/detailrate${getParam(detailData)}`,
    `/rqs/exception/devicedetail${getParam(devicedetail)}`,
  ];

  const trueArr = (len === 3 || (len > 3 && node.person === true)) ? arr : arr.slice(0, 3);

  return Promise.all(trueArr.map(v => request({ url: v })));
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

export const getDevicedetailSer = (props) => {
  const { node } = props;
  const len = node.id.split('.').length;
  const devicedetail = {
    dataTime: moment(props.onlineRate.deviceTable.choosedData).format('YYYYMMDD'),
    countType: 1,
    executor: len === 3 ? null : node.areaCode,
    areaCode: len === 3 ? node.areaCode : null,
    quotaType: 1,
  };
  return request({
    url: `/rqs/exception/devicedetail${getParam(devicedetail)}`,
  });
};

export const staffAttendanceInitSer = (props) => {
  const tableData = {

  };

  const trendData = {
    startTime: moment(props.staffAttendance.trend.dateValue[0]).format('YYYY-MM-DD'),
    endTime: moment(props.staffAttendance.trend.dateValue[1]).format('YYYY-MM-DD'),
  };

  return Promise.all([
    request({
      url: '/rqs/attendance/totalrate',
    }),
    request({
      url: `/rqs/attendance/rate${getParam(trendData)}`,
    }),
  ]);
};

export const changeTrendDaysInTab1Ser = (props) => {
  const { node } = props;
  const len = node.id.split('.').length;
  const trendData = {
    startTime: moment(props.staffAttendance.trend.dateValue[0]).format('YYYY-MM-DD'),
    endTime: moment(props.staffAttendance.trend.dateValue[1]).format('YYYY-MM-DD'),
    areaCode: len === 3 ? node.areaCode : null,
    executor: (len > 3 && node.person === true) ? node.areaCode : null,
  };
  return request({
    url: `/rqs/attendance/rate${getParam(trendData)}`,
  });
};

export const changeDetailDayTab1Ser = (props) => {
  const { node } = props;

  const detailData = {
    dataTime: props.staffAttendance.detailData.choosedData,
    areaCode: node.areaCode,
  };
  return request({
    url: `/rqs/attendance/citydetail${getParam(detailData)}`,
  });
};
