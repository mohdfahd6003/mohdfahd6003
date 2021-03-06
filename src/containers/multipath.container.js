const { ContainerControl, ContainerControlState } = require('ask-sdk-controls');

const BurnControl = require('./controls/burn.control');
const ChokeControl = require('./controls/choke.control');
const BleedControl = require('./controls/cut.control');

class MultiPathContainerState extends ContainerControlState {
    constructor(props) {
        super(props.id);
        this.value = undefined;
    }
}

class MultiPathContainer extends ContainerControl {
    constructor(props) {
        super(props);
        this.state = new MultiPathContainerState({ id: 'multipathstate' });
        this.id = props.id;
        this.handleFunc = undefined;
        this.addChild(new ChokeControl({ id: 'choke' }));
        this.addChild(new BleedControl({ id: 'bleed' }));
        this.addChild(new BurnControl({ id: 'burn' }));
    }

    async canHandle(input) {
        if (await this.canHandleByChild(input)) {
            this.handleFunc = this.handleByChild;
            if (this.state.value === undefined) {
                this.state.value = 'first';
            } else if (this.state.value === 'first') {
                this.state.value = 'second';
            }
            return true;
        }
        return false;
    }

    async handle(input, resultBuilder) {
        await this.handleFunc(input, resultBuilder);
    }
}

module.exports = MultiPathContainer;
