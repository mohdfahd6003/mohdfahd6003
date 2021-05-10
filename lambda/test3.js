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

/**
 * @param {SkillTester} tester
 */
async function chooseApples(tester) {
    await tester.testTurn(
        'U: __',
        TestInput.launchRequest(),
        'A: Welcome to the fruit shop. What would you like?'
    );

    /* await tester.testTurn(
        'U: fruit',
        TestInput.intent(SingleValueControlIntent.of('Category', { Category: 'fruit' })),
        'A: Some of our favorite fruits are apples, bananas and oranges. Which would you like?'
    );

    await tester.testTurn(
        'U: apples',
        TestInput.intent(SingleValueControlIntent.of('Product', { Product: 'apple' })),
        'A: How many apples?'
    ); */
}

/**
 * @param {SkillTester} tester
 */
async function addOneApple(tester) {
    await chooseApples(tester);

    await tester.testTurn(
        'U: one',
        TestInput.intent(
            SingleValueControlIntent.of(AmazonBuiltInSlotType.NUMBER, { 'AMAZON.NUMBER': '1' })
        ),
        'A: OK. Added 1 apple. Would you like to add another item?'
    );
}

/**
 * @param {SkillTester} tester
 */
async function addOneAppleAndProceedToDeliveryStep(tester) {
    await addOneApple(tester);

    await tester.testTurn(
        'U: no',
        TestInput.intent(GeneralControlIntent.of({ feedback: Strings.Feedback.Disaffirm })),
        'A: OK. When would you like these items delivered?'
    );
}

describe('all', () => {
    before(() => {
        // set now to 2019-01-03
        sinon.useFakeTimers(new Date('2019-01-03T21:55:38.151Z'));
    });
    after(() => {
        // set now to 2019-01-03
        sinon.restore();
    });

    describe('Simple dialogs - user follows the system initiative', () => {
        test('welcome', async () => {
            const tester = new SkillTester(new ControlHandler(new RootManager()));
            await tester.testTurn(
                'U: __',
                TestInput.launchRequest(),
                'A: Welcome to the fruit shop. What would you like?'
            );
        });

        test('choose to add apples', async () => {
            const tester = new SkillTester(new ControlHandler(new RootManager()));
            await chooseApples(tester);
        });

        test('choose invalid category', async () => {
            const tester = new SkillTester(new ControlHandler(new RootManager()));
            await tester.testTurn(
                'U: __',
                TestInput.launchRequest(),
                'A: Welcome to the fruit shop. What would you like?'
            );

            await tester.testTurn(
                'U: meat',
                TestInput.intent(SingleValueControlIntent.of('Category', { Category: 'meat' })),
                "A: Sorry, I don't know that product category. What would you like?"
            );
        });
    });
});

/*
 * Tests yet to be written (but functionality implemented)
 *  * Touch interaction with shopping cart
 *  * Touch interaction with ListControls (category, product)
 */
