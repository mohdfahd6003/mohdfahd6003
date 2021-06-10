const {
    ControlHandler,
    waitForDebugger,
    TestInput,
    SkillTester,
} = require('ask-sdk-controls');
const {describe, test } = require('mocha');
const {expect} = require('chai');

const { RootManager } = require('../src/index');
const speakText = require('../src/common/content/constants.json');

const { introText, poisonText } = speakText;

waitForDebugger();

describe('poisons path', () => {
    test('poisons attack', async () => {
        const tester = new SkillTester(new ControlHandler(new RootManager()));

        const launchResponse = await tester.testTurn('U: __', TestInput.launchRequest(), `A:${introText}`);
        expect(launchResponse.response.shouldEndSession).equals(false);

        const poisonResponse = await tester.testTurn(
            'U: warning sings of a poisons',
            TestInput.intent('poisonIntent'),
            `A:${poisonText}`
        );
        expect(poisonResponse.response.shouldEndSession).equals(false);
    });
});
