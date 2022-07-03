import styles from './index.less';
import { ProLayout } from '@ant-design/pro-layout';
import { TodoList } from './todoList';

export default function IndexPage() {
  return (
    <ProLayout>
      <TodoList />
    </ProLayout>
  );
}
