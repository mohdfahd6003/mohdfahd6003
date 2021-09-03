const roundWelcomeBackground = require('../../../display/layouts/round/welcome/background.welcome.json');
const roundWelcomeText = require('../../../display/layouts/round/welcome/textBox.welcome.json');
const roundWelcomeRoot = require('../../../display/layouts/round/welcome/rootLayout.welcome.json');

function getRoundWelcomeBackground() {
    return roundWelcomeBackground;
}

function getRoundWelcomeRoot() {
    return roundWelcomeRoot;
}

function getRoundWelcomeText() {
    return roundWelcomeText;
}

exports.welcomeRound = {
    getRoundWelcomeBackground,
    getRoundWelcomeRoot,
    getRoundWelcomeText,
};
