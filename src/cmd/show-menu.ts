import MENU_LIST from '../menu-list';
import { ICommandFunc } from '../types';

export default {
    async execute(userId: string, args: string[]): Promise<string> {
        const menu = MENU_LIST.map((v, i) => `${i + 1}. ${v.name} (${v.price})`).join('\n');
        return `오봉도시락 메뉴입니다.\nhttp://www.iobong.com/menu/list.php?mtype=B\n\n${menu}`;
    },
} as ICommandFunc;
