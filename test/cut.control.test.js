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

const {
    introText,
    bleedText,
    bleedYesText,
    bleedNoText,
    bleedNoSecondText,
    bleedYesSecondText,
} = speakText;

waitForDebugger();

describe('cutmyself path', () => {
    test('cut path yes', async () => {
        const tester = new SkillTester(new ControlHandler(new RootManager()));
        await tester.testTurn('U: __', TestInput.launchRequest(), `A:${introText}`);
        await tester.testTurn(
            'U: I cut myself',
            TestInput.intent('bleedIntent'),
            `A:${bleedText}`.trim()
        );
        await tester.testTurn(
            'U: yes',
            TestInput.intent(AmazonIntent.YesIntent),
            `A:${bleedYesText}`
        );
    });
    test('cut path no yes', async () => {
        const tester = new SkillTester(new ControlHandler(new RootManager()));
        await tester.testTurn('U: __', TestInput.launchRequest(), `A:${introText}`);
        await tester.testTurn(
            'U: I cut myself',
            TestInput.intent('bleedIntent'),
            `A:${bleedText}`.trim()
        );
        await tester.testTurn('U: no', TestInput.intent(AmazonIntent.NoIntent), `A:${bleedNoText}`);
        await tester.testTurn(
            'U: yes',
            TestInput.intent(AmazonIntent.YesIntent),
            `A:${bleedYesSecondText}`.trim()
        );
    });
    test('cut path no no', async () => {
        const tester = new SkillTester(new ControlHandler(new RootManager()));
        await tester.testTurn('U: __', TestInput.launchRequest(), `A:${introText}`);
        await tester.testTurn(
            'U: I cut myself',
            TestInput.intent('bleedIntent'),
            `A:${bleedText}`.trim()
        );
        await tester.testTurn('U: no', TestInput.intent(AmazonIntent.NoIntent), `A:${bleedNoText}`);
        await tester.testTurn(
            'U: no',
            TestInput.intent(AmazonIntent.NoIntent),
            `A:${bleedNoSecondText}`.trim()
        );
    });
});
