const {
    ControlHandler,
    ControlManager,
    ContainerControl,
} = require('ask-sdk-controls');
//Importing controls 
const HelloControl = require('./controls/helloControl.js');
const ChokeControl = require('./controls/chokeControl.js');
const LearnCPRControl = require('./controls/learncprControl.js');
const BleedControl = require('./controls/bleedControl.js');
const HeartControl = require('./controls/heartControl.js');

class FirstContainer extends ContainerControl {
    constructor(props) {
        super(props);
        this.addChild(new HelloControl('rootControl'));
        this.addChild(new HeartControl());
        this.addChild(new LearnCPRControl());
        this.addChild(new BleedControl());
        this.addChild(new ChokeControl());
    }
}

module.exports = FirstContainer;