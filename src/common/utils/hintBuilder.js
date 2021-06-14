const randData = require('../content/hint.content.json');

const { randomHint } = randData;

function getRandomInt() {
    return Math.floor(Math.random() * randomHint.length);
}

function getRandomHint() {
    return randomHint[getRandomInt()];
}
