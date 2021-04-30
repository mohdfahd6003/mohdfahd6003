const { ContainerControl, ContainerControlState, InputUtil } = require('ask-sdk-controls');

const HelloControl = require('./controls/hello.control.js');
const LearnCPRControl = require('./controls/learncpr.control.js');
const HeartControl = require('./controls/heart.control.js');
const NoseBleedingControl = require('./controls/nosebleeding.control');
const PoisonControl = require('./controls/poison.control');
const DehydrationControl = require('./controls/dehydration.control');

class SinglePathContainerState extends ContainerControlState {
    constructor(props) {
        super(props.id);
    }
}

class SinglePathContainer extends ContainerControl {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.handleFunc = undefined;
        this.state = new SinglePathContainerState({ id: 'singlepathstate' });

        this.HelloControl = new HelloControl({ id: 'hello' });
        this.LearnCPRControl = new LearnCPRControl({ id: 'cpr' });
        this.HeartControl = new HeartControl({ id: 'heart' });
        this.NoseBleedingControl = new NoseBleedingControl({ id: 'nosebleeding' });
        this.PoisonControl = new PoisonControl({ id: 'poison' });
        this.DehydrationControl = new DehydrationControl({ id: 'dehydration' });

        this.addChild(this.HelloControl);
        this.addChild(this.HeartControl);
        this.addChild(this.LearnCPRControl);
        this.addChild(this.NoseBleedingControl);
        this.addChild(this.PoisonControl);
        this.addChild(this.DehydrationControl);
    }

    async canHandle(input) {
        if (await this.canHandleByChild(input)) {
            this.handleFunc = this.handleByChild;
            return true;
        }
        return false;
    }

    async handle(input, resultBuilder) {
        await this.handleFunc(input, resultBuilder);
    }

    async decideHandlingChild(candidates, input) {
        for (const candidate of candidates) {
            if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
                if (candidate.id === 'bleed' && candidate.status.value === 'first') {
                    return candidate;
                } else if (candidate.id === 'choke') {
                    return candidate;
                }
            }
        }
        return candidates[0];
    }
}

module.exports = SinglePathContainer;
