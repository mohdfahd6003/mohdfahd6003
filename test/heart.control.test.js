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

const { introText, heartAttackText } = speakText;

waitForDebugger();

describe('warning signs of heart attack path', () => {
    test('heart attack', async () => {
        const tester = new SkillTester(new ControlHandler(new RootManager()));

        const launchResponse = await tester.testTurn('U: __', TestInput.launchRequest(), `A:${introText}`);
        expect(launchResponse.response.shouldEndSession).equals(false);

        const heartResponse = await tester.testTurn(
            'U: warning sings of a heart attack',
            TestInput.intent('heartWarningSignsIntent'),
            `A:${heartAttackText}`
        );
        expect(heartResponse.response.shouldEndSession).equals(false);
    });
});
