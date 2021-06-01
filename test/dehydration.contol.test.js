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
    dehydrationText
} = speakText

waitForDebugger();

describe('dehydration  path',()=>{
    test('dehydration',async()=>{
        const tester = new SkillTester(new ControlHandler(new RootManager()));
        await tester.testTurn('U: __',TestInput.launchRequest(),`A:${introText}`);
        await tester.testTurn('U: dehydration',TestInput.intent('dehydrationIntent'), `A:${dehydrationText}`.trim());
    });
})
