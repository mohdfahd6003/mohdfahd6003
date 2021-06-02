const {
    ControlHandler,
    waitForDebugger,
    TestInput,
    AmazonIntent,
    SkillTester
} = require('ask-sdk-controls');

const {before,after,describe,test} = require('mocha');

const sinon = require('sinon');

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
        await tester.testTurn('U: __',TestInput.launchRequest(),`A:${introText}`);
        await tester.testTurn('U: burning',TestInput.intent('burnIntent'), `A:${burnText}`);
        await tester.testTurn('U: yes', TestInput.intent(AmazonIntent.YesIntent), `A:${burnYesText}`);
    });
    test('burn path no',async()=>{
        const tester = new SkillTester(new ControlHandler(new RootManager()));
        await tester.testTurn('U: __',TestInput.launchRequest(),`A:${introText}`);
        await tester.testTurn('U: burning',TestInput.intent('burnIntent'), `A:${burnText}`);
        await tester.testTurn('U: no', TestInput.intent(AmazonIntent.NoIntent), `A:${burnNoText}.`);
    });
});
