const {
  ControlInteractionModelGenerator,
  Logger,
} = require("ask-sdk-controls");
const { PetManager } = require("./index");

const log = new Logger("HelloWorld:InteractionModel");

new ControlInteractionModelGenerator()

  .withInvocationName("control first")
  .addIntent({ name: "AMAZON.StopIntent" })
  .addIntent({ name: "AMAZON.NavigateHomeIntent" })
  .addIntent({ name: "AMAZON.HelpIntent" })
  .addIntent({ name: "AMAZON.CancelIntent" })

  .addIntent({ name: "HelloIntent", samples: ["Say hello", "Say hi"] })
  .addIntent({
    name: "heartWarningSignsIntent",
    samples: [
      "Warning signs of a heart attack",
      "How do I know about heart attack",
    ],
  })
  .buildCoreModelForControls(new PetManager())

  .buildAndWrite("en-US-generated.json");

log.info("Wrote ./en-US-generated.json");
