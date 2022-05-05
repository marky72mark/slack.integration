//app.js listing for Slack events and sends requests to a Bull queue.
const { App, AwsLambdaReceiver } = require("@slack/bolt");
require("dotenv").config();

const exchangeRateAppService = require("./service/exchangeRateAppService");
const modalViews = require("./view/modalViews");

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
});

// Listen for a slash command invocation
app.command("/exchange", async ({ ack, body, client, logger, respond }) => {
  // Acknowledge the command request
  await ack();

  try {
    //Check slash command for help option.
    if (body.text.trim().toLowerCase() === "help") {
      respond(exchangeRateAppService.getHelpText());
    } else {
      //Parse and check for optional parameters
      const inputParms = exchangeRateAppService.validateParameters(body.text);
      if (inputParms.isValid) {
        //Handle request immediately
        await exchangeRateAppService.handleRateRequestAsync(
          body.channel_id,
          inputParms.amount,
          inputParms.baseCur,
          inputParms.targetCur,
          client
        );
      } else {
        //Show the modal if no parameters, or incorrect parameters where passed
        //Get view payload and parse into an object
        const exchangeView = modalViews.GetExchangeRateCalcView();
        // Call views.open with the built-in client
        const result = await client.views.open({
          // Pass a valid trigger_id within 3 seconds of receiving it
          trigger_id: body.trigger_id,
          // View payload
          view: exchangeView,
        });
        logger.info(result);
      }
    }
  } catch (error) {
    logger.error(error);
    respond(
      "Unable to get the exchange rate at this time, please try again soon."
    );
  }
});

// Handle a view_submission request
app.view("vwExchangeRateCalc", async ({ ack, body, view, client, logger }) => {
  //Get values from the view's state
  try {
    const amount =
      view["state"]["values"]["amount"]["amount_input_action"]["value"];

    if (isNaN(amount)) {
      // Acknowledge the view_submission request
      await ack({
        response_action: "errors",
        errors: {
          amount: "You must enter a valid number",
        },
      });
    } else {
      // Acknowledge the view_submission request
      await ack();

      //Get additional values from the view's state
      const baseCur =
        view["state"]["values"]["baseCur"]["static_select-action"][
          "selected_option"
        ]["value"];
      const targetCur =
        view["state"]["values"]["targetCur"]["static_select-action"][
          "selected_option"
        ]["value"];
      const responseChannel = body.response_urls[0].channel_id;

      //Handle request immediately
      await exchangeRateAppService.handleRateRequestAsync(
        responseChannel,
        amount,
        baseCur,
        targetCur,
        client
      );

      logger.info("vwExchangeRateCalc submission success");
    }
  } catch (error) {
    logger.error(error);
    await ack();
  }
});

app.shortcut("sc_exchange_rate", async ({ shortcut, ack, client, logger }) => {
  try {
    // Acknowledge shortcut request
    await ack();
    //Show the modal if no parameters, or incorrect parameters where passed
    //Get view payload and parse into an object
    const exchangeView = modalViews.GetExchangeRateCalcView();
    // Call views.open with the built-in client
    const result = await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: shortcut.trigger_id,
      // View payload
      view: exchangeView,
    });
    logger.info(result);
  } catch (error) {
    logger.error(error);
  }
});

// Handle the Lambda function event
module.exports.handler = async (event, context, callback) => {
  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
};

//Start local
//serverless offline --noPrependStageInUrl
