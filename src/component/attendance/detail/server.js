import { request } from 'utils/index';


export const initSer = (props) => {
  console.log(props);
  // return request({
  //   url: '/user/authorize',
  //   method: 'POST',
  //   data: {
  //     username: data.userName,
  //     password: data.password,
  //     client_id: 'eggClient',
  //     grant_type: 'password',
  //   },
  // });

  return request({
    url: 'aps/api/post/query/clock',
    method: 'post',
    data: {
      staffId: 'afsafa',
      recordDate: 'asdaf',
    },
  });
};
