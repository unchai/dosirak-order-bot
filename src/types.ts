export interface IUser {
    userId: string;
    userName: string;
    confirm: boolean;
    admin: boolean;
    registerDate: Date;
}

export interface IMenu {
    name: string;
    price: number;
}

export interface IUserOrder {
    ymd: string,
    userId: string,
    userName: string,
    menu: string;
    price: number;
    payback: boolean;
    registerDate: Date;
}

export interface IOrderStatus {
    ymd: string;
    closed: boolean;
}

export interface ICommandFunc {
    execute(userId: string, args: string[]): Promise<string>;
}

export interface ICommand {
    keyword: string;
    func: ICommandFunc;
    usage?: string;
}

export interface IRepository {
    saveUser(user: IUser): void;

    removeUser(userId: string): void;

    getUser(userId: string): Promise<IUser | undefined>;

    getAllUsers(): Promise<IUser[]>;

    getRequestSignUpUsers(userId: string): Promise<IUser[]>;

    saveUserOrder(userOrder: IUserOrder): void;

    removeUserOrder(ymd: string, userId: string): void;

    getUserOrder(ymd: string, userId: string): Promise<IUserOrder | undefined>;

    getUserOrders(ymd: string): Promise<IUserOrder[]>;

    getOrderStatus(ymd: string): Promise<IOrderStatus | undefined>;

    saveOrderStatus(orderStatus: IOrderStatus): void;
}
