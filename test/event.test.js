const { ControlHandler, TestInput, SkillTester } = require('ask-sdk-controls');

const { expect } = require('chai');

const { waitForDebugger } = require('ask-sdk-controls');

const { describe, test } = require('mocha');

const { RootManager } = require('../src/index.js');

const speakText = require('../src/common/content/constants.json');

const heartData = require('../src/common/content/heart.content.json');

const strokeData = require('../src/common/content/strokes.content.json');

const poisonData = require('../src/common/content/poison.content.json');

const cprData = require('../src/common/content/dehydration.content.json');

const dehydrationData = require('../src/common/content/dehydration.content.json');

const nosebleedData = require('../src/common/content/nosebleed.content.json');

waitForDebugger();

describe('event touch path', () => {
    test('Touch unit test :  heart attack', async () => {
        await testIntentRequest('heartControl', heartData);
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

async function testIntentRequest(controlId, responseText) {
    const tester = new SkillTester(new ControlHandler(new RootManager()));

    await tester.testTurn('', createTouchEvent(controlId), `A:${responseText.speakText.trim()}`);
}
