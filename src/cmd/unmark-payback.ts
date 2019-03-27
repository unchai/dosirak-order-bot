import moment from 'moment';
import { checkAdminUser } from '../bot-lib';
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
            throw new Error('정산을 취소할 수 있는 항목이 없습니다.');
        }

        if (!order.payback) {
            throw new Error('아직 정산이 되지 않은 항목입니다.');
        }

        order.payback = false;

        await repo.saveUserOrder(order);

        return `${ymd}, ${order.userName}, ${order.menu}, ${order.price}원의 정산이 취소되었습니다.`;
    },
} as ICommandFunc;
