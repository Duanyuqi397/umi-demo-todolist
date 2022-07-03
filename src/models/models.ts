import { Reducer, Effect } from 'umi';
import { getTodoList, updateTodoList } from '@/service/index';

export interface IModalList {
  content: string;
  status: string;
  key: string;
}

export type TModalStateType = {
  list: IModalList[];
};

export interface IPropsFromModel {
  data: TModalStateType;
}

export type TModalType = {
  namespace: string;
  state: TModalStateType;
  reducers: {
    changeTaskList: Reducer<TModalStateType>;
  };
  effects: {
    updateTaskList: Effect;
    getTaskList: Effect;
  };
};

const Modal: TModalType = {
  namespace: 'modalData',
  state: {
    list: [],
  },
  reducers: {
    changeTaskList(state, { payload }: any) {
      return {
        ...state,
        list: payload,
      };
    },
  },
  effects: {
    *updateTaskList({ payload }: any, { call, put }: any) {
      const res = yield call(updateTodoList, payload);
      if (res) {
        yield put({
          type: 'changeTaskList',
          payload: payload,
        });
      }
      return res;
    },
    *getTaskList(_: any, { call, put }: any) {
      const res = yield call(getTodoList);
      yield put({
        type: 'changeTaskList',
        payload: res.data,
      });
    },
  },
};
export default Modal;
