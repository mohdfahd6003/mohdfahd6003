const {
    ControlHandler,
    AmazonIntent,
    waitForDebugger,
    SkillTester,
    TestInput
}= require('ask-sdk-controls');

const {expect} = require('chai');
const {describe, test} = require('mocha');

const {RootManager} = require('../src/index.js');

const chokeText = require('../src/common/content/choke.content.json');

const chokePregnantText = chokeText['chokingInfo.pregnant'];

const {chokingInfo} = chokeText;

const {speakText} = require('../src/common/util.js');

const {introText,chokeMainText} = speakText;

waitForDebugger();

describe('choke path',()=>{
    test('choke path pregnant yes',async()=>{
        const tester = new SkillTester(new ControlHandler(new RootManager()));

        const launchResponse = await tester.testTurn('U: __', TestInput.launchRequest(),`A: ${introText}`);
        expect(launchResponse.response.shouldEndSession).equals(false);

        const chokeResponse = await tester.testTurn('U: need assistance with choking',TestInput.intent('chokeIntent'),`A: ${chokeMainText}`);
        expect(chokeResponse.response.shouldEndSession).equals(false);

        const chokePregnantYesResponse = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokingInfo.yes.speechText}`.trim());
        expect(chokePregnantYesResponse.response.shouldEndSession).equals(false);
      
        // const chokePregnantYesYesResponse = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokePregnantText.yes.speechText}`);
        // expect(chokePregnantYesYesResponse.response.shouldEndSession).equals(false);

    });
});