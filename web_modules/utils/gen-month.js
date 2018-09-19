import moment from 'moment';

const gen = () => {
  const monthArr = [];
  const year = `${moment().year()}年`;
  for (let i = 1; i < moment().month() + 2; i++) {
    monthArr.push({ id: i, month: `${year}${i}月` });
  }

  return monthArr;
};

export default gen;
