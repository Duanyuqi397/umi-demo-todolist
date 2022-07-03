import { useDispatch } from 'dva';
import { IModalList } from '@/models/models';
import { Checkbox, Button, Input } from 'antd';
import { useIntl } from 'umi';
import { useState } from 'react';
import styles from './taskList.less';
const CheckBoxGroup = Checkbox.Group;

interface ITaskListProps {
  list: IModalList[];
  selectKey: string[];
}

const TaskList = (props: ITaskListProps) => {
  const dispatch = useDispatch();
  const { list, selectKey } = props;
  const intl = useIntl();
  const [content, setContent] = useState<string>('');

  const updateTodoList = async (list: IModalList[]) => {
    const res = await dispatch({
      type: 'modalData/updateTaskList',
      payload: list,
    });
  };

  const deleteTodo = (key: string) => {
    const newList = list.filter((item: IModalList) => item.key !== key);
    dispatch({
      type: 'modalData/changeTaskList',
      payload: newList,
    });
  };

  const addTodo = () => {
    if (!content) return;
    const newList = [...list, { content: content, status: '0', key: content }];
    dispatch({
      type: 'modalData/updateTaskList',
      payload: newList,
    });
    setContent('');
  };

  const changeStatus = (checkedValues: any) => {
    const newList: any[] = [];
    list.forEach((item: IModalList) => {
      checkedValues.includes(item.key)
        ? newList.push({ ...item, status: '1' })
        : newList.push({ ...item, status: '0' });
    });
    updateTodoList(newList);
    dispatch({
      type: 'modalData/changeTaskList',
      payload: newList,
    });
  };

  return (
    <>
      <CheckBoxGroup onChange={changeStatus} value={selectKey}>
        {list?.map((item: IModalList) => (
          <div key={item.key}>
            <Checkbox value={item.key}>{item.content}</Checkbox>
            <Button
              type="text"
              onClick={() => deleteTodo(item.key)}
              className={styles.Button}
            >
              {intl.formatMessage({ id: 'deleteTask' })}
            </Button>
          </div>
        ))}
      </CheckBoxGroup>
      <div>
        <Input
          placeholder={intl.formatMessage({ id: 'placeholder' })}
          onChange={(e) => setContent(e.target.value)}
          onPressEnter={() => addTodo()}
          value={content}
        />
        <Button type="primary" onClick={() => addTodo()}>
          {intl.formatMessage({ id: 'addTask' })}
        </Button>
      </div>
    </>
  );
};

export default TaskList;
