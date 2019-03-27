import moment from 'moment';
import { checkUser } from '../bot-lib';
import repo from '../repo';
import { ICommandFunc } from '../types';

export default {
    async execute(userId: string, args: string[]): Promise<string> {
        const user = await repo.getUser(userId);
        checkUser(user);

        const ymd = moment().format('YYYYMMDD');

        const orderStatus = await repo.getOrderStatus(ymd);

        if (orderStatus && orderStatus.closed) {
            throw new Error('이미 주문이 마감되었습니다. T_T');
        }

        await repo.removeUserOrder(ymd, userId);
        return '주문이 취소되었습니다.';
    },
} as ICommandFunc;
