const exchangeService = require("./exchangeService");

class ExchangeRateAppService {}

exports.queueRateRequest = (
  amount,
  baseCur,
  targetCur,
  channelId,
  exchangeRateQueue
) => {
  //Create a queue request and queue
  const exchangeRequest = {
    baseAmount: amount,
    baseCurrency: baseCur,
    targetCurrency: targetCur,
    responseChannel: channelId,
  };
  exchangeRateQueue.add(exchangeRequest);
};

exports.getHelpText = () => {
  //This could be improved by locallizing the text to the user's language from a repository.
  return `
  Hello!

  This app will give you the exhange rate between two currencies.

  Use the /exchange command to open a dialog to help you determine exchange rates.
  Optionaly you can provide an amount and two currencies to get the exchange rate without the dialog.

  Example: /exchange 100 USD EUR`;
};

exports.validateParameters = (inputText) => {
  let inputParms = new Object();
  inputParms.isValid = false;
  const parms = inputText.split(" ");
  if (parms.length === 3) {
    inputParms.amount = parms[0];
    inputParms.baseCur = parms[1].substring(0, 3).toUpperCase();
    inputParms.targetCur = parms[2].substring(0, 3).toUpperCase();
    const supportedTypes = exchangeService.GetSupportedTypes();
    if (
      !isNaN(inputParms.amount) ||
      supportedTypes.currencies.some((c) => c.code == inputParms.baseCur) ||
      supportedTypes.currencies.some((c) => c.code == inputParms.targetCur)
    ) {
      inputParms.isValid = true;
    }
  }

  return inputParms;
};

exports.handleRateRequestAsync = async (
  responseChannel,
  baseAmount,
  baseCur,
  targetCur,
  client
) => {
  try {
    //Call service to get the exchange rate
    const exchangeRate = await exchangeService.getExchangeRateAsync(
      baseCur,
      targetCur
    );

    //Get currency descriptions
    const supportedTypes = exchangeService.GetSupportedTypes();
    var baseCurDesc = supportedTypes.currencies.find((c) => c.code === baseCur);
    var targetCurDesc = supportedTypes.currencies.find(
      (c) => c.code === targetCur
    );

    //Post a message to the selected channel to display the exchange rate
    await client.chat.postMessage({
      channel: responseChannel,
      text: `${baseAmount} ${baseCur} - ${baseCurDesc.name} = ${(
        baseAmount * exchangeRate
      ).toFixed(2)} ${targetCur} - ${
        targetCurDesc.name
      } \n_(Exhange rate ${exchangeRate})_`,
    });
  } catch (error) {
    //Post a message to the user about the error
    await client.chat.postMessage({
      channel: responseChannel,
      text: "Error making your request, please try again after a few moments",
    });
    console.log(error);
  }
};

module.export = ExchangeRateAppService;
