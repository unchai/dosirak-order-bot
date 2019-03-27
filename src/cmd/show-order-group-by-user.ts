import { forEach, groupBy, sumBy } from 'lodash';
import moment from 'moment';
import { checkUser } from '../bot-lib';
import repo from '../repo';
import { ICommandFunc, IUserOrder } from '../types';

export default {
    async execute(userId: string, args: string[]): Promise<string> {
        const user = await repo.getUser(userId);
        checkUser(user);

        const ymd = args[1] ? args[1] : moment().format('YYYYMMDD');

        const orders = await repo.getUserOrders(ymd);

        if (!orders || orders.length === 0) {
            return '주문이 존재하지 않습니다.';
        }

        let message = `주문 현황입니다. (${ymd})\n==================\n`;
        let totalPrice = 0;

        forEach(groupBy(orders, 'menu'), (v: IUserOrder[], k: string) => {
            message += `* ${k} x ${v.length}개\n`;
            totalPrice += sumBy(v, 'price');
        });

        message += `==================\n 총 금액: ${totalPrice}`;

        return message;
    },
} as ICommandFunc;
