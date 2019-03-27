import { findCommand } from './test-helper';

describe('Tests', () => {
    it('Help command', async () => {
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
