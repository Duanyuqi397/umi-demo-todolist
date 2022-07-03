import TaskList from '@/component/taskList';
import { Tabs, Dropdown, Menu } from 'antd';
import { useDispatch } from 'dva';
import { useIntl, useSelector, setLocale } from 'umi';
import { useEffect } from 'react';
import styles from './index.less';

export const TodoList = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const list = useSelector((state: any) => state.modalData.list);
  //   console.log(list);
  const uncompletedList = list.filter((item: any) => item.status === '0');
  const completedList = list.filter((item: any) => item.status === '1');
  const selectedKey = completedList.map((item: any) => item.key);
  const tabsList = [
    { tab: intl.formatMessage({ id: 'allTasks' }), key: '1', list: list },
    {
      tab: intl.formatMessage({ id: 'completedTasks' }),
      key: '2',
      list: completedList,
    },
    {
      tab: intl.formatMessage({ id: 'uncompletedTasks' }),
      key: '3',
      list: uncompletedList,
    },
  ];

  useEffect(() => {
    // console.log(11111);
    // console.log(list);
    dispatch({
      type: 'modalData/getTaskList',
    });
  }, []);

  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey="1">
        {tabsList?.map((item) => (
          <Tabs.TabPane tab={item.tab} key={item.key}>
            <TaskList list={item.list} selectKey={selectedKey} />
          </Tabs.TabPane>
        ))}
      </Tabs>
      <Dropdown.Button
        overlay={
          <Menu>
            <Menu.Item onClick={() => setLocale('zh-CN', false)}>
              中文
            </Menu.Item>
            <Menu.Item onClick={() => setLocale('en-US', false)}>
              English
            </Menu.Item>
          </Menu>
        }
      >
        {intl.formatMessage({ id: 'chooseLanguage' })}
      </Dropdown.Button>
    </div>
  );
};

// export default connect(({modalData}: any) => ({
//     modalData
// }))(TodoList)
