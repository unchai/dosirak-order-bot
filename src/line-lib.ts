import { Client, ClientConfig, MiddlewareConfig } from '@line/bot-sdk';

const LINE_CONFIG: ClientConfig & MiddlewareConfig = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN!,
    channelSecret: process.env.LINE_SECRET!,
};

const lineClient = new Client(LINE_CONFIG);

export default lineClient;
