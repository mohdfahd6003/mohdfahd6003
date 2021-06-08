const {
    ControlHandler,
    waitForDebugger,
    SkillTester,
    TestInput
} = require('ask-sdk-controls');

const {describe, test} = require('mocha');
const {expect} = require('chai');

const {RootManager} = require('../src/index.js');
const {introText} = require('../src/common/content/constants.json');
const {speakText} = require('../src/common/content/strokes.content.json');


waitForDebugger();

describe('stroke intent path',()=>{
    test('stroke',async()=>{
        const tester = new SkillTester(new ControlHandler(new RootManager));

        const launchResponse = await tester.testTurn('U: __', TestInput.launchRequest(),`A: ${introText}`);
        expect(launchResponse.response.shouldEndSession).equals(false);

        const strokeResponse = await tester.testTurn('U: warning signs of stroke',TestInput.intent('strokeIntent'), `A: ${speakText}`);
        expect(strokeResponse.response.shouldEndSession).equals(false);
    });
});