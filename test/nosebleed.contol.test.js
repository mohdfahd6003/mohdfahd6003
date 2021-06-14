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
    noseBleedingText
} = speakText;

waitForDebugger();

describe('nose bleed path',()=>{
    test('nose bleed',async()=>{
        const tester = new SkillTester(new ControlHandler(new RootManager()));

        const launchResponse = await tester.testTurn('U: __',TestInput.launchRequest(),`A:${introText}`);
        expect(launchResponse.response.shouldEndSession).equals(false);

        const noseBleedResponse = await tester.testTurn('U: How do I stop a Nose Bleed?',TestInput.intent('noseIntent'), `A:${noseBleedingText}`.trim());
        expect(noseBleedResponse.response.shouldEndSession).equals(false);
    });
});
