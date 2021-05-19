const {
    ControlHandler,
    ControlManager,
    GeneralControlIntent,
    SingleValueControlIntent,
    Strings,
    AmazonIntent,
    waitForDebugger,
    testE2E,
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

describe('cutmyself e2e', () => {
    test('cut E2E', async () => {
        await testE2E(new ControlHandler(new RootManager()), [
            'U:Open control first',
            TestInput.launchRequest(),
            `A:${introText}`,
            'U: I cut myself',
            TestInput.intent('bleedIntent'),
            `A:${bleedText}`.trim(),
        ]);
    });
});
