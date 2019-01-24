import { request } from 'utils/index';
import getParam from 'utils/getParam';

export const initSer = (props) => {
  const { formData, type } = props;
  const data = {
    type,
    pageNum: formData.pageNum,
    pageSize: formData.pageSize,
  };
  return request({
    url: `/rqs-dftc/exception/devicelist${getParam(data)}`,
  });
};
