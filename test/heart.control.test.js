const {
    ControlHandler,
    ControlManager,
    GeneralControlIntent,
    SingleValueControlIntent,
    Strings,
    AmazonIntent,
    waitForDebugger,
    TestInput,
    SkillTester,
    IntentBuilder,
    AmazonBuiltInSlotType,
} = require('ask-sdk-controls');
const { before, after, describe, test } = require('mocha');
const sinon = require('sinon');
const { RootManager } = require('../src/index');

const speakText = require('../src/common/content/constants.json');

const { introText, heartAttackText } = speakText;

waitForDebugger();

describe('warning signs of heart attack path', () => {
    test('heart attack', async () => {
        const tester = new SkillTester(new ControlHandler(new RootManager()));
        await tester.testTurn('U: __', TestInput.launchRequest(), `A:${introText}`);
        await tester.testTurn(
            'U: warning sings of a heart attack',
            TestInput.intent('heartWarningSignsIntent'),
            `A:${heartAttackText}`
        );
    });
});
