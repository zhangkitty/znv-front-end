import { under2Camal } from 'shein-lib/camal-case-convertor';
import { request } from 'utils/index';


export const initSer = (props) => {
  Promise.all([
    request({
      url: './asfadfasf',
      method: 'post',
      data: [
      ],
    }),
    request({
      url: './asfadfasf',
      method: 'post',
      data: [
      ],
    }),
    request({
      url: './asfadfasf',
      method: 'post',
      data: [
      ],
    }),
  ]).then(res => res);
  return [
    {
      success: true,
      data: [
        {
          id: 1, month: '七月',
        },
        {
          id: 2, month: '八月',
        },
      ],
    },
    {
      success: true,
      data: [
        { id: 1, city: '南京' },
        { id: 2, city: '杭州' },
      ],
    },
    {
      success: true,
      data: [
        { id: 1, team: '全部' },
      ],
    },
  ];
};

export const submitSer = (props) => {
  const test = {
    pageSize: props.pageSize,
    pageNum: props.page,
    dataTime: props.formData.choosedMonth,
    type: props.formData.chooseValue,
    areaCode: props.formData.choosedCity,
  };
  const arr = [];
  for (const [key, value] of Object.entries(test)) {
    if (value) {
      arr.push(`${key}=${value}`);
    }
  }
  return request({
    url: `/rqs/orderasset/ordermonth?${arr.join('&')}`,
    method: 'get',
  });
};

