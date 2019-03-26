import { ICommandFunc } from '../types';
import commands from './index';

export default {
    async execute(userId: string, args: string[]): Promise<string> {
        const usages = commands
            .map(cmd => `"${cmd.keyword}"\n - ${cmd.usage}\n\n`)
            .join('');

        return `사용할 수 있는 명령어는 아래와 같습니다.\n\n${usages}`;
    },
} as ICommandFunc;
