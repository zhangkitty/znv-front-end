const getParam = (data) => {
  const arr = [];
  for (const [key, value] of Object.entries(data)) {
    if (value) {
      arr.push(`${key}=${value}`);
    }
  }
  return `?${arr.join('&')}`;
};

export default getParam;
