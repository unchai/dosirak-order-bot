import moment from 'moment';
import { checkUser } from '../bot-lib';
import repo from '../repo';
import { ICommandFunc } from '../types';

export default {
    async execute(userId: string, args: string[]): Promise<string> {
        const user = await repo.getUser(userId);
        checkUser(user);

        const order = await repo.getUserOrder(moment().format('YYYYMMDD'), userId);

        if (!order) {
            return '오늘 주문을 하지 않으셨어요.';
        }

        return `${order.userName}님. 오늘 "${order.menu}" (${order.price}원)를 주문하셨어요.`;
    },
} as ICommandFunc;
