const { ContainerControl, ContainerControlState } = require('ask-sdk-controls');

const BurnControl = require('./controls/burn.control');
const ChokeControl = require('./controls/choke.control');
const BleedControl = require('./controls/cut.control');

class MultiPathContainerState extends ContainerControlState {
    constructor() {
        super();
        this.value = undefined;
    }
}

class MultiPathContainer extends ContainerControl {
    constructor(props) {
        super(props);
        this.state = new MultiPathContainerState();
        this.id = props.id;
        this.handleFunc = undefined;
        this.addChild(new ChokeControl({ id: 'choke' }));
        this.addChild(new BleedControl({ id: 'bleed' }));
        this.addChild(new BurnControl({ id: 'burn' }));
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
            if (candidate.state.value !== undefined) {
                return candidate;
            }
        }
        return candidates[0];
    }
}

module.exports = MultiPathContainer;
