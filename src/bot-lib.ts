import { IUser } from './types';

export const checkUser = (user?: IUser) => {
    if (!user) {
        throw new Error('안녕하세요.\n도시락 주문 Chatbot입니다.\n가입을 원하시면 "가입"이라고 입력해주세요.');
    }

    if (!user.confirm) {
        throw new Error('가입 승인 대기 상태입니다.\n곧 집밥슨생님께서 승인해 주실거에요. ^^');
    }
};

export const checkAdminUser = (user?: IUser) => {
    if (!user || !user.admin) {
        throw new Error('집밥슨생님만 사용할 수 있는 명령어입니다. 누구냐? 넌?');
    }
};
