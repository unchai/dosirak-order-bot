import commands from './cmd';

const command = commands.find(cmd => cmd.keyword === '주문');

(async () => {
    if (command) {
        console.log(await command.func.execute('abcdefg', []));
    }
})();
