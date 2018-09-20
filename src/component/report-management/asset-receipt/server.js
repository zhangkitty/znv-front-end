import { under2Camal } from 'shein-lib/camal-case-convertor';
import { request } from 'utils/index';

export const pickingList = () => under2Camal({
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

export const pickingListDelete = () => ({
  code: 0,
  info: {},
  msg: 'ok',
});


export const generate = () => ({
  code: 0,
  info: {},
  msg: 'ok',
});

export const initSer = (props) => {
  Promise.all([
    request({
      url: 'safa',
      method: 'post',
      data: [
      ],
    }),
    request({
      url: 'safa',
      method: 'post',
      data: [

      ],
    }),
    request({
      url: 'safa',
      method: 'post',
      data: [

      ],
    }),
  ]).then(res => res);
  return [
    {
      success: true,
      data: [
        { id: 1, month: '七月份' },
        { id: 2, month: '八月份' },
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
        { id: 1, team: '力维' },
        { id: 2, team: '天辰' },
      ],
    },
  ];
};

export const submitSer = (props) => {
  console.log(props);
  return request({
    url: `/rqs/orderasset/asset?dataTime=${props.choosedMonth}&pageSize=${props.pageSize}&pageNum=${props.page}&type=${props.chooseValue}&areaCode=${props.choosedCity}`,
    method: 'get',
  });
};

