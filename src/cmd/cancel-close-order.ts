import moment from 'moment';
import { checkAdminUser } from '../bot-lib';
import repo from '../repo';
import { ICommandFunc } from '../types';

export default {
    async execute(userId: string, args: string[]): Promise<string> {
        const user = await repo.getUser(userId);
        checkAdminUser(user);

        const ymd = moment().format('YYYYMMDD');

        const orderStatus = await repo.getOrderStatus(ymd);

        if (!orderStatus) {
            throw new Error('금일 주문 내역이 없어 주문 마감을 취소할 수 없습니다.');
        }

        if (!orderStatus.closed) {
            throw new Error('아직 마감되지 않았습니다. ^^;');
        }

        await repo.saveOrderStatus({
            ymd,
            closed: false,
        });

        return `주문 마감이 취소되었습니다.`;
    },
} as ICommandFunc;
