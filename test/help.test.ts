describe('Tests', () => {
    beforeEach(() => {
        process.env = Object.assign(
            process.env,
            {
                LINE_ACCESS_TOKEN: 'test_token',
                LINE_SECRET: 'test_secret',
            },
        );
    });

    it('Help command', async () => {
        const { findCommand } = require('./test-helper');

        const command = findCommand('도움말');
        expect(command).not.toBeNull();

        try {
            const message = await command!.func.execute('test_user_id_01', []);
            expect(message).not.toBeNull();
        } catch (e) {
            fail(e);
        }
    });
});
