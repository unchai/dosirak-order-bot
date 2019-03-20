import moment from 'moment';
import { checkAdminUser } from '../bot-lib';
import repo from '../firebase-repository';
import { ICommandFunc } from '../types';

export default {
    async execute(userId: string, args: string[]): Promise<string> {
        const user = await repo.getUser(userId);
        checkAdminUser(user);

        const ymd = moment().format('YYYYMMDD');

        if (!await repo.getOrderStatus(ymd)) {
            throw new Error('금일 주문 내역이 없어 주문 마감을 할 수 없습니다.');
        }

        await repo.saveOrderStatus({
            ymd,
            closed: true,
        });

        return `주문이 마감되었습니다.`;
    },
} as ICommandFunc;
