const {
    ControlHandler,
    AmazonIntent,
    waitForDebugger,
    testE2E,
    TestInput,
} = require('ask-sdk-controls');
const { describe, test } = require('mocha');
const { RootManager } = require('../src/index');

const speakText = require('../src/common/content/constants.json');

const { introText, bleedText, bleedYesText } = speakText;

waitForDebugger();

describe('cutmyself e2e', () => {
    test('cut E2E', async () => {
        await testE2E(new ControlHandler(new RootManager()), [
            'U:Open control first',
            TestInput.launchRequest(),
            `A:${introText}`,
            'U: I cut myself',
            TestInput.intent('bleedIntent'),
            `A:${bleedText}`.trim(),
            'U: yes',
            TestInput.intent(AmazonIntent.YesIntent),
            `A:${bleedYesText}`,
        ]);
    });
});
