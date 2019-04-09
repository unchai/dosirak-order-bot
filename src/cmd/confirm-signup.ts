import { checkAdminUser } from '../bot-lib';
import lineClient from '../line-lib';
import repo from '../repo';
import { ICommandFunc } from '../types';

export default {
    async execute(userId: string, args: string[]): Promise<string> {
        const user = await repo.getUser(userId);
        checkAdminUser(user);

        const users = await repo.getRequestSignUpUsers();

        const userNo = Number(args[1]);
        const userIdHint = args[2];
        const newName = args[3];

        if (userNo < 1 || userNo > users.length || userIdHint) {
            throw new Error('가입 승인처리를 할 수 없습니다.');
        }

        const targetUser = users[userNo - 1];
        const targetUserIdHint = targetUser.userId.substring(0, 4).toLowerCase();

        if (userIdHint !== targetUserIdHint) {
            throw new Error('해당 사용자의 ID가 틀립니다.');
        }

        targetUser.userName = newName ? newName : targetUser.userName;
        targetUser.confirm = true;

        await repo.saveUser(targetUser);

        await lineClient.pushMessage(targetUser.userId, { type: 'text', text: '가입 요청이 승인되었습니다.' });

        return `사용자 '${targetUser.userName}' (${targetUserIdHint})의 가입승인이 완료되었습니다.`;
    },
} as ICommandFunc;
