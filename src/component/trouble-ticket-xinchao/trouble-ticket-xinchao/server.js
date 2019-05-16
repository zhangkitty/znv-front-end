import { request } from 'utils/index';
import getParam from 'utils/getParam';
import moment from 'moment';
import choose from 'utils/choose';

function trans(data) {
  if (!data) {
    return null;
  }
  if (typeof data === 'string') {
    return data.split(',').map(v => parseInt(v));
  }
  return [data];
}


export const initSer = (props) => {
  console.log(props);

  const
    {
      person,
      formData: {
        projectName, pageNum, pageSize, choosePerson, date, chooseStatus, expiredFlag,
      },
    } = props;


  const data = {
    pageSize: 1000,
    pageNo: 1,
    orgId: props.formData.chooseDept,
  };

  return Promise.all([
    request({
      url: '/srm/org/query/tree',
    }),
    request({
      url: `/srm/user/query/list${getParam(data)}`,
    }),
  ]).then(res => res);
};

export const changeDeptSer = (props, v) => {
  const data = {
    pageSize: 1000,
    pageNo: 1,
    orgId: v,
  };
  return request({
    url: `/srm/user/query/list${getParam(data)}`,
  });
};

export const searchSer = (action) => {
  const {
    props: {
      person,
      formData: {
        projectName, pageNum, pageSize, choosePerson, date, chooseStatus, expiredFlag, chooseDept,
      },
    },
  } = action;
  const data = {
    itemName: projectName,
    pageNum,
    pageSize,
    expiredFlag,
    statusCodes: trans(chooseStatus),
    staffId: choosePerson,
    loginStaffId: localStorage.getItem('userId'),
    taskType: 15,
    beginTime: date[0] && `${moment(date[0]).format('YYYY-MM-DD')} 00:00:00`,
    endTime: date[1] && `${moment(date[1]).format('YYYY-MM-DD')} 23:59:59`,
    staffIdListStr: choose(chooseDept, '', !choosePerson ? person.map(v => v.userId).toLocaleString() : null),
  };
  return request({
    url: '/wgs/xc/workorder/list/query',
    method: 'post',
    data,
  });
};

export const changePageSer = (action) => {
  const {
    current,
    props: {
      person,
      formData: {
        projectName, pageNum, pageSize, choosePerson, date, chooseStatus,
      },
    },
  } = action;
  const data = {
    itemName: projectName,
    pageNum: current,
    pageSize,
    staffId: choosePerson,
    statusCodes: trans(chooseStatus),
    loginStaffId: localStorage.getItem('userId'),
    taskType: 15,
    beginTime: date[0] && `${moment(date[0]).format('YYYY-MM-DD')} 00:00:00`,
    endTime: date[1] && `${moment(date[1]).format('YYYY-MM-DD')} 23:59:59`,
    staffIdListStr: choose(chooseDept, '', !choosePerson ? person.map(v => v.userId).toLocaleString() : null),
  };
  return request({
    url: `/wgs/xc/workorder/list/query${getParam(data)}`,
    method: 'post',
    data,
  });
};

export const changePageSizeSer = (action) => {
  const {
    current,
    size,
    props: {
      person,
      formData: {
        projectName, pageNum, pageSize, choosePerson, date, chooseStatus,
      },
    },
  } = action;
  const data = {
    itemName: projectName,
    pageNum: current,
    pageSize: size,
    staffId: choosePerson,
    statusCodes: trans(chooseStatus),
    loginStaffId: localStorage.getItem('userId'),
    taskType: 15,
    beginTime: date[0] && `${moment(date[0]).format('YYYY-MM-DD')} 00:00:00`,
    endTime: date[1] && `${moment(date[1]).format('YYYY-MM-DD')} 23:59:59`,
    staffIdListStr: choose(chooseDept, '', !choosePerson ? person.map(v => v.userId).toLocaleString() : null),
  };
  return request({
    url: `/wgs/xc/workorder/list/query${getParam(data)}`,
    method: 'post',
    data,
  });
};

export const queryDeviceDetailSer = (action) => {
  const { props: { modal: { deviceId } } } = action;
  const data = {
    deviceId,
  };
  return request({
    url: '/ods/xcworkorder/device/detail',
    data,
    method: 'post',
  });
};

export const createSer = (action) => {
  const {
    props: {
      modal: {
        deviceId,
        projectName,
        tenementType,
        region,
        address,
        description,
        select_fault_type,
      },
    },
  } = action;
  const data = {
    sourceId: 3003,
    woType: 15,
    deviceId,
    staffId: localStorage.getItem('userId'),
    staffName: localStorage.getItem('fullName'),
    detailObject: {
      question: description,
      itemName: projectName,
      propertyName: tenementType,
      faultType: select_fault_type,
    },
  };
  return request({
    url: '/ods/workorder/create',
    method: 'post',
    data,
  });
};

export const openModalSer = (action) => {
  const { props } = action;
  const data = {
    colName: 'xc_fault_type',
  };
  return request({
    url: '/wgs/xc/dict/list/query',
    method: 'post',
    data,
  });
};

