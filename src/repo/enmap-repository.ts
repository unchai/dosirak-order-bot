import Enmap from 'enmap';
import { IOrderStatus, IRepository, IUser, IUserOrder } from '../types';

const enmap = new Enmap();
enmap.set('users', {});
enmap.set('orders', {});

export default {
    async saveUser(user: IUser): Promise<void> {
        enmap.setProp('users', user.userId, user);
    },
    async removeUser(userId: string): Promise<void> {
        enmap.remove('users', userId);
    },
    async getUser(userId: string): Promise<IUser | undefined> {
        return enmap.getProp('users', userId);
    },
    async getAllUsers(): Promise<IUser[]> {
        return enmap.get('users');
    },
    async getRequestSignUpUsers(): Promise<IUser[]> {
        return [];
    },
    async saveUserOrder(userOrder: IUserOrder): Promise<void> {
        if (enmap.getProp('orders', userOrder.ymd)) {
            enmap.setProp(
                'orders',
                userOrder.ymd,
                {
                    list: [],
                    ymd: userOrder.ymd,
                    closed: false,
                },
            );
        }

        enmap.setProp(
            'orders',
            `${userOrder.ymd}.list.${userOrder.userId}`,
            userOrder,
        );
    },
    async removeUserOrder(ymd: string, userId: string): Promise<void> {
        enmap.deleteProp('orders', `${ymd}.list.${userId}`);
    },
    async getUserOrder(ymd: string, userId: string): Promise<IUserOrder | undefined> {
        return enmap.getProp('orders', `${ymd}.list.${userId}`);
    },
    async getUserOrders(ymd: string): Promise<IUserOrder[]> {
        return enmap.getProp('orders', `${ymd}.list`);
    },
    async getOrderStatus(ymd: string): Promise<IOrderStatus | undefined> {
        if (enmap.get('orders', ymd)) {
            return {
                ymd: enmap.getProp('orders', `${ymd}.ymd`),
                closed: enmap.getProp('orders', `${ymd}.closed`),
            };
        }

        return undefined;
    },
    async saveOrderStatus(orderStatus: IOrderStatus): Promise<void> {
        if (enmap.get('orders', orderStatus.ymd)) {
            enmap.setProp('orders', `${orderStatus.ymd}.ymd`, orderStatus.ymd);
            enmap.setProp('orders', `${orderStatus.ymd}.closed`, orderStatus.closed);
        }
    },
} as IRepository;