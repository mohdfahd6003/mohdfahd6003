const {
    ControlHandler,
    waitForDebugger,
    TestInput,
    AmazonIntent,
    SkillTester
} = require('ask-sdk-controls');

const {describe,test} = require('mocha');

const sinon = require('sinon');

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
        await tester.testTurn('U: __',TestInput.launchRequest(),`A:${introText}`);
        await tester.testTurn('U: How do I stop a Nose Bleed?',TestInput.intent('noseIntent'), `A:${noseBleedingText}`.trim());
    });
});
