import { under2Camal } from 'shein-lib/camal-case-convertor';
import { request } from 'utils/index';
import moment from 'moment';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  const trendData = {
    startTime: moment(props.onlineRate.trend.dateValue[0]).format('YYYYMMDD'),
    endTime: moment(props.onlineRate.trend.dateValue[1]).format('YYYYMMDD'),
    areaCode: null,
    executor: null,
  };
  const detailData = {
    dataTime: moment(props.onlineRate.detailData.choosedData).format('YYYYMMDD'),
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
      startTime: null,
      endTime: null,
      areaCode: node.person === true ? null : node.areaCode,
      executor: node.person === true ? node && node.areaCode : null,
    };

  const trendData = {
    startTime: moment(props.onlineRate.trend.dateValue[0]).format('YYYYMMDD'),
    endTime: moment(props.onlineRate.trend.dateValue[1]).format('YYYYMMDD'),
    areaCode: node.person === true ? null : node.areaCode,
    executor: node.person === true ? node && node.areaCode : null,
  };

  const detailData = {
    dataTime: moment(props.onlineRate.detailData.choosedData).format('YYYYMMDD'),
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
    dataTime: moment(props.onlineRate.detailData.choosedData).format('YYYYMMDD'),
    countType: 1,
    areaCode: node && node.areaCode,
  };
  return request({
    url: `/rqs/exception/detailrate${getParam(detailData)}`,
  });
};


export const changeTrendDaysSer = (props) => {
  const { node } = props;
  const len = node.id.split('.').length;
  const trendData = {
    startTime: moment(props.onlineRate.trend.dateValue[0]).format('YYYYMMDD'),
    endTime: moment(props.onlineRate.trend.dateValue[1]).format('YYYYMMDD'),
    executor: len === 3 ? null : node.areaCode,
    areaCode: len === 3 ? node.areaCode : null,
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
    quotaType: props.onlineRate.deviceTable.chooseType,
  };
  return request({
    url: `/rqs/exception/devicedetail${getParam(devicedetail)}`,
  });
};


// 初始化人员考勤
export const staffAttendanceInitSer = (props) => {
  const { node } = props;
  const len = node.id.split('.').length;
  let { areaCode } = node;
  let executor = null;
  if (len === 1) {
    areaCode = null;
    executor = null;
  } else if (len === 3) {
    executor = null;
  } else {
    areaCode = null;
    executor = node.areaCode;
  }
  const tableData = {
    areaCode,
    executor,
  };
  const trendData = {
    startTime: moment(props.staffAttendance.trend.dateValue[0]).format('YYYY-MM-DD'),
    endTime: moment(props.staffAttendance.trend.dateValue[1]).format('YYYY-MM-DD'),
    executor: len === 3 ? null : node.areaCode,
    areaCode: len === 3 ? node.areaCode : null,
  };

  if (len === 1) {
    const detailData = {
      countType: 1, // 1:按天（默认），2：按月，3：按年，4：按周，5：按季  （目前只支持按天，其它统计待定）
      groupType: props.staffAttendance.detailData.chooseType, // 1:按一级省（默认）  2：按二级市（柱状图的时候用这个）
      dataTime: props.staffAttendance.detailData.choosedData,
    };
    return Promise.all([
      request({
        url: `/rqs/attendance/totalrate${getParam(tableData)}`,
      }),
      request({
        url: `/rqs/attendance/rate${getParam(trendData)}`,
      }),
      request({
        url: `/rqs/attendance/chinadetailrate${getParam(detailData)}`,
      }),
    ]);
  }

  if (len === 3) {
    const detailData = {
      areaCode: node.areaCode,
      dataTime: props.staffAttendance.detailData.choosedData,
    };
    return Promise.all([
      request({
        url: `/rqs/attendance/totalrate${getParam(tableData)}`,
      }),
      request({
        url: `/rqs/attendance/rate${getParam(trendData)}`,
      }),
      request({
        url: `/rqs/attendance/citydetail${getParam(detailData)}`,
      }),
    ]);
  }

  if (len > 3) {
    const detailData = {
      executor: node.areaCode,
      dataTime: props.staffAttendance.detailData.choosedData,
    };
    return Promise.all([
      request({
        url: `/rqs/attendance/totalrate${getParam(tableData)}`,
      }),
      request({
        url: `/rqs/attendance/rate${getParam(trendData)}`,
      }),
      // 轨迹
      request({
        url: `/rqs/attendance/persontracedetail${getParam(detailData)}`,
      }),
      // 任务
      request({
        url: `/rqs/attendance/persontaskdetail${getParam(detailData)}`,
      }),
    ]).then(res => res);
  }
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


// 改变明细数据的日期
export const changeDetailDayTab1Ser = (props) => {
  const { node } = props;
  const len = node.id.split('.').length;
  if (len === 1) {
    const detailData = {
      countType: 1, // 1:按天（默认），2：按月，3：按年，4：按周，5：按季  （目前只支持按天，其它统计待定）
      groupType: props.staffAttendance.detailData.chooseType, // 1:按一级省（默认）  2：按二级市（柱状图的时候用这个）
      dataTime: props.staffAttendance.detailData.choosedData,
    };
    return request({
      url: `/rqs/attendance/chinadetailrate${getParam(detailData)}`,
    });
  }

  if (len === 3) {
    const detailData = {
      areaCode: node.areaCode,
      dataTime: props.staffAttendance.detailData.choosedData,
    };
    return request({
      url: `/rqs/attendance/citydetail${getParam(detailData)}`,
    });
  }

  if (len > 3) {
    const detailData = {
      executor: node.areaCode,
      dataTime: props.staffAttendance.detailData.choosedData,
    };

    return Promise.all([
      request({
        url: `/rqs/attendance/persontracedetail${getParam(detailData)}`,
      }),
      request({
        url: `/rqs/attendance/persontaskdetail${getParam(detailData)}`,
      }),
    ]);
  }

  return null;
};

export const openWorkRateIncSer = (props) => {
  console.log(props);
  return request({
    url: '/rqs/attendance/cityworkrate?order=1&target=1',

  });
};
