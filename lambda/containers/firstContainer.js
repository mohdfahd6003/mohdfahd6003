const {
    ControlHandler,
    ControlManager,
    ContainerControl,
    ContainerControlState
} = require('ask-sdk-controls');


const HelloControl = require('./controls/helloControl.js');
const ChokeControl = require('./controls/chokeControl.js');
const LearnCPRControl = require('./controls/learncprControl.js');
const BleedControl = require('./controls/bleedControl.js');
const HeartControl = require('./controls/heartControl.js');

class FirstContainerState extends ContainerControlState {
    constructor(){
        super();
        this.value = "first";
    }
}
class FirstContainer extends ContainerControl {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.handleFunc = undefined;
        this.state = new FirstContainerState;
        this.HelloControl = new HelloControl({'id':'hello'});
        this.HeartControl = new HeartControl({'id':'heart'});
        this.LearnCPRControl = new LearnCPRControl({'id':'cpr'});
        this.BleedControl = new BleedControl({'id':'bleed'});
        this.ChokeControl = new ChokeControl({'id':'choke'})
        this.addChild(this.HelloControl);
        this.addChild(this.HeartControl);
        this.addChild(this.LearnCPRControl);
        this.addChild(this.BleedControl);
        this.addChild(this.ChokeControl);
    }

    async canHandle(input){
        console.log("Inside can handle of first container. state is =", this.state.value);
        if (await this.canHandleByChild(input)){
            this.handleFunc = this.handleByChild;
            return true;
        }
    }

    async handle(input, resultBuilder) {
        await this.handleFunc(input, resultBuilder);
    }
}

module.exports = FirstContainer;