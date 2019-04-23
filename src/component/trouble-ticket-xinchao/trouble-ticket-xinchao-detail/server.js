import { request } from 'utils/index';
import getParam from 'utils/getParam';
import moment from 'moment';


export const initSer = (props) => {
  const { params } = props;
  const data = {
    workOrderId: params.workOrderId,
  };
  return request({
    url: '/ods/workorder/detail/query',
    method: 'post',
    data,
  });
};

