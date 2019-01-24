import moment from 'moment';

const arrPush = (arr, end) => {
  if (moment(arr.slice(-1)[0]).add(1, 'days') < moment(end)) {
    arr.push(moment(arr.slice(-1)[0]).add(1, 'days'));
    arrPush(arr, end);
  } else {
    arr.push(end);
  }
  return arr;
};

const time = ([start, end]) => {
  const arr = [];
  arr.push(start);
  return arrPush(arr, end);
};

export default time;
