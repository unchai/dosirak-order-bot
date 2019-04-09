import { checkAdminUser } from '../bot-lib';
import repo from '../repo';
import { ICommandFunc } from '../types';

export default {
    async execute(userId: string, args: string[]): Promise<string> {
        const user = await repo.getUser(userId);
        checkAdminUser(user);

        const users = await repo.getRequestSignUpUsers();

        if (!users || users.length === 0) {
            return '가입 승인이 필요한 사용자가 존재하지 않습니다.';
        }

        let message = `가입 승인요청 사용자 목록입니다.\n==================\n`;

        users.forEach((v, i) => {
            message += `${i + 1}. ${v.userId.substring(0, 4).toLowerCase()} ${v.userName}\n`;
        });

        message += `==================\n`;

        return message;
    },
} as ICommandFunc;
