import { Client, ClientConfig, MiddlewareConfig } from '@line/bot-sdk';
import axios from 'axios';
import { ILineUser } from './types';

const LINE_CONFIG: ClientConfig & MiddlewareConfig = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN!,
    channelSecret: process.env.LINE_SECRET!,
};

let client;

export const resolveLineUser = async (userId: string): Promise<ILineUser> => {
    const res = await axios.get(`https://api.line.me/v2/bot/profile/${userId}`, {
        headers: { 'Authorization': `Bearer ${LINE_CONFIG.channelAccessToken}` },
    });

    return res.data;
};

export const reply = async (replyToken: string, text: string) => {
    if (!client) {
        client = new Client(LINE_CONFIG);
    }

    return client.replyMessage(replyToken, { type: 'text', text });
};
