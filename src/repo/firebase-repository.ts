import firebase from '@firebase/app';
import { FirebaseApp } from '@firebase/app-types';
import '@firebase/firestore';
import { FirebaseFirestore } from '@firebase/firestore-types';
import { IOrderStatus, IRepository, IUser, IUserOrder } from '../types';

const loadFirebase = (): FirebaseApp => {
    try {
        return firebase.app();
    } catch (err) {
        if (!/app\/no-app/.test(err.message)) {
            throw err;
        }

        return firebase.initializeApp({
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: 'dosirak-order-bot.firebaseapp.com',
            projectId: 'dosirak-order-bot',
            databaseURL: 'https://dosirak-order-bot.firebaseio.com',
        });
    }
};

const firebaseApp: FirebaseApp = loadFirebase();
const firestore: FirebaseFirestore = firebaseApp.firestore!();

export default {
    async saveUser(user: IUser): Promise<void> {
        await firestore
            .collection('users')
            .doc(user.userId)
            .set(user);
    },
    async removeUser(userId: string): Promise<void> {
        await firestore
            .collection('users')
            .doc(userId)
            .delete();
    },
    async getUser(userId: string): Promise<IUser | undefined> {
        const docRef = await firestore.collection('users').doc(userId).get();
        return docRef.exists ? docRef.data() as IUser : undefined;
    },
    async getAllUsers(): Promise<IUser[]> {
        const arr: IUser[] = [];
        const docRef = await firestore.collection('users').get();

        docRef.forEach(doc => arr.push(doc.data() as IUser));

        return arr;
    },
    async getRequestSignUpUsers(): Promise<IUser[]> {
        const arr: IUser[] = [];
        const docRef = await firestore
            .collection('users')
            .where('confirm', '==', false)
            .orderBy('registerDate')
            .get();

        docRef.forEach(doc => arr.push(doc.data() as IUser));

        return arr;
    },
    async saveUserOrder(userOrder: IUserOrder): Promise<void> {
        const docRef = firestore.collection('orders').doc(userOrder.ymd);
        const listRef = docRef.collection('list');
        const doc = await docRef.get();

        if (!doc.exists) {
            await docRef.set({
                ymd: userOrder.ymd,
                closed: false,
            } as IOrderStatus);
        }

        await listRef.doc(userOrder.userId).set(userOrder);
    },
    async removeUserOrder(ymd: string, userId: string): Promise<void> {
        await firestore
            .collection('orders')
            .doc(ymd)
            .collection('list')
            .doc(userId)
            .delete();
    },
    async getUserOrder(ymd: string, userId: string): Promise<IUserOrder | undefined> {
        const doc = await firestore
            .collection('orders')
            .doc(ymd)
            .collection('list')
            .doc(userId)
            .get();

        if (!doc.exists) {
            return undefined;
        }

        return doc.data() as IUserOrder;
    },
    async getUserOrders(ymd: string): Promise<IUserOrder[]> {
        const arr: IUserOrder[] = [];
        const userOrderList = await firestore
            .collection('orders')
            .doc(ymd)
            .collection('list')
            .orderBy('registerDate')
            .get();

        userOrderList.forEach(doc => arr.push(doc.data() as IUserOrder));

        return arr;
    },
    async getOrderStatus(ymd: string): Promise<IOrderStatus | undefined> {
        const doc = await firestore
            .collection('orders')
            .doc(ymd)
            .get();

        if (!doc.exists) {
            return undefined;
        }

        return doc.data() as IOrderStatus;
    },
    async saveOrderStatus(orderStatus: IOrderStatus): Promise<void> {
        await firestore
            .collection('orders')
            .doc(orderStatus.ymd)
            .update(orderStatus);
    },
} as IRepository;
