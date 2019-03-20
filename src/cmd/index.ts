import { ICommand } from '../types';
import cancelCloseOrder from './cancel-close-order';
import cancelMarkPayback from './cancel-mark-payback';
import cancelMyOrder from './cancel-my-order';
import closeOrder from './close-order';
import markPayback from './mark-payback';
import orderMenu from './order-menu';
import showMenu from './show-menu';
import showMyOrder from './show-my-order';
import showOrderGroupByMenu from './show-order-group-by-menu';
import showOrderGroupByUser from './show-order-group-by-user';
import signup from './signup';

export default [
    { keyword: '가입', func: signup },
    { keyword: '메뉴', func: showMenu },
    { keyword: '내주문', func: showMyOrder },
    { keyword: '주문취소', func: cancelMyOrder },
    { keyword: '주문', func: orderMenu },
    { keyword: '주문마감', func: closeOrder },
    { keyword: '주문마감취소', func: cancelCloseOrder },
    { keyword: '주문현황', func: showOrderGroupByUser },
    { keyword: '주문목록', func: showOrderGroupByMenu },
    { keyword: '정산', func: markPayback },
    { keyword: '정산취소', func: cancelMarkPayback },
] as ICommand[];
