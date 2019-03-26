import { MessageEvent, TextEventMessage, WebhookEvent, WebhookRequestBody } from '@line/bot-sdk';
import { IncomingMessage, ServerResponse } from 'http';
import { json } from 'micro';
import commands from './cmd';
import { reply } from './line-lib';

const handleEvent = async (event: MessageEvent) => {
    const { source } = event;
    const args = (event.message as TextEventMessage).text.split(' ');

    if (source.type !== 'user') {
        throw new Error('안녕하세요. 미안하지만 사람만 저와 대화할 수 있어요~ ^^');
    }

    if (event.type === 'message' && event.message.type === 'text') {
        const command = commands.find(item => item.keyword === args[0]);

        if (command) {
            return command.func.execute(source.userId, args);
        }
    }

    throw new Error('무슨말인지 잘 모르겠어요.\n"도움말"이라고 입력해보시겠어요?');
};

export default async (req: IncomingMessage, res: ServerResponse) => {
    const reqBody: WebhookRequestBody = await json(req) as WebhookRequestBody;

    Promise
        .all(
            reqBody.events.map(
                async (event: WebhookEvent) => {
                    let message = '';

                    try {
                        message = await handleEvent(event as MessageEvent);
                    } catch (err) {
                        console.error(err);
                        message = err.message;
                    }

                    return reply((event as MessageEvent).replyToken, message);
                },
            ),
        )
        .then(() => res.end());
};
