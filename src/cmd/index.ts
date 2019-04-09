import { ICommand } from '../types';
import cancelCloseOrder from './cancel-close-order';
import cancelMyOrder from './cancel-my-order';
import closeOrder from './close-order';
import confirmSignup from './confirm-signup';
import markPayback from './mark-payback';
import orderMenu from './order-menu';
import showHelp from './show-help';
import showMenu from './show-menu';
import showMyOrder from './show-my-order';
import showOrderGroupByMenu from './show-order-group-by-menu';
import showOrderGroupByUser from './show-order-group-by-user';
import showRequestSignup from './show-request-signup';
import signup from './signup';
import unmarkPayback from './unmark-payback';

export default [
    { keyword: '도움말', func: showHelp, usage: '도움말을 보여줍니다.' },
    { keyword: '가입', func: signup, usage: '가입 요청을 합니다. 가입 후 승인된 사용자만 주문할 수 있습니다.' },
    { keyword: '메뉴', func: showMenu, usage: '메뉴 목록을 보여줍니다.' },
    { keyword: '주문', func: orderMenu, usage: '"주문 [메뉴번호]"로 주문할 수 있습니다. 단 마감 이후에는 주문할 수 없습니다.' },
    { keyword: '내주문', func: showMyOrder, usage: '오늘 주문한 메뉴를 보여줍니다.' },
    { keyword: '주문취소', func: cancelMyOrder, usage: '주문한 메뉴를 취소합니다. 단, 마감 이후에는 취소할 수 없습니다.' },
    { keyword: '주문현황', func: showOrderGroupByUser, usage: '메뉴별 주문현황을 조회합니다. 특정일자를 조회할 경우 "주문현황 20170325"와 같이 입력해주세요.' },
    { keyword: '주문목록', func: showOrderGroupByMenu, usage: '주문자별 주문목록을 조회합니다. 특정일자를 조회할 경우 "주문목록 20170325"와 같이 입력해주세요.' },
    { keyword: '가입요청목록', func: showRequestSignup, usage: '(관리자전용) 가입요청한 사용자의 목록을 조회합니다.' },
    { keyword: '가입승인', func: confirmSignup, usage: '(관리자전용) 가입요청한 사용자를 승인합니다.' },
    { keyword: '주문마감', func: closeOrder, usage: '(관리자전용) 오늘 주문을 마감합니다.' },
    { keyword: '주문마감취소', func: cancelCloseOrder, usage: '(관리자전용) 주문 마감을 취소합니다.' },
    {
        keyword: '정산',
        func: markPayback,
        usage: '(관리자전용) "정산 [주문목록의 사용자번호]"로 정산완료 처리를 할 수 있습니다. 특정일자에서 완료처리를 해야 할 경우 "정산 20170325 [사용자번호]"와 같이 입력해주세요.',
    },
    { keyword: '정산취소', func: unmarkPayback, usage: '(관리자전용) 정산 완료처리를 취소합니다. 사용법은 "정산" 명령어와 같습니다.' },
] as ICommand[];
