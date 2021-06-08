const {
    ControlHandler,
    AmazonIntent,
    waitForDebugger,
    TestInput,
    SkillTester,
} = require('ask-sdk-controls');
const {describe, test } = require('mocha');
const {expect} = require('chai');

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

        const launchResponse = await tester.testTurn('U: __', TestInput.launchRequest(), `A:${introText}`);
        expect(launchResponse.response.shouldEndSession).equals(false);

        const cutResponse = await tester.testTurn(
            'U: I cut myself',
            TestInput.intent('bleedIntent'),
            `A:${bleedText}`.trim()
        );
        expect(cutResponse.response.shouldEndSession).equals(false);

        const cutResponseYes = await tester.testTurn(
            'U: yes',
            TestInput.intent(AmazonIntent.YesIntent),
            `A:${bleedYesText}`
        );
        expect(cutResponseYes.response.shouldEndSession).equals(false);
    });
    test('cut path no yes', async () => {
        const tester = new SkillTester(new ControlHandler(new RootManager()));

        const launchResponse = await tester.testTurn('U: __', TestInput.launchRequest(), `A:${introText}`);
        expect(launchResponse.response.shouldEndSession).equals(false);

        const cutResponse = await tester.testTurn(
            'U: I cut myself',
            TestInput.intent('bleedIntent'),
            `A:${bleedText}`.trim()
        );
        expect(cutResponse.response.shouldEndSession).equals(false);

        const cutResponseNo = await tester.testTurn('U: no', TestInput.intent(AmazonIntent.NoIntent), `A:${bleedNoText}`);
        expect(cutResponseNo.response.shouldEndSession).equals(false);

        const cutResponseNoYes = await tester.testTurn(
            'U: yes',
            TestInput.intent(AmazonIntent.YesIntent),
            `A:${bleedYesSecondText}`.trim()
        );
        expect(cutResponseNoYes.response.shouldEndSession).equals(false);
    });
    test('cut path no no', async () => {
        const tester = new SkillTester(new ControlHandler(new RootManager()));

        const launchResponse = await tester.testTurn('U: __', TestInput.launchRequest(), `A:${introText}`);
        expect(launchResponse.response.shouldEndSession).equals(false);

        const cutResponse = await tester.testTurn(
            'U: I cut myself',
            TestInput.intent('bleedIntent'),
            `A:${bleedText}`.trim()
        );
        expect(cutResponse.response.shouldEndSession).equals(false);

        const cutResponseNo = await tester.testTurn('U: no', TestInput.intent(AmazonIntent.NoIntent), `A:${bleedNoText}`);
        expect(cutResponseNo.response.shouldEndSession).equals(false);

        const cutResponseNoNo = await tester.testTurn(
            'U: no',
            TestInput.intent(AmazonIntent.NoIntent),
            `A:${bleedNoSecondText}`.trim()
        );
        expect(cutResponseNoNo.response.shouldEndSession).equals(false);
    });
});
