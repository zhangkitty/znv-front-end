import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const getCityList = () => (
  request({
    url: '/rqs/attendance/citylist',
  })
);


export const serachSer = (props) => {
  const data = {
    type: '',
    areaCode: props.formData.city,
    address: '',
    executor: '',
    executorName: '',
    assetCode: props.formData.Id,
    deviceName: props.formData.name,
    stateReceive: props.formData.receiveState,
    deviceOnlineStatus: props.formData.onlineState,
    pageNum: props.formData.pageNum,
    pageSize: props.formData.pageSize,
  };
  return request({
    url: `/rqs/exception/devicelist${getParam(data)}`,
  });
};
