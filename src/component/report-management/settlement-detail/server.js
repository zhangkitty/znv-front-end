import { request } from 'utils/index';


import FileSaver from 'file-saver';


// FileSaver.saveAs(data, `${name}.xls`);


export const submitSer = (props) => {
  const test = {
    pageSize: props.pageSize,
    pageNum: props.page,
    dataTime: props.formData.choosedMonth && `${props.formData.choosedMonth.slice(0, 4)}-${props.formData.choosedMonth.slice(4)}`,
    dayTime: props.formData.dataPicker && props.formData.dataPicker.format('YYYY-MM-DD'),
    type: props.formData.radioValue,
  };
  const arr = [];
  for (const [key, value] of Object.entries(test)) {
    if (value) {
      arr.push(`${key}=${value}`);
    }
  }

  return request({
    url: `/rqs/balance/detail/query?${arr.join('&')}`,
    method: 'get',
  }).then(res => res);
};

export const downloadSer = (props) => {
  const test = {
    dataTime: props.formData.choosedMonth && `${props.formData.choosedMonth.slice(0, 4)}-${props.formData.choosedMonth.slice(4)}`,
    dayTime: props.formData.dataPicker && props.formData.dataPicker.format('YYYY-MM-DD'),
    type: props.formData.radioValue,
  };
  const arr = [];
  for (const [key, value] of Object.entries(test)) {
    if (value) {
      arr.push(`${key}=${value}`);
    }
  }
  return request({
    url: `/rqs/balance/detail/download?${arr.join('&')}`,
    method: 'get',
  }).then((res) => {
    FileSaver.saveAs(res, res.name);
  });
};
