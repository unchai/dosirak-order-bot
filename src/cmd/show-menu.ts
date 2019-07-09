import MENU_LIST from '../menu-list';
import { ICommandFunc } from '../types';

export default {
    async execute(userId: string, args: string[]): Promise<string> {
        const menu = MENU_LIST.map((v, i) => `${i + 1}. ${v.name} (${v.price})`).join('\n');
        return `토마토도시락 메뉴입니다.\nhttp://www.tomatodosirak.co.kr/board/index.php?board=menu_01&sca=new\n\n${menu}`;
    },
} as ICommandFunc;
