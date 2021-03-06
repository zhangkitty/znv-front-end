import { under2Camal } from 'shein-lib/camal-case-convertor';
import { request } from 'utils/index';


export const initSer = props => Promise.all([
  request({
    url: '/web/api/task/list?taskType=2',
    method: 'get',
  }),
  request({
    url: '/sssssss',
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
    taskId: props.choosedAims,
    areaCode: props.choosedCity,
  };
  const arr = [];
  for (const [key, value] of Object.entries(test)) {
    if (value) {
      arr.push(`${key}=${value}`);
    }
  }
  return request({
    url: `/rqs/patrol/count?${arr.join('&')}`,
    method: 'get',
  });
};

