import moment from 'moment';
import { checkAdminUser } from '../bot-lib';
import lineClient from '../line-lib';
import repo from '../repo';
import { ICommandFunc } from '../types';

export default {
    async execute(userId: string, args: string[]): Promise<string> {
        const user = await repo.getUser(userId);
        checkAdminUser(user);

        let ymd = moment().format('YYYYMMDD');
        let no = Number(args[1]);

        if (args.length === 3) {
            ymd = args[1];
            no = Number(args[2]);
        }

        const orders = await repo.getUserOrders(ymd);
        const order = orders[no - 1];

        if (!order) {
            throw new Error('정산할 수 있는 항목이 없습니다.');
        }

        if (order.payback) {
            throw new Error('이미 정산이 완료된 항목입니다.');
        }

        order.payback = true;

        await repo.saveUserOrder(order);

        await lineClient.pushMessage(order.userId, { type: 'text', text: '정산이 완료되었습니다.' });

        return `${ymd}, ${order.userName}, ${order.menu}, ${order.price}원의 정산이 완료되었습니다.`;
    },
} as ICommandFunc;
