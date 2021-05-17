const {
    ControlHandler,
    ControlManager,
    GeneralControlIntent,
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

const { introText, poisonText } = speakText;
waitForDebugger();

describe('poisons path', () => {
    test('poisons attack', async () => {
        const tester = new SkillTester(new ControlHandler(new RootManager()));
        await tester.testTurn('U: __', TestInput.launchRequest(), `A:${introText}`);
        await tester.testTurn(
            'U: warning sings of a poisons',
            TestInput.intent('poisonIntent'),
            `A:${poisonText}`
        );
    });
});
