import { request } from 'utils/index';
import getParam from 'utils/getParam';
import moment from 'moment';

export const initSer = props => Promise.all([
  request({
    url: '/rqs/attendance/citylist',
  }),
  request({
    url: '/rqs/attendance/executorlist',
  }),
]);

export const changeCitySer = ({ props, d }) => {
  console.log(props);
  console.log(d);
  const data = {
    areaCode: d,
  };
  return request({
    url: `/rqs/attendance/executorlist${getParam(data)}`,
  });
};

export const serachSer = (props) => {
  console.log(props);
  const { formData } = props;

  const data = {
    startDate: formData.date && moment(formData.date[0]).format('YYYY-MM-DD'),
    endDate: formData.date && moment(formData.date[1]).format('YYYY-MM-DD'),
    executor: formData.personValue,
    areaCode: formData.cityValue,
    pageNum: formData.page,
    pageSize: formData.pageSize,
  };
  return request({
    url: `/rqs/attendance/persondetail${getParam(data)}`,
  });
};

