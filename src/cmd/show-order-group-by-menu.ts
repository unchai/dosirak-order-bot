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

        let message = `주문서 (${ymd})\n`;
        message += `==================\n`;
        message += `주소 : 경기 성남시 분당구 분당내곡로 117, 크래프톤타워 9층\n`;
        message += `연락처 : 010-4581-7752\n`;
        message += `==================\n`;

        let totalPrice = 0;

        forEach(groupBy(orders, 'menu'), (v: IUserOrder[], k: string) => {
            message += `* ${k} x ${v.length}개\n`;
            totalPrice += sumBy(v, 'price');
        });

        message += `==================\n`;
        message += `총 금액: ${totalPrice}`;

        return message;
    },
} as ICommandFunc;
