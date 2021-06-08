const {
    ControlHandler,
    waitForDebugger,
    TestInput,
    AmazonIntent,
    SkillTester
} = require('ask-sdk-controls');

const {describe,test} = require('mocha');
const {expect} = require('chai');

const {RootManager} = require('../src/index');
const speakText = require('../src/common/content/constants.json');

const {
    introText,
    burnText,
    burnNoText,
    burnYesText
} = speakText;

waitForDebugger();

describe('burn path',()=>{
    test('burn path yes',async()=>{
        const tester = new SkillTester(new ControlHandler(new RootManager()));

        const launchResponse = await tester.testTurn('U: __',TestInput.launchRequest(),`A:${introText}`);
        expect(launchResponse.response.shouldEndSession).equals(false);

        const burnResponse = await tester.testTurn('U: burning',TestInput.intent('burnIntent'), `A:${burnText}`);
        expect(burnResponse.response.shouldEndSession).equals(false);

        const burnYesResponse = await tester.testTurn('U: yes', TestInput.intent(AmazonIntent.YesIntent), `A:${burnYesText}`);
        expect(burnYesResponse.response.shouldEndSession).equals(false);
    });
    test('burn path no',async()=>{
        const tester = new SkillTester(new ControlHandler(new RootManager()));

        const launchResponse = await tester.testTurn('U: __',TestInput.launchRequest(),`A:${introText}`);
        expect(launchResponse.response.shouldEndSession).equals(false);

        const burnResponse = await tester.testTurn('U: burning',TestInput.intent('burnIntent'), `A:${burnText}`);
        expect(burnResponse.response.shouldEndSession).equals(false);

        const burnNoResponse = await tester.testTurn('U: no', TestInput.intent(AmazonIntent.NoIntent), `A:${burnNoText}.`);
        expect(burnNoResponse.response.shouldEndSession).equals(false);
    });
});
