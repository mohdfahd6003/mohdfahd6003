const { AmazonIntent, waitForDebugger } = require('ask-sdk-controls');

const { describe, test } = require('mocha');

const { testIntentRequest, testLaunchRequest, getAllPossibleTestCases } = require('./util.js');

const chokeText = require('../src/common/content/choke.content.json');

const { speakText, assets, configData } = require('../src/common/utils/util.js');

const { introText, chokeMainText } = speakText;

const intentMapping = {
    no: AmazonIntent.NoIntent,
    yes: AmazonIntent.YesIntent,
};

waitForDebugger();

describe('choke path', async () => {
    await formChokeIntentTestCases();
});

async function formChokeIntentTestCases() {
    const chokeTestCasesArray = getAllPossibleTestCases(chokeText.chokingInfo, chokeText);

    return chokeTestCasesArray.map((cases) => {
        let topic = 'chokingInfo';
        let nextTopic = '';
        const path = cases.join(' ');
        return test(`choke path ${path}`, async () => {
            await testLaunchRequest(introText);
            await testIntentRequest('chokeIntent', 'need assistance with choking', chokeMainText);

            cases.forEach(async (item) => {
                if (topic) {
                    let { speechText } = chokeText[topic][item];
                    if (topic === 'chokingInfo.startCPR') {
                        speechText = speechText.replace(
                            'https://s3.amazonaws.com/ahaalexa/110-BPM-Metronome-short.mp3',
                            `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
                                assets.Audio['learncpr.control']
                            }`
                        );
                    }
                    nextTopic = chokeText[topic][item].continue;
                    if (nextTopic) {
                        topic = nextTopic;
                    } else {
                        topic = '';
                    }
                    await testIntentRequest(intentMapping[item], item, speechText);
                }
            });
        });
    });
}
