import moment from 'moment';
import { checkAdminUser } from '../bot-lib';
import repo from '../firebase-repository';
import { ICommandFunc } from '../types';

export default {
    async execute(userId: string, args: string[]): Promise<string> {
        const user = await repo.getUser(userId);
        checkAdminUser(user);

        const ymd = args[1] ? args[1] : moment().format('YYYYMMDD');

        const orders = await repo.getUserOrders(ymd);

        if (!orders || orders.length === 0) {
            return '주문이 존재하지 않습니다.';
        }

        let message = `주문 목록입니다. (${ymd})\n=============================\n`;
        let totalPrice = 0;

        orders.forEach((order, index) => {
            message += `${index + 1}. ${order.userName}, ${order.menu}, ${order.price}원, 정산${order.payback ? 'O' : 'X'}\n`;
            totalPrice += order.price;
        });

        message += `=============================\n`;

        return message;
    },
} as ICommandFunc;
