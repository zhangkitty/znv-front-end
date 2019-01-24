import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const initSer = (action) => {
  const { id, props } = action;
  const data = {
    assetNumber: id,
    type: props.type,

  };
  return request({
    url: `/rqs-dftc/exception/device${getParam(data)}`,
  });
};
