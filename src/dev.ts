import micro from 'micro';
import handler from './index';

micro(handler).listen(5000);
