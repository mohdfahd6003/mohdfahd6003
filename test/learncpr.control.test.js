const { waitForDebugger } = require('ask-sdk-controls');

const { describe, test } = require('mocha');

const { configData, assets } = require('../src/common/utils/util.js');
const { testIntentRequest, testLaunchRequest } = require('./util.js');

const { introText } = require('../src/common/content/constants.json');
const { speakTextOne, speakTextTwo } = require('../src/common/content/learncpr.content.json');

waitForDebugger();

describe('learn CPR  path', () => {
    test('learn CPR', async () => {
        await testLaunchRequest(introText);

        await testIntentRequest(
            'learnCPRIntent',
            'How do I do CPR?',
            `${speakTextOne} <audio src="https://${
                configData[process.env.ENVIRONMENT].cloudfront
            }/${assets.Audio['learncpr.control']}"/> ${speakTextTwo}`
        );
    });
});
