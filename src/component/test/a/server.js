import fetch from '../../../lib/fetch';
import { toQueryString } from '../../../lib/query-string';
import { under2Camal, camel2Under } from '../../../lib/camal-case-convertor';

export const pickingList = (argObj = {}) => {
  const keys = [
    'secondaryProcess',
    'produceOrderId',
  ];
  const queryString = toQueryString(camel2Under(keys), camel2Under(argObj));
  return under2Camal({
    code: 0,
    info: {
      list: [{
        in_storage_no: 'RC1708190000',
        produce_order_id: '321456',
        production_group: '1',
        material_sku: '16MLYT00906003',
        new_material_sku: '16MLYT00906003',
        material_name: '26-1163#精梳32S全棉拉架卫衣食毛',
        material_color: '白色',
        storage_num: '1',
        unit: '米',
        in_storage_id: '1',
        processing_num: '1',
        processing_type: '二次加工对单',
        secondary_process: 'dress60301264',
        goods_sku: 'dress60301264',
        color_code: '56',
        id: '56',
      }],
      page_count: 1,
      record_count: 6,
    },
    msg: 'ok',
  });
  const uri = `${process.env.BASE_URI}/summaryPickingList/pickingList?${queryString}`;
  return fetch(uri, {
    method: 'GET',
    credentials: 'include',
  })
    .then(data => data.json())
    .then(under2Camal);
};

export const pickingListDelete = (argObj = {}) => {
  return ({
    code: 0,
    info: {},
    msg: 'ok',
  });
  const uri = `${process.env.BASE_URI}/summaryPickingList/pickingListDelete?${queryString}`;
  return fetch(uri, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(camel2Under(argObj)),
  })
    .then(data => data.json())
    .then(under2Camal);
};


export const generate = (argObj = {}) => {
  return ({
    code: 0,
    info: {},
    msg: 'ok',
  });
  const uri = `${process.env.BASE_URI}/summaryPickingList/generate?${queryString}`;
  return fetch(uri, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(camel2Under(argObj)),
  })
    .then(data => data.json())
    .then(under2Camal);
};
