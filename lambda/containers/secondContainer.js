const {
    ControlHandler,
    ControlManager,
    ContainerControl,
} = require('ask-sdk-controls');

//Importing control
const StrokeControl = require('./controls/strokeControl.js');
const NoseControl = require('./controls/noseControl.js');
const PoisonControl = require('./controls/poisonControl.js');
const DehydrationControl = require('./controls/dehydrationControl.js');
const BurnControl = require('./controls/burnControl.js');

class SecondContainer extends ContainerControl {
    constructor(props) {
        super(props);
        this.addChild(new StrokeControl('rootControl'));
        this.addChild(new NoseControl());
        this.addChild(new PoisonControl());
        this.addChild(new DehydrationControl());
        this.addChild(new BurnControl());
    }
}

module.exports = SecondContainer;