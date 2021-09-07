const { ControlHandler, TestInput, SkillTester } = require('ask-sdk-controls');

const { expect } = require('chai');

const { waitForDebugger } = require('ask-sdk-controls');

const { describe, test } = require('mocha');

const { RootManager } = require('../src/index.js');

const speakText = require('../src/common/content/constants.json');

const heartData = require('../src/common/content/heart.content.json');

const strokeData = require('../src/common/content/strokes.content.json');

const poisonData = require('../src/common/content/poison.content.json');

const learncprData = require('../src/common/content/learncpr.content.json');

const dehydrationData = require('../src/common/content/dehydration.content.json');

const nosebleedData = require('../src/common/content/nosebleed.content.json');

const cutData = require('../src/common/content/cut.content.json');

const burnData = require('../src/common/content/burn.content.json');

const { configData, assets } = require('../src/common/utils/util');

waitForDebugger();

describe('event touch path', () => {
    test('touch unit test: heart attack', async () => {
        await testIntentRequest('heartControl', heartData);
    });
    test('touch unit test: strokes ', async () => {
        await testIntentRequest('strokeControl', strokeData);
    });
    test('touch unit test: poison ', async () => {
        await testIntentRequest('poisonControl', poisonData);
    });
    test('touch unit test: dehydration ', async () => {
        await testIntentRequest('dehydrationControl', dehydrationData);
    });
    test('touch unit test: nose bleed ', async () => {
        await testIntentRequest('nosebleedingControl', nosebleedData);
    });

    test('touch unit test: learn CPR ', async () => {
        const { speakTextOne, speakTextTwo } = learncprData;
        const combinedData = {};
        combinedData.speakText = `${speakTextOne} <audio src="https://${
            configData[process.env.ENVIRONMENT].cloudfront
        }/${assets.Audio.learncprControl}"/> ${speakTextTwo}`;
        await testIntentRequest('learncprControl', combinedData);
    });

    test('touch unit test: choke ', async () => {
        const chokeData = {};
        chokeData.speakText = speakText.chokeMainText;
        await testIntentRequest('chokeControlMain', chokeData);
    });
    test('touch unit test: bleed ', async () => {
        await testIntentRequest('cutControl', cutData.main);
    });
    test('touch unit test: burn ', async () => {
        await testIntentRequest('burnControl', burnData.main);
    });
});

function createTouchEvent(controlId) {
    return TestInput.userEvent({
        type: 'Alexa.Presentation.APL.UserEvent',
        requestId: '12345',
        timestamp: '2019-10-04T18:48:22Z',
        locale: 'en-US',
        arguments: ['one', 'two'],
        components: {},
        source: {
            type: 'TouchWrapper',
            handler: 'Press',
            id: controlId,
        },
        token: '',
    });
}

function createTouchEventRound(controlId) {
    return TestInput.userEvent({
        type: 'Alexa.Presentation.APL.UserEvent',
        requestId: '12345',
        timestamp: '2019-10-04T18:48:22Z',
        locale: 'en-US',
        arguments: ['one', 'two', controlId],
        components: {},
        source: {
            type: 'TouchWrapper',
            handler: 'Press',
            id: '',
        },
        token: '',
    });
}

async function testIntentRequest(controlId, responseText) {
    const tester = new SkillTester(new ControlHandler(new RootManager()));

    await tester.testTurn('', createTouchEvent(controlId), `A:${responseText.speakText.trim()}`);
    await tester.testTurn(
        '',
        createTouchEventRound(controlId),
        `A:${responseText.speakText.trim()}`
    );
}
