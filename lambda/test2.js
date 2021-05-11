const {
    ControlHandler,
    GeneralControlIntent,
    SingleValueControlIntent,
    Strings,
    AmazonIntent,
    waitForDebugger,
    TestInput,
    SkillTester,
    IntentBuilder,
    AmazonBuiltInSlotType,
} = require('ask-sdk-controls');
const { before, after, describe, test } = require('mocha');
const sinon = require('sinon');
const { RootManager } = require('./index');

waitForDebugger();

describe('Simple dialogs - user follows the system initiative', () => {
    test('welcome', async () => {
        const tester = new SkillTester(new ControlHandler(new RootManager()));
        await tester.testTurn(
            'U: __',
            TestInput.launchRequest(),
            'A: The American Heart Association has been working to reduce disability and deaths caused by heart disease since 1924. Heart disease is the leading cause of death globally, and can cause numerous problems including heart attack or stroke. Would you like to learn  about heart attacks, learn about strokes, or learn CPR?'
        );
    });
});
