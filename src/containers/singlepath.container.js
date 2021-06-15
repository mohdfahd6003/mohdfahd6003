const { ContainerControl, ContainerControlState } = require('ask-sdk-controls');

const HelloControl = require('./controls/launch.control.js');
const LearnCPRControl = require('./controls/learncpr.control.js');
const HeartControl = require('./controls/heart.control.js');
const NoseBleedingControl = require('./controls/nosebleeding.control');
const PoisonControl = require('./controls/poison.control');
const DehydrationControl = require('./controls/dehydration.control');
const StrokeControl = require('./controls/stroke.control');

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

        this.HelloControl = new HelloControl({ id: 'launch' });
        this.LearnCPRControl = new LearnCPRControl({ id: 'cpr' });
        this.HeartControl = new HeartControl({ id: 'heart' });
        this.NoseBleedingControl = new NoseBleedingControl({ id: 'nosebleeding' });
        this.PoisonControl = new PoisonControl({ id: 'poison' });
        this.DehydrationControl = new DehydrationControl({ id: 'dehydration' });
        this.StrokeControl = new StrokeControl({ id: 'stroke' });
        this.addChild(this.HelloControl);
        this.addChild(this.HeartControl);
        this.addChild(this.LearnCPRControl);
        this.addChild(this.NoseBleedingControl);
        this.addChild(this.PoisonControl);
        this.addChild(this.DehydrationControl);
        this.addChild(this.StrokeControl);
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
}

module.exports = SinglePathContainer;
