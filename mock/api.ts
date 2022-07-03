import { Request, Response } from 'umi';
export default {
  'GET /api/getTodoList': (req: Request, res: Response) => {
    // setTimeout(() => {
    res.send({
      status: 'ok',
      code: '200',
      data: [
        { content: '初始任务1', status: '1', key: '初始任务1' },
        { content: '初始任务2', status: '0', key: '初始任务2' },
      ],
    });
    // },200)
  },
  'POST /api/updateTodoList': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        status: 'ok',
        code: '200',
      });
    }, 200);
  },
};
