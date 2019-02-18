const checkToken = () => {
  const token = localStorage.getItem('token');
  const tokenDate = localStorage.getItem('tokenDate');

  if (!token || !tokenDate) {
    return false;
  }

  // 判断token保存时间是否超过7天
  const startTime = new Date(Date.parse(tokenDate)).getTime();
  const endTime = new Date().getTime();
  const dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);

  if (dates >= 7) {
    return false;
  }

  return true;
};

export default checkToken;
