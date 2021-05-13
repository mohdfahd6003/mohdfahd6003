const {
    ControlHandler,
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
const { RootManager } = require('./index');

const speakText = require('./common/content/constants.json');

const {
    introText,
    heartAttackText,
    poisonText,
    bleedText,
    bleedYesText,
    bleedNoText,
    bleedNoSecondText,
} = speakText;

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

describe('cutmyself path 1', () => {
    test('cut path', async () => {
        const tester = new SkillTester(new ControlHandler(new RootManager()));
        await tester.testTurn('U: __', TestInput.launchRequest(), `A:${introText}`);
        await tester.testTurn('U: I cut myself', TestInput.intent('bleedIntent'), `A:${bleedText}`);
        await tester.testTurn(
            'U: yes',
            TestInput.intent(AmazonIntent.YesIntent),
            `A:${bleedYesText}`
        );
    });
});

describe('cutmyself path 2', () => {
    test('cut path', async () => {
        const tester = new SkillTester(new ControlHandler(new RootManager()));
        await tester.testTurn('U: __', TestInput.launchRequest(), `A:${introText}`);
        await tester.testTurn('U: I cut myself', TestInput.intent('bleedIntent'), `A:${bleedText}`);
        await tester.testTurn('U: no', TestInput.intent(AmazonIntent.NoIntent), `A:${bleedNoText}`);
        await tester.testTurn(
            'U: no',
            TestInput.intent(AmazonIntent.NoIntent),
            `A:${bleedNoSecondText}`
        );
    });
});
