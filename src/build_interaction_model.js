const { ControlInteractionModelGenerator, Logger } = require('ask-sdk-controls');
const { RootManager } = require('./index');

const log = new Logger('HelloWorld:InteractionModel');

new ControlInteractionModelGenerator()

    .withInvocationName('american heart association')
    .addIntent({ name: 'AMAZON.StopIntent' })
    .addIntent({ name: 'AMAZON.NavigateHomeIntent' })
    .addIntent({ name: 'AMAZON.HelpIntent' })
    .addIntent({ name: 'AMAZON.CancelIntent' })
    .addIntent({ name: 'HelloIntent', samples: ['Say hello', 'Say hi'] })
    .addIntent({
        name: 'heartWarningSignsIntent',
        samples: ['Warning signs of a heart attack', 'How do I know about heart attack'],
    })
    .addIntent({
        name: 'learnCPRIntent',
        samples: ['how to do c. p. r.', 'how do I do c.p.r', 'How do I do CPR?'],
    })
    .addYesAndNoIntents()
    .addIntent({
        name: 'bleedIntent',
        samples: ['I cut myself.  What do I do', 'I cut myself. What do I do?'],
    })
    .addIntent({
        name: 'chokeIntent',
        samples: [
            'learn about choking',
            'need assistance with choking',
            'warning signs of choking',
            'Tell me what to do for choking',
        ],
    })
    .addIntent({
        name: 'burnIntent',
        samples: ['burning', 'What do I do for a burn?'],
    })
    .addIntent({
        name: 'dehydrationIntent',
        samples: ['dehydration', 'What is Dehydration?', 'explain me on Dehydration'],
    })
    .addIntent({
        name: 'noseIntent',
        samples: ['nose bleeding', 'How do I stop a Nose Bleed?'],
    })
    .addIntent({
        name: 'poisonIntent',
        samples: ['poisoning', 'Tell me what to do for poisoning'],
    })
    .addIntent({
        name: 'strokeIntent',
        samples: ['warning signs of stroke'],
    })
    .buildCoreModelForControls(new RootManager())

    .buildAndWrite('en-US-generated.json');

log.info('Wrote ./en-US-generated.json');
