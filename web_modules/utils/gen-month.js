import moment from 'moment';

const gen = () => {
  const monthArr = [
    { id: '201801', month: '2018年1月' },
    { id: '201802', month: '2018年2月' },
    { id: '201803', month: '2018年3月' },
    { id: '201804', month: '2018年4月' },
    { id: '201805', month: '2018年5月' },
    { id: '201806', month: '2018年6月' },
    { id: '201807', month: '2018年7月' },
    { id: '201808', month: '2018年8月' },
    { id: '201809', month: '2018年9月' },
    { id: '201810', month: '2018年10月' },
    { id: '201811', month: '2018年11月' },
    { id: '201812', month: '2018年12月' },
  ];
  const year = `${moment().year()}年`;
  for (let i = 1; i < moment().month() + 2; i++) {
    monthArr.push({ id: `${moment().year()}${i < 10 ? `0${i}` : i}`, month: `${year}${i}月` });
  }


  return monthArr.reverse();
};

export default gen;

