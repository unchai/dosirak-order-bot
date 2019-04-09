import lineClient from '../line-lib';
import repo from '../repo';
import { ICommandFunc } from '../types';

export default {
    async execute(userId: string, args: string[]): Promise<string> {
        const existUser = await repo.getUser(userId);

        if (existUser) {
            if (!existUser.confirm) {
                throw new Error('가입 승인 대기 상태입니다.\n곧 집밥슨생님께서 승인해 주실거에요. ^^');
            }

            throw new Error('이미 가입되었습니다.');
        }

        const lineUser = await lineClient.getProfile(userId);

        await repo.saveUser({
            userId,
            userName: lineUser.displayName,
            confirm: false,
            admin: false,
            registerDate: new Date(),
        });

        return `${lineUser.displayName}님. 가입이 완료되었습니다.\n현재 승인대기 상태이며, 승인이 완료되면 주문하실 수 있습니다. ^^`;
    },
} as ICommandFunc;
