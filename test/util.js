const { ControlHandler, TestInput, SkillTester } = require('ask-sdk-controls');

const { expect } = require('chai');

const { RootManager } = require('../src/index.js');

async function testLaunchRequest(speakText) {
    const tester = new SkillTester(new ControlHandler(new RootManager()));

    const launchResponse = await tester.testTurn(
        'U: __',
        TestInput.launchRequest(),
        `A: ${speakText}`.trim()
    );
    expect(launchResponse.response.shouldEndSession).equals(false);
}

async function testIntentRequest(intentName, inputText, speakText) {
    const tester = new SkillTester(new ControlHandler(new RootManager()));

    const intentResponse = await tester.testTurn(
        `U: ${inputText}`,
        TestInput.intent(intentName),
        `A:${speakText}`.trim()
    );
    expect(intentResponse.response.shouldEndSession).equals(false);
}

const getAllPossibleTestCases = (key, input) => {
    const output2DArray = [];
    const iterateObject = (objectKey, path) => {
        if (objectKey.yes) {
            path.push('yes');
            if (!objectKey.yes.continue) {
                output2DArray.push(Object.assign([], path));
                path.pop();
            } else {
                iterateObject(input[objectKey.yes.continue], path);
            }
        }
        if (objectKey.no) {
            path.push('no');
            if (!objectKey.no.continue) {
                output2DArray.push(Object.assign([], path));
                path.pop();
            } else {
                iterateObject(input[objectKey.no.continue], path);
            }
        }
        path.pop();
    };
    iterateObject(key, []);
    return output2DArray;
};

module.exports = {
    testLaunchRequest,
    testIntentRequest,
    getAllPossibleTestCases,
};
