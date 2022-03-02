const { ControlInteractionModelGenerator, Logger } = require('ask-sdk-controls');
const { RootManager } = require('./index');

const log = new Logger('HelloWorld:InteractionModel');

new ControlInteractionModelGenerator()

    .withInvocationName('american heart association')
    .addIntent({ name: 'AMAZON.StopIntent' })
    .addIntent({ name: 'AMAZON.NavigateHomeIntent' })
    .addIntent({ name: 'AMAZON.HelpIntent' })
    .addIntent({ name: 'AMAZON.CancelIntent' })
    .addIntent({
        name: 'heartWarningSignsIntent',
        samples: [
            'heart',
            'attack',
            'Learn about heart attack',
            'Learn about what a heart attack is',
            'Learn about how to prevent a heart attack',
            'what are the warning signs of a heart attack',
            'warning signs',
            'heart warning signs',
            'warning signs of a heart attack',
            'the warning signs of a heart attack',
            'heart attack warning signs',
            'i am having a heart attack',
            'about the warning signs of a heart attack',
            'learn about heart attacks',
            'what are the signs of a heart attack',
            'how can i tell if i\'m having a heart attack',
            'How can I tell if I am having a Heart Attack',
            'how do i know if i\'m having a heart attack',
            'the signs of a heart attack',
            'tell me about the warning signs of a heart attack',
            'chest pain',
            'I am having chest pain',
            'I am having body pains',
            'body pains',
            'shortness of breath',
            'I am having shortness of breath',
            'breathing problems',
            'I am having breathing problems',
            'I am having difficulty breathing',
            'difficulty breathing',
            'chest pressure',
            'pressure in chest',
            'pressure',
            'cardiac arrest',
            'light headed',
            'light headedness',
            'feeling faint',
            'feeling dizzy',
            'discomfort',
            'pain',
            'I think I am having a heart attack',
            'teach me about heart attacks',
            'tell me about heart attacks',
            'am i having a heart attack',
        ],
    })
    .addIntent({
        name: 'learnCPRIntent',
        samples: [
            'help me with Cardiopulmonary resuscitation',
            'perform Cardiopulmonary resuscitation',
            'how do i do Cardiopulmonary resuscitation',
            'Cardiopulmonary resuscitation',
            'what is Cardiopulmonary resuscitation',
            'c. p. r. ',
            'tell me the c. p. r.  steps',
            'the steps of c. p. r. ',
            'what the best way to do c. p. r.  is',
            'Hands Only c. p. r. ',
            'how do I do c. p. r.' ,
            'How do I do effective c. p. r.',
            'how do I do hands only c. p. r.',
            'how do I perform c. p. r.',
            'how to do c. p. r.',
            'how to perform c. p. r.',
            'I need to do c. p. r.',
            'I need to do c. p. r. how would I do it',
            'I need to know how to do c. p. r.',
            'I need to perform c. p. r.',
            'i\'d like to learn c. p. r.',
            'If I need to do CPR how would I do it',
            'learn c. p. r.',
            'Teach me c. p. r.',
            'Tell me about c. p. r.',
            'Tell me how to do c. p. r.',
            'tell me the c. p. r.   steps',
            'what are the steps of c. p. r.',
            'what the best way to do c. p. r.   is',
            'What\'s the best way to do c. p. r.',
            'What\'s the steps of c. p. r.',
            'how do i check for a pulse',
            'how do i check for breathing',
            'i\'d like to learn c. p. r.',
        ],
    })
    .addYesAndNoIntents()
    .addIntent({
        name: 'bleedIntent',
        samples: [
            'stop the bleeding',
            'im bleeding',
            'stop bleeding',
            'i have a gash',
            'i cut my foot',
            'i cut my hand',
            'help me stop bleeding',
            'how do i stop this bleeding',
            'my cut wont stop bleeding',
            'someone cut me',
            'I got a cut',
            'I have been cut',
            'i am bleeding',
            'bleeding',
            'I have a cut What do I do',
            'I cut myself What do I do',
            'What do I do when I\'m bleeding',
            'I need to stop bleeding',
            'How do I stop bleeding',
            'I\'m bleeding What do I do',
            'How do I stop a cut from bleeding',
        ],
    })
    .addIntent({
        name: 'chokeIntent',
        samples: [
            'choking',
            'I am choking',
            'Tell me what to do for choking',
            'How do I help an adult who is choking',
            'How do I help someone who is choking',
            'I need to help someone who is choking',
            'What do I do when someone is choking',
            'How do I help a choking child',
            'How do I help a choking infant',
            'How do I help a choking adult',
            'How do I do the Heimlich',
            'How do I do the Heimlich maneuver',
            'What do I do to remove something stuck in the throat',
            'My child is choking',
            'My husband is choking',
            'My wife is choking',
            'Someone is choking',
            'A child is choking',
            'Tell me what to do for a pregnant woman choking',
            'How do I help a pregnant woman who is choking',
            'How do I do the Heimlich on a pregnant woman',
            'A pregnant woman is choking',
            'Someone pregnant is choking',
            'Tell me what to do for a choking baby',
            'Tell me what to do for a choking infant',
            'How do I help a baby who is choking',
            'How do I help an infant who is choking',
            'I need to help a baby who is choking',
            'What do I do when an infant is choking',
            'How do I help a choking baby',
            'How do I do the Heimlich on a baby',
            'How do I do the Heimlich on an infant',
            'What do I do to remove something stuck in the throat of a baby',
            'My newborn is choking',
            'My infant is choking',
            'A baby is choking',
            'A newborn is choking',
            'An infant is choking',
        ],
    })
    .addIntent({
        name: 'burnIntent',
        samples: [
            'i burnt myself',
            'what do i do if i have a burn',
            'burns',
            'I have a burn',
            'Should I put ice on my burn',
            'Should I put butter on my burn',
            'How do I stop a small burn from blistering',
            'How do I help with a burn',
            'What do I do when someone gets burnt',
            'What do I do when I burn myself',
            'I need to stop a burn from hurting',
            'How do I treat a burn',
            'I burned myself',
            'What do I do for a burn',
            'Tell me what to do for a burn',
        ],
    })
    .addIntent({
        name: 'dehydrationIntent',
        samples: [
            'dehydration',
            'warning signs of dehydration',
            'what do i do about dehydration',
            'i am dehydrated',
            'How do I know if someone is dehydrated',
            'What are the signs of dehydration',
            'What are the symptoms of dehydration',
            'How do people act when they are dehydrated',
            'How do I know if my infant is dehydrated',
            'What do I do if my child is dehydrated',
            'What do I do if someone is dehydrated',
            'What is dehydration',
            'How do people get dehydrated',
            'My child is dehydrated',
            'I am dehydrated what do I do',
        ],
    })
    .addIntent({
        name: 'noseIntent',
        samples: [
            'nosebleed',
            'I have a nose bleed',
            'nose bleeds',
            'nosebleeds',
            'my nose is bleeding',
            'nose bleed',
            'How do I stop a nose bleed',
            'Someone got hit in the nose and its bleeding',
            'I got hit in the nose and its bleeding',
            'Someones nose is bleeding what do I do',
            'My childs nose is bleeding what do I do',
            'What do I do for a nose bleed',
            'How do I help someone with a nose bleed',
        ],
    })
    .addIntent({
        name: 'poisonIntent',
        samples: [
            'tell me about poisoning',
            'poison',
            'poisoning',
            'what do i do if i get something poisonous on my skin',
            'what do i do if i get something poisonous in my eye',
            'what do i do if i get something poisonous in my mouth',
            'how do i know if something is poisonous',
            'i got something with poison in my eye',
            'i got poison on my skin',
            'my child swallowed poison',
            'i have been poisoned',
            'how do i help someone who has been poisoned',
            'how do i help someone who has come in contact with something poisonous',
            'i swallowed poison',
            'Tell me what to do for poisoning',
        ],
    })
    .addIntent({
        name: 'strokeIntent',
        samples: [
            'what are the warning signs of a stroke',
            'am i having a stroke',
            'I think I am having a stroke',
            'stroke',
            'Learn about strokes',
            'Learn about a stroke',
            'the warning signs of a stroke',
            'stroke warning signs',
            'i am having a stroke',
            'about the warning signs of a stroke',
            'how do i know if i am having a stroke',
            'how can i tell if i\'m having a stroke',
            'How can I tell if I am having a Stroke',
            'what are the signs of a stroke',
            'the signs of a stroke',
            'tell me about the warning signs of a stroke',
            'what does the f. a. s. t. stroke acronym stand for',
            'what are the f. a. s. t. stroke warning signs',
            'what does the acronym f. a. s. t. mean',
            'what does fast mean',
            'what does f. a. s. t. stand for',
            'what does fast stand for',
            'what f. a. s. t. stands for',
            'what fast stands for',
            'face drooping',
            'my face is drooping',
            'I am having arm weakness',
            'arm weakness',
            'speech difficulty',
            'I am having speech difficulty',
            'difficulty talking',
            'difficulty communicating',
            'slurred speech',
            'speech problems',
            'problems talking',
            'numb face',
            'i can\'t smile',

        ],
    })
    //.loadFromFile('./skill-package/interactionModels/custom/en-US.json')
    .buildCoreModelForControls(new RootManager())
    .buildAndWrite('en-US-generated.json');
    
log.info('Wrote ./en-US-generated.json');
