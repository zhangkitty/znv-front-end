import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const getCityList = () => (
  request({
    url: '/rqs/attendance/citylist',
  })
);


export const serachSer = (props) => {
  const data = {
    type: localStorage.getItem('type'),
    areaCode: props.formData.city,
    address: '',
    executor: '',
    executorName: '',
    id: props.formData.Id,
    name: props.formData.name,
    equipmentType: props.formData.equipmentType,
    stateOnline: props.formData.onlineState,
    pageNum: props.formData.pageNum,
    pageSize: props.formData.pageSize,
  };
  return request({
    url: `/rqs/exception/equipmentlist${getParam(data)}`,
  });
};
