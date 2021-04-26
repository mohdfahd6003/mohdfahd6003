const {
    ControlHandler,
    ControlManager,
    ContainerControl,
    ContainerControlState
} = require('ask-sdk-controls');


const StrokeControl = require('./controls/strokeControl.js');
const NoseControl = require('./controls/noseControl.js');
const PoisonControl = require('./controls/poisonControl.js');
const DehydrationControl = require('./controls/dehydrationControl.js');
const BurnControl = require('./controls/burnControl.js');
const { getSupportedInterfaces } = require('ask-sdk-core');

class SecondContainerState extends ContainerControlState {
    constructor(){
        super();
        this.value = "first";
    }
}

class SecondContainer extends ContainerControl {
    constructor(props) {
        super(props);
        this.state = new SecondContainerState();
        this.id = props.id;
        this.handleFunc = undefined;
        this.addChild(new StrokeControl('rootControl'));
        this.addChild(new NoseControl({'id':'nose'}));
        this.addChild(new PoisonControl({'id':'poison'}));
        this.addChild(new DehydrationControl({'id':'dehydration'}));
        this.addChild(new BurnControl({'id':'burn'}));
    }

    async canHandle(input){
        console.log("Inside can handle of second container. state is =", this.state.value);
        if (await this.canHandleByChild(input)){
            this.handleFunc = this.handleByChild;
            return true;
        }
    }

    async handle(input, resultBuilder) {
        await this.handleFunc(input, resultBuilder);
    }
}

module.exports = SecondContainer;