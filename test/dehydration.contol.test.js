const {
    ControlHandler,
    waitForDebugger,
    TestInput,
    SkillTester
} = require('ask-sdk-controls');

const {describe,test} = require('mocha');
const {expect} = require('chai');

const {RootManager} = require('../src/index');

const speakText = require('../src/common/content/constants.json');

const {
    introText,
    dehydrationText
} = speakText;

waitForDebugger();

describe('dehydration  path',()=>{
    test('dehydration',async()=>{
        const tester = new SkillTester(new ControlHandler(new RootManager()));

        const launchResponse = await tester.testTurn('U: __',TestInput.launchRequest(),`A:${introText}`);
        expect(launchResponse.response.shouldEndSession).equals(false);

        const dehydrationResponse = await tester.testTurn('U: dehydration',TestInput.intent('dehydrationIntent'), `A:${dehydrationText}`.trim());
        expect(dehydrationResponse.response.shouldEndSession).equals(false);
    });
});
