const { welcome } = require('./getWelcomeLayouts');

function welcomePageCreater() {
    let welcomeRootContainer = {};
    welcomeRootContainer = welcome.getWelcomeRoot();
    welcomeRootContainer.items = [];
    welcomeRootContainer.items.push(welcome.getWelcomeBackground());
    welcomeRootContainer.items.push(welcome.getWelcomeImageBox());
    welcomeRootContainer.items.push(welcome.getWelcomeTextBox());
    return welcomeRootContainer;
}

exports.welcomePage = {
    welcomePageCreater,
};
