import { under2Camal } from 'shein-lib/camal-case-convertor';
import { request } from 'utils/index';


export const initSer = (props) => {
  console.log(props);
  return Promise.all([
    request({
      url: '/icloud.web/api/task/list?taskType=1',
      method: 'get',
    }),
  ]).then(res => res);
};

export const submitSer = (props) => {
  console.log(props);
  return request({
    url: `/rqs/monitor/count?pageSize=${props.pageSize}&pageNum=${props.page}&startTime=${props.formData.kkk[0].format('YYYY-MM-DD')}&endTime=${props.formData.kkk[1].format('YYYY-MM-DD')}&type=${props.chooseValue}`,
    method: 'get',
  });
};
