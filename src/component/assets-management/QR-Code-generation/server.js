import { under2Camal } from 'shein-lib/camal-case-convertor';
import request from 'utils/request';
import getParam from 'utils/getParam';


export const createdeviceSer = (props) => {
  const data = {
    companyCode: 111,
    staffId: 12342,
    createNum: props.number,
  };
  return request({
    url: `/ams/device/createdevice${getParam(data)}`,
  });
};
