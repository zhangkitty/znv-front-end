import _ from 'lodash';
/**
 * @param obj: 修改之前的对象
 * @param objori: 部分修改之后的对象
 * result 修改过的内容组成的对象
 * */
export default function getField(obj, objori, objTittle) {
  const res = Object.keys(obj)
    .map(key => ({ [key]: obj[key] }));
  const resori = Object.keys(objori)
    .map(key => ({ [key]: objori[key] }));
  const field = Object.keys(_.differenceWith(res, resori, _.isEqual)
    .reduce((prev, curr) => (Object.assign({}, prev, curr)), []))
    .map(item => ({ [item]: objTittle[item] }))
    .reduce((prev, curr) => (Object.assign({}, prev, curr)), {});
  return Object.keys(field)
    .reduce((acc, current) => Object
      .assign({}, acc, field[current] ? { [current]: field[current] } : ''), {});
}
