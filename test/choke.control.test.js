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

const chokingPregnant = chokeText['chokingInfo.pregnant.choking'];

const chokePregnantText = chokeText['chokingInfo.pregnant'];

const chokingAdult = chokeText['chokingInfo.adult'];

const chokePregnanthelp = chokeText['chokingInfo.pregnant.help'];

const chokeAdultHelp =  chokeText['chokingInfo.adult.help'];

const chokePregnantObject = chokeText['chokingInfo.pregnant.object'];

const chokeInfantObject = chokeText['chokingInfo.infant.object'];

const chokeAdultObject = chokeText['chokingInfo.adult.object'];

const chokeStartCPR = chokeText['chokingInfo.startCPR'];

const chokeAdultSign = chokeText['chokingInfo.adult.chokingSign'];

const chokeInfantOrAdult = chokeText['chokingInfo.infantOrAdult'];

const chokeInfantBreath = chokeText['chokingInfo.infant.breath'];

const {chokingInfo} = chokeText;

const {speakText,assets,configData} = require('../src/common/util.js');

const {introText,chokeMainText} = speakText;

const tester = new SkillTester(new ControlHandler(new RootManager()));

async function testLaunchIntent(){
    const launchResponse = await tester.testTurn('U: __', TestInput.launchRequest(),`A: ${introText}`);
    expect(launchResponse.response.shouldEndSession).equals(false);

}

async function testChokeIntent(){
    const chokeResponse = await tester.testTurn('U: need assistance with choking',TestInput.intent('chokeIntent'),`A: ${chokeMainText}`);
    expect(chokeResponse.response.shouldEndSession).equals(false);
}



waitForDebugger();

describe('choke path',()=>{

    test('choke path pregnant no no no no no',async()=>{
        await testLaunchIntent();

        await testChokeIntent();

        const chokeResponseTurn3 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokingInfo.no.speechText}`.trim());
        expect(chokeResponseTurn3.response.shouldEndSession).equals(false);

        const chokeResponseTurn4 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokeInfantOrAdult.no.speechText}`.trim());
        expect(chokeResponseTurn4.response.shouldEndSession).equals(false);

        const chokeResponseTurn5 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokingAdult.no.speechText}`.trim());
        expect(chokeResponseTurn5.response.shouldEndSession).equals(false);

        const chokeResponseTurn6 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokeAdultSign.no.speechText}`.trim());
        expect(chokeResponseTurn6.response.shouldEndSession).equals(false);

        const chokeResponseTurn7 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokeStartCPR.no.speechText}`.trim());
        expect(chokeResponseTurn7.response.shouldEndSession).equals(false);
    });
    test('choke path pregnant no no no no yes',async()=>{
        await testLaunchIntent();

        await testChokeIntent();

        const chokeResponseTurn3 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokingInfo.no.speechText}`.trim());
        expect(chokeResponseTurn3.response.shouldEndSession).equals(false);

        const chokeResponseTurn4 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokeInfantOrAdult.no.speechText}`.trim());
        expect(chokeResponseTurn4.response.shouldEndSession).equals(false);

        const chokeResponseTurn5 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokingAdult.no.speechText}`.trim());
        expect(chokeResponseTurn5.response.shouldEndSession).equals(false);

        const chokeResponseTurn6 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokeAdultSign.no.speechText}`.trim());
        expect(chokeResponseTurn6.response.shouldEndSession).equals(false);

        const chokeResponseTurn7 = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokeStartCPR.yes.speechText}`.replace('https://s3.amazonaws.com/ahaalexa/110-BPM-Metronome-short.mp3',`https://${configData[process.env.ENVIRONMENT].cloudfront}/${assets.Audio['learncpr.control']}`).trim());
        expect(chokeResponseTurn7.response.shouldEndSession).equals(false);
    });
    test('choke path pregnant no no no yes yes yes',async()=>{
        await testLaunchIntent();

        await testChokeIntent();

        const chokeResponseTurn3 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokingInfo.no.speechText}`.trim());
        expect(chokeResponseTurn3.response.shouldEndSession).equals(false);

        const chokeResponseTurn4 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokeInfantOrAdult.no.speechText}`.trim());
        expect(chokeResponseTurn4.response.shouldEndSession).equals(false);

        const chokeResponseTurn5 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokingAdult.no.speechText}`.trim());
        expect(chokeResponseTurn5.response.shouldEndSession).equals(false);

        const chokeResponseTurn6 = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokeAdultSign.yes.speechText}`.trim());
        expect(chokeResponseTurn6.response.shouldEndSession).equals(false);

        const chokeResponseTurn7 = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokeAdultHelp.yes.speechText}`.trim());
        expect(chokeResponseTurn7.response.shouldEndSession).equals(false);

        const chokeResponseTurn8 = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokeAdultObject.yes.speechText}`.trim());
        expect(chokeResponseTurn8.response.shouldEndSession).equals(false);
    });
    test('choke path pregnant no yes yes',async()=>{
        await testLaunchIntent();

        await testChokeIntent();

        const chokeResponseTurn3 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokingInfo.no.speechText}`.trim());
        expect(chokeResponseTurn3.response.shouldEndSession).equals(false);

        const chokeResponseTurn4 = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokeInfantOrAdult.yes.speechText}`.trim());
        expect(chokeResponseTurn4.response.shouldEndSession).equals(false);

        const chokeResponseTurn5 = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokeInfantBreath.yes.speechText}`.trim());
        expect(chokeResponseTurn5.response.shouldEndSession).equals(false);
    });
    test('choke path pregnant no yes no yes',async()=>{
        await testLaunchIntent();

        await testChokeIntent();

        const chokeResponseTurn3 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokingInfo.no.speechText}`.trim());
        expect(chokeResponseTurn3.response.shouldEndSession).equals(false);

        const chokeResponseTurn4 = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokeInfantOrAdult.yes.speechText}`.trim());
        expect(chokeResponseTurn4.response.shouldEndSession).equals(false);

        const chokeResponseTurn5 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokeInfantBreath.no.speechText}`.trim());
        expect(chokeResponseTurn5.response.shouldEndSession).equals(false);

        const chokeResponseTurn6 = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokeInfantObject.yes.speechText}`.trim());
        expect(chokeResponseTurn6.response.shouldEndSession).equals(false);
    });
    test('choke path pregnant no yes no no',async()=>{
        await testLaunchIntent();

        await testChokeIntent();

        const chokeResponseTurn3 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokingInfo.no.speechText}`.trim());
        expect(chokeResponseTurn3.response.shouldEndSession).equals(false);

        const chokeResponseTurn4 = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokeInfantOrAdult.yes.speechText}`.trim());
        expect(chokeResponseTurn4.response.shouldEndSession).equals(false);

        const chokeResponseTurn5 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokeInfantBreath.no.speechText}`.trim());
        expect(chokeResponseTurn5.response.shouldEndSession).equals(false);

        const chokeResponseTurn6 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokeInfantObject.no.speechText}`.trim());
        expect(chokeResponseTurn6.response.shouldEndSession).equals(false);
    });
    test('choke path pregnant no no yes',async()=>{
        await testLaunchIntent();

        await testChokeIntent();

        const chokeResponseTurn3 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokingInfo.no.speechText}`.trim());
        expect(chokeResponseTurn3.response.shouldEndSession).equals(false);

        const chokeResponseTurn4 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokeInfantOrAdult.no.speechText}`.trim());
        expect(chokeResponseTurn4.response.shouldEndSession).equals(false);

        const chokeResponseTurn5 = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokingAdult.yes.speechText}`.trim());
        expect(chokeResponseTurn5.response.shouldEndSession).equals(false);
    });
    test('choke path pregnant yes yes',async()=>{
        await testLaunchIntent();

        await testChokeIntent();

        const chokeResponseTurn3 = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokingInfo.yes.speechText}`.trim());
        expect(chokeResponseTurn3.response.shouldEndSession).equals(false);

        const chokeResponseTurn4 = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokePregnantText.yes.speechText}`.trim());
        expect(chokeResponseTurn4.response.shouldEndSession).equals(false);

    });
    test('choke path pregnant yes no no no',async()=>{
        await testLaunchIntent();

        await testChokeIntent();

        const chokeResponseTurn3 = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokingInfo.yes.speechText}`.trim());
        expect(chokeResponseTurn3.response.shouldEndSession).equals(false);

        const chokeResponseTurn4 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokePregnantText.no.speechText}`.trim());
        expect(chokeResponseTurn4.response.shouldEndSession).equals(false);

        const chokeResponseTurn5 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokingPregnant.no.speechText}`.trim());
        expect(chokeResponseTurn5.response.shouldEndSession).equals(false);

        const chokeResponseTurn6 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokeStartCPR.no.speechText}`.trim());
        expect(chokeResponseTurn6.response.shouldEndSession).equals(false);

    });
    test('choke path pregnant yes no yes yes yes',async()=>{
        await testLaunchIntent();

        await testChokeIntent();

        const chokeResponseTurn3 = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokingInfo.yes.speechText}`.trim());
        expect(chokeResponseTurn3.response.shouldEndSession).equals(false);

        const chokeResponseTurn4 = await tester.testTurn('U: no',TestInput.intent(AmazonIntent.NoIntent),`A: ${chokePregnantText.no.speechText}`.trim());
        expect(chokeResponseTurn4.response.shouldEndSession).equals(false);

        const chokeResponseTurn5 = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokingPregnant.yes.speechText}`.trim());
        expect(chokeResponseTurn5.response.shouldEndSession).equals(false);

        const chokeResponseTurn6 = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokePregnanthelp.yes.speechText}`.trim());
        expect(chokeResponseTurn6.response.shouldEndSession).equals(false);

        const chokeResponseTurn7 = await tester.testTurn('U: yes',TestInput.intent(AmazonIntent.YesIntent),`A: ${chokePregnantObject.yes.speechText}`.trim());
        expect(chokeResponseTurn7.response.shouldEndSession).equals(false);

    });
});