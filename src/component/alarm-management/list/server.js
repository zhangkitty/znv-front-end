import { request } from 'utils/index';
import getParam from 'utils/getParam';
import moment from 'moment';


export const getCityList = () => (
  request({
    url: '/rqs/attendance/citylist',
  })
);


export const serachSer = (props) => {
  const { formData } = props;
  const data = {
    type: '',
    alarmType: formData.alarmType,
    alamStatus: formData.alamStatus,
    areaCode: formData.city,
    alarmTimeFrom: moment(formData.date[0]).format('YYYY-MM-DD HH:MM:SS'),
    alarmTimeTo: moment(formData.date[1]).format('YYYY-MM-DD HH:MM:SS'),
    name: formData.name,
    assetCode: formData.Id,
    pageNum: formData.pageNum,
    pageSize: formData.pageSize,
  };
  return request({
    url: `/rqs/alarm/list${getParam(data)}`,
  });
};

export const getLifeTimeSer = (taskId) => {
  const data = {
    taskId,
    type: '51010720564',
  };
  return request({
    url: `/rqs-dftc/exception/owprogress${getParam(data)}`,
  });
};
