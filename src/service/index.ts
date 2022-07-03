import { request } from 'umi';

export const updateTodoList = (params: any) => {
  return request('/api/updateTodoList', {
    method: 'post',
    params,
  });
};

export const getTodoList = () => {
  return request('/api/getTodoList', {
    method: 'get',
  });
};
