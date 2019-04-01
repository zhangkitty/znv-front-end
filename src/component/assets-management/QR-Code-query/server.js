import { under2Camal } from 'shein-lib/camal-case-convertor';
import request from 'utils/request';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  const data = {
    colName: 'company',
  };
  return request({
    url: `/ams/device/dropdown${getParam(data)}`,
  });
};

export const queryrecordlistSer = (props) => {
  const { formData } = props;
  const data = {
    companyCode: formData.company,
    createDate: formData.date,
    pageSize: formData.pageSize,
    pageNum: formData.pageNum,
  };
  return request({
    url: `/ams/device/queryrecordlist${getParam(data)}`,
  });
};
