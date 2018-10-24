import { under2Camal } from 'shein-lib/camal-case-convertor';
import { request } from 'utils/index';


export const initSer = props => Promise.all([
  request({
    url: '/icloud.web/api/task/list?taskType=1',
    method: 'get',
  }),
  request({
    url: '/asafsfa',
    method: 'get',
  }),
]).then(res => res);

export const submitSer = (props) => {
  const test = {
    pageSize: props.pageSize,
    pageNum: props.page,
    startTime: props.formData.kkk[0].format('YYYYMMDD'),
    endTime: props.formData.kkk[1].format('YYYYMMDD'),
    type: props.chooseValue,
  };
  const arr = [];
  for (const [key, value] of Object.entries(test)) {
    if (value) {
      arr.push(`${key}=${value}`);
    }
  }
  return request({
    url: `/rqs/monitor/count?${arr.join('&')}`,
    method: 'get',
  });
};
