import moment from 'moment';
import { checkUser } from '../bot-lib';
import MENU_LIST from '../menu-list';
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

        const menuNo = Number(args[1]);
        const menu = MENU_LIST[menuNo - 1];

        if (!menu) {
            throw new Error('존재하지 않는 메뉴입니다.');
        }

        await repo.saveUserOrder({
            ymd,
            userId: user!.userId,
            userName: user!.userName,
            menu: menu.name,
            price: menu.price,
            payback: false,
            registerDate: new Date(),
        });

        return `메뉴 "${MENU_LIST[menuNo - 1].name}"의 주문이 완료되었습니다.`;
    },
} as ICommandFunc;
