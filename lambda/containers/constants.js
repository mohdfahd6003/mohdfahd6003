const introText = `The American Heart Association has been working to reduce disability and deaths
                    caused by heart disease since 1924.
                    Heart disease is the leading cause of death globally,
                    and can cause numerous problems including heart attack or stroke.
                    Would you like to learn  about heart attacks, learn about strokes, or learn CPR?`;
const repeatText = `What else can I help you with?`;
const heartAttackText = `Some heart attacks are sudden and intense, but most start slowly, with mild pain or discomfort.
                call your local emergency number right away if you have any of these heart attack warning signs.
                Chest discomfort: Most heart attacks involve discomfort in the center of the chest that lasts more than a few minutes, or
                that goes away and comes back. It can feel like uncomfortable pressure, squeezing, fullness or pain.
                Discomfort in other areas of the upper body. Symptoms can include pain or discomfort in one or both arms, 
                the back, neck, jaw or stomach. Shortness of breath with or without chest discomfort.
                Other signs may include breaking out in a cold sweat, nausea or lightheadedness.
                Women also may experience other common symptoms, particularly shortness of breath, nausea, vomiting, and back or jaw pain.
                You can learn more at www.heart.org/warningsigns.
                This information is not a substitute for medical advice or treatment, and the A.H.A recommends
                consultation with your doctor or healthcare professional. Feel free to ask about Warning Signs of a Stroke, How to Do CPR, or poisoning. Now what else can I help you with?`;
const learnCPRText = `According to the American Heart Association, you should first call your local emergency number if you see a teen or adult suddenly collapse 
                and is not responsive and not breathing normally.
                Then, push hard and fast in the center of the chest at the rate of 100 to 120 beats per minute, 
                such as the beat of the classic disco song Stayin Alive... 
                Here is how fast you should push on the chest. 
                <audio src='https://s3.amazonaws.com/ahaalexa/110-BPM-Metronome-short.mp3'/>.  What else can I help you with?`;
const noseText = `Ouch! Nose bleeds are no fun. Let's get this taken care of. 
                First, make sure the scene is safe. Wear personal protective equipment, if available.
                Have the person sit and lean forward. Pinch the soft part of the nose on both sides with 
                a clean dressing, clean cloth or a tissue. Place constant pressure on the nostrils for a few 
                minutes until the bleeding stops. If bleeding continues, press harder. <break time='1s'/>
                You're doing great! But, if you can't stop the bleeding in about 15 minutes,
                call your local emergency number. You should also call your local emergency number if the bleeding is heavy, such as gushing blood, 
                or if the injured person has trouble breathing. Feel free to ask me about Burns, Dehydration or Choking. What else can I help you with?`;
const bleedText = `First, does it look like this is a minor cut? `;
const bleedYesText = `Wash the area with soap and water. Then, apply a dressing or a Band-Aid to the wound. You can get more information at heart.org/firstaid. What else is on your mind today?`;
const bleedNoText = `OK, now make sure the scene is safe. Send someone to get the first aid kit. If possible, have the person who is bleeding apply direct pressure to the wound while you put on your protective equipment. Apply dressings, such as a gauze pad. Use the flat part of your fingers or the palm of your hand to apply direct pressure on the dressings over the bleeding area. Did the bleeding stop?`;
const bleedYesSecondText = `I'm so relieved to hear that! Now that the bleeding has stopped, wrap a bandage firmly over the dressings to hold them in place. There are other things I can help with. For example, I can tell you how to remove bloodstains from your clothes or the floor if that is a problem. And, because you did so well today in this emergency, you may also want to think about taking an American Heart Association first aid course in case this happens again. You can get more information at heart.org/firstaid.  What else can i help you with? `;
const bleedNoSecondText = `OK, you'll need to add a second dressing and press harder. Do not remove a dressing once it's in place because this could cause the wound to bleed more. Keep pressure on the wound until it stops bleeding. Once the bleeding has stopped or if you can't keep pressure on the wound, wrap a bandage firmly over the dressings to hold them in place. If the bleeding cannot be controlled and doesn't stop, call your local emergency number. I hope that the bleeding is coming under control. What else can i help you with? `;
const chokeMainText = 'OK, two questions to help me give you the right first aid steps. Is the person pregnant?';
const strokeText = `If you think you are having a stroke, call your local emergency number immediately. You can easily spot the signs of 
                    a stroke if you remember the acronym <say-as interpret-as='spell-out'>FAST</say-as> The F means face drooping. The A stands for arm weakness.
                    The S stands for speech difficulty. The T stands for Time to call your local emergency number if you see the above warning signs.
                    You can learn more at www.heart.org/warningsigns. This information is not a substitute for medical advice or treatment, 
                    and the <say-as interpret-as='spell-out'>AHA</say-as> recommends consultation with your doctor or healthcare professional. What else can I help you with?`;
const poisonText = `Oh dear! Here are some things to do right away for poisoning: 
                    First, make sure the scene is safe for you and the injured person before you approach.
                    Look for signs that warn you that poisons are nearby. 
                    Look for spilled or leaking containers. If the scene seems unsafe, do not approach. Tell everyone to move away. 
                    If the scene is safe, get the first aid kit and AED. Then call your local emergency number. 
                    Tell the dispatcher the name of the poison if you know it. 
                    Follow the dispatcher's instructions and ask to be connected to the Poison Control Center for more information.
                    Remain with the person until advanced help arrives. What else can I help you with?`;
const dehydrationText = `Oh no! Dehydration can happen so fast. These are signs that 
                        someone might be dehydrated:  Weakness, thirst or dry mouth, dizziness, confusion, and/or less urination than usual.
                        If you suspect that a person is dehydrated, contact a 
                        healthcare provider, such as a doctor, right away. 
                        Then, offer the person fluids, such as water or a drink with electrolytes. 
                        I'm told that the best first aid for dehydration is prevention: make sure a person drinks and 
                        eats enough to stay hydrated. What else can I help you with? `;
const burnText = `Oh no! Burns aren't any fun. Follow these steps to help someone who has a small burn. Is the scene safe?`;
const burnYesText = `Get the first aid kit. If you don't have a first aid kit, get a dry, non-stick sterile or clean dressing. Wear protective gloves if you have them. Cool the burn area immediately with cold, but not ice-cold, water for at least 10 minutes. If you do not have cold water, use a cool or cold, but not freezing, clean compress. Run cold water on the burn until it doesn't hurt. You may then cover the burn with a dry, nonstick sterile or clean dressing. The only things you should put on a burn are cold water and clean dressings. If the pain persists, see a healthcare provider as soon as possible. I hope your patient feels a little better. What else can I help you with?`;
const burnNoText = `call your local emergency number and wait for a professional responder to arrive. What else can I help you with?`;
module.exports = { introText, repeatText, heartAttackText, learnCPRText, noseText, bleedText, bleedYesText, bleedNoText, bleedYesSecondText, bleedNoSecondText, chokeMainText, strokeText, poisonText, dehydrationText, burnText, burnYesText, burnNoText };