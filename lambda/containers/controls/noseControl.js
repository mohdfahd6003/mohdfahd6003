const Alexa = require('ask-sdk-core');

const {
  InputUtil,
  Control,
  RequestValueAct
} = require('ask-sdk-controls');

const {
  repeatText,
  noseText
} = require('../constants.js');

let dummyData = require('../data.json');
const displayTemplate = require('../commonAPL.json');


class NoseControl extends Control {

  canHandle(input) {
    return InputUtil.isIntent(input, 'noseIntent');

  }
  handle(input, resultBuilder) {
    resultBuilder.addAct(

      new RequestValueAct(this, {

      })
    );

  }
  canTakeInitiative() {
    return false;
  }
  renderAct(act, input, responseBuilder) {
    if (act instanceof RequestValueAct) {
      responseBuilder.addPromptFragment(noseText);
      responseBuilder.addRepromptFragment(repeatText);
      dummyData.content.primaryText = 'nose bleeds';
      dummyData.content.bodyText = noseText;
      dummyData.content.mainImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/Nose_w_type.jpg';
      responseBuilder.addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        document: displayTemplate,
        datasources: dummyData

      });

    }
  }
}
module.exports = NoseControl;