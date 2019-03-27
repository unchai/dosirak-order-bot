import commands from '../src/cmd';
import { ICommand } from '../src/types';

export const findCommand = (keyword: string): ICommand | undefined =>
    commands.find(cmd => cmd.keyword === keyword);
