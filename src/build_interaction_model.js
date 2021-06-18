const { ControlInteractionModelGenerator, Logger } = require('ask-sdk-controls');
const { RootManager } = require('./index');

const log = new Logger('HelloWorld:InteractionModel');

new ControlInteractionModelGenerator()

    .withInvocationName('american heart association')
    .addIntent({ name: 'AMAZON.StopIntent' })
    .addIntent({ name: 'AMAZON.NavigateHomeIntent' })
    .addIntent({ name: 'AMAZON.HelpIntent' })
    .addIntent({ name: 'AMAZON.CancelIntent' })
    .addIntent({ name: 'HelloIntent', samples: ['hello', 'hi', 'hey', 'hey there', 'hi there'] })
    .addIntent({
        name: 'heartWarningSignsIntent',
        samples: [
            'Warning signs of a heart attack',
            'How do I know about heart attack',
            'signs of heart attack',
            'what are the signs of heart attack?',
            'tell me the signs of heart attack',
            'what could be the signs of heart attack?',
            'possible signs of heart attack',
            'help me heart attack warning signs',
            'symptoms of heart attack',
            'heart attack warning signs',
        ],
    })
    .addIntent({
        name: 'learnCPRIntent',
        samples: [
            'how to do c. p. r.',
            'how do I do c.p.r',
            'How do I do CPR?',
            'learn cpr',
            'how can I perform CPR',
            'what are the steps to do CPR?',
            'how to help some one with CPR?',
            'give me the steps to do CPR',
            'help me to do CPR',
        ],
    })
    .addYesAndNoIntents()
    .addIntent({
        name: 'bleedIntent',
        samples: [
            'I cut myself.  What do I do',
            'I cut myself. What do I do?',
            'I have been cut. What shall I do?',
            'I have cut myself with sharp object. What do I do?',
            'Can you provide me help, I have cut myself?',
            'tell me how to give fist aid for cut',
            'learn about cut fist aid',
        ],
    })
    .addIntent({
        name: 'chokeIntent',
        samples: [
            'learn about choking',
            'need assistance with choking',
            'warning signs of choking',
            'Tell me what to do for choking',
            'What should be done in case of choking',
            'help me with choking',
            'I need assistance for choking',
        ],
    })
    .addIntent({
        name: 'burnIntent',
        samples: [
            'burning',
            'What do I do for a burn?',
            'need assistance in burning',
            'how to help some with burn',
            'help me with burn',
            'What shall I don in case of burn?',
            'what to do for burn?',
        ],
    })
    .addIntent({
        name: 'dehydrationIntent',
        samples: [
            'dehydration',
            'What is Dehydration?',
            'explain me on Dehydration',
            'I am feeling weakness and dryness in mouth',
            'help me with dehydration',
            'what to do in case of dehydration?',
            'how to get rid of dehydration?',
            'what are the symptoms of dehydration?',
        ],
    })
    .addIntent({
        name: 'noseIntent',
        samples: [
            'nose bleeding',
            'How do I stop a Nose Bleed?',
            'my nose is bleeding. What shall I do?',
            'I have nose bleeding',
            'how can I stop nose bleeding?',
            'get me the steps to stop nose bleeding',
            'tell me how to stop nose bleeding',
            'my nose is bleeding. How to stop bleeding?',
        ],
    })
    .addIntent({
        name: 'poisonIntent',
        samples: [
            'poisoning',
            'Tell me what to do for poisoning',
            'what to do in case of poisoning',
            'how to help in poisoning',
            'what shall I do in case of poisoning?',
            'tell me about poisoning',
            'what is poisoning?',
        ],
    })
    .addIntent({
        name: 'strokeIntent',
        samples: [
            'warning signs of stroke',
            'How do I know about stroke',
            'signs of stroke',
            'what are the signs of stroke?',
            'tell me the signs of stroke',
            'what could be the signs of stroke?',
            'possible signs of stroke',
            'help me stroke warning signs',
            'symptoms of stroke',
            'stroke warning signs',
        ],
    })
    .buildCoreModelForControls(new RootManager())

    .buildAndWrite('en-US-generated.json');

log.info('Wrote ./en-US-generated.json');
