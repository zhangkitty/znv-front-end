// js小数转换百分数并保留两位小数
export default function toPercent(point) {
  let str = Number(point * 100).toFixed(2);
  str += '%';
  return str;
}
