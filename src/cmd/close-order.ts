import moment from 'moment';
import { checkAdminUser } from '../bot-lib';
import lineClient from '../line-lib';
import repo from '../repo';
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

        const users = await repo.getAllUsers();

        const npayUrl = process.env.NPAY_URL!;
        const naverappUrlScheme = `naversearchapp://inappbrowser?url=${encodeURIComponent(npayUrl)}&target=new&version=6`;

        await lineClient.multicast(
            users.map(v => v.userId),
            { type: 'text', text: `주문이 마감되었습니다.\n도시락이 도착하면 아래 링크를 눌러서 정산해주세요.\n\n${naverappUrlScheme}` },
        );

        return `주문이 마감되었습니다.`;
    },
} as ICommandFunc;
