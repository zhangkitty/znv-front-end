import { under2Camal } from 'shein-lib/camal-case-convertor';
import { request } from 'utils/index';
import getParam from 'utils/getParam';
import moment from 'moment';
import axios from 'axios/index';
import FileSaver from 'file-saver';
import queryString from 'query-string';

export const initSer = props => Promise.all([
  request({
    url: '/vue/userMgr/area/getAreaList?areaLevel=1',
  }),
  request({
    url: '/vue/cfgMgr/devicetype/qryDeviceTypeArr',
  }),
  request({
    url: '/vue/taskMgr/task/dictlist',
  }),
]);

export const changeFourSer = d => request({
  url: `/vue/cfgMgr/faulttype/qryFaultTypeArr?devicetypeId=${d.id}`,
});

export const changeProvinceSer = d => request({
  url: `/vue/userMgr/area/getAreaList?parentCode=${d.code}`,
});

export const changeCitySer = d => request({
  url: `/vue/userMgr/area/getAreaList?parentCode=${d.code}`,
});


export const openModalSer = d => request({
  url: `/vue/taskMgr/task/process?taskId=${d.id}`,
});

export const searchSer = (props) => {
  const { formData } = props;
  const param = {
    createName: formData.oneOne,
    handlePername: formData.oneTwo,
    dispatchType: formData.oneThree && formData.oneThree.dictCode,
    deviceType: formData.oneFour && formData.oneFour.id,
    faultId: formData.oneFive && formData.oneFive.devicetypeId,
    priority: formData.oneSix && formData.oneSix.dictCode,

    status: formData.twoOne && formData.twoOne.dictCode,
    province: formData.twoTwo && formData.twoTwo.code,
    city: formData.twoThree && formData.twoThree.code,
    district: formData.twoFour && formData.twoFour.code,
    startTime: formData.twoFive && formData.twoFive.slice(0)[0],
    endTime: formData.twoFive && moment(formData.twoFive.slice(-1)[0]).format('YYYY-MM-DD'),

    pageNum: formData.pageNum,
    pageSize: formData.pageSize,
    orderBy: 'create_time desc',


  };
  return request({
    url: `/vue/taskMgr/task/list${getParam(param)}`,
  });
};

export const outSer = (props) => {
  console.log('indexppp');
  const { formData } = props;
  const form = new FormData();
  const data = {
    createName: formData.oneOne,
    handlePername: formData.oneTwo,
    dispatchType: formData.oneThree && formData.oneThree.dictCode,
    deviceType: formData.oneFour && formData.oneFour.id,
    faultId: formData.oneFive && formData.oneFive.devicetypeId,
    priority: formData.oneSix && formData.oneSix.dictCode,
    status: formData.twoOne && formData.twoOne.dictCode,
    sTime: (formData.twoFive && formData.twoFive.slice(0)[0]) || 0,
    eTime: formData.twoFive && moment(formData.twoFive.slice(-1)[0])
      .format('YYYY-MM-DD'),
    province: formData.twoTwo && formData.twoTwo.code,
    city: formData.twoThree && formData.twoThree.code,
    district: formData.twoFour && formData.twoFour.code,
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NDU4ODYzNzQsInN1YiI6IntcInVzZXJOYW1lXCI6XCJ6bnZhZG1pblwiLFwidXNlcklkXCI6XCIzZjM5YjBlODQyM2I0NDEyOGZlY2FiYmU1ZDhmNzkyOVwifSIsImV4cCI6MTU0NzA5NTk3NCwibmJmIjoxNTQ1ODg2Mzc0fQ.9zutDRv20ErJr__zyCRtweJtIFnZUrlwFW3IbiCsK3E',
    exportCurPage: 1,
  };
  for (const key in data) {
    if (data[key]) {
      form.append(key, data[key]);
    }
  }

  return axios({
    method: 'post',
    url: '/vue/taskMgr/task/export',
    data: form,
    config: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  })
    .then((res) => {
      // handle success
      const blob = new Blob([res.data], { type: res.headers['content-type'] });
      const downloadElement = document.createElement('a');
      const href = window.URL.createObjectURL(blob); // 创建下载的链接
      downloadElement.href = href;
      downloadElement.download = `${moment().unix()}.xlsx`; // 下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); // 点击下载
      document.body.removeChild(downloadElement); // 下载完成移除元素
      window.URL.revokeObjectURL(href); // 释放掉blob对象
      // FileSaver.saveAs(response.data);
    })
    .catch((response) => {
      // handle error
      console.log(response);
      // console.log(response);
    });
};

export const finishSer = (d) => {
  const data = {
    sourceId: d.id,
    accountId: d.accountId,
  };
  return request({
    url: '/vue/taskMgr/task/overTask',
    method: 'post',
    data,
  });
};
