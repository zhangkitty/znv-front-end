import { under2Camal } from 'shein-lib/camal-case-convertor';
import request from 'utils/request';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  console.log(1);

  const data = {
    colName: 'project',
  };
  return request({
    url: `/ams/device/dropdown${getParam(data)}`,
  });
};
