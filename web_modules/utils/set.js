

export const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));// 转换成json字符串序列
};

export const get = (key) => {
  const val = localStorage.getItem(key);// 获取存储的元素
  return JSON.parse(val);
};

