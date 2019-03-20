import moment from 'moment';
import { checkUser } from '../bot-lib';
import repo from '../firebase-repository';
import MENU_LIST from '../menu-list';
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

        if (!isNaN(menuNo) && menuNo < 1 || menuNo > MENU_LIST.length) {
            throw new Error('세상에... 그런 메뉴는 없습니다...');
        }

        const menu = MENU_LIST[menuNo - 1];

        await repo.saveUserOrder({
            ymd,
            userId: user!.userId,
            userName: user!.userName,
            menu: menu.name,
            price: menu.price,
            payback: false,
        });

        return `메뉴 "${MENU_LIST[menuNo - 1].name}"의 주문이 완료되었습니다.`;
    },
} as ICommandFunc;
