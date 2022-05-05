class ModalViews {}

const currencyOptions = [
  {
    text: {
      type: "plain_text",
      text: "ARS - Argentine Peso",
    },
    value: "ARS",
  },
  {
    text: {
      type: "plain_text",
      text: "AUD - Australian Dollar",
    },
    value: "AUD",
  },
  {
    text: {
      type: "plain_text",
      text: "BCH - Bitcoin Cash",
    },
    value: "BCH",
  },
  {
    text: {
      type: "plain_text",
      text: "BGN - Bulgarian Lev",
    },
    value: "BGN",
  },
  {
    text: {
      type: "plain_text",
      text: "BNB - Binance Coin",
    },
    value: "BNB",
  },
  {
    text: {
      type: "plain_text",
      text: "BRL - Brazilian Real",
    },
    value: "BRL",
  },
  {
    text: {
      type: "plain_text",
      text: "BTC - Bitcoin",
    },
    value: "BTC",
  },
  {
    text: {
      type: "plain_text",
      text: "CAD - Canadian Dollar",
    },
    value: "CAD",
  },
  {
    text: {
      type: "plain_text",
      text: "CHF - Swiss Franc",
    },
    value: "CHF",
  },
  {
    text: {
      type: "plain_text",
      text: "CNY - Chinese Yuan",
    },
    value: "CNY",
  },
  {
    text: {
      type: "plain_text",
      text: "CZK - Czech Republic Koruna",
    },
    value: "CZK",
  },
  {
    text: {
      type: "plain_text",
      text: "DKK - Danish Krone",
    },
    value: "DKK",
  },
  {
    text: {
      type: "plain_text",
      text: "DOGE - Dogecoin",
    },
    value: "DOGE",
  },
  {
    text: {
      type: "plain_text",
      text: "DZD - Algerian Dinar",
    },
    value: "DZD",
  },
  {
    text: {
      type: "plain_text",
      text: "ETH - Ethereum",
    },
    value: "ETH",
  },
  {
    text: {
      type: "plain_text",
      text: "EUR - Euro",
    },
    value: "EUR",
  },
  {
    text: {
      type: "plain_text",
      text: "GBP - British Pound Sterling",
    },
    value: "GBP",
  },
  {
    text: {
      type: "plain_text",
      text: "HKD - Hong Kong Dollar",
    },
    value: "HKD",
  },
  {
    text: {
      type: "plain_text",
      text: "HRK - Croatian Kuna",
    },
    value: "HRK",
  },
  {
    text: {
      type: "plain_text",
      text: "HUF - Hungarian Forint",
    },
    value: "HUF",
  },
  {
    text: {
      type: "plain_text",
      text: "IDR - Indonesian Rupiah",
    },
    value: "IDR",
  },
  {
    text: {
      type: "plain_text",
      text: "ILS - Israeli New Sheqel",
    },
    value: "ILS",
  },
  {
    text: {
      type: "plain_text",
      text: "INR - Indian Rupee",
    },
    value: "INR",
  },
  {
    text: {
      type: "plain_text",
      text: "ISK - Icelandic Króna",
    },
    value: "ISK",
  },
  {
    text: {
      type: "plain_text",
      text: "JPY - Japanese Yen",
    },
    value: "JPY",
  },
  {
    text: {
      type: "plain_text",
      text: "KRW - South Korean Won",
    },
    value: "KRW",
  },
  {
    text: {
      type: "plain_text",
      text: "LTC - Litecoin",
    },
    value: "LTC",
  },
  {
    text: {
      type: "plain_text",
      text: "MAD - Moroccan Dirham",
    },
    value: "MAD",
  },
  {
    text: {
      type: "plain_text",
      text: "MXN - Mexican Peso",
    },
    value: "MXN",
  },
  {
    text: {
      type: "plain_text",
      text: "MYR - Malaysian Ringgit",
    },
    value: "MYR",
  },
  {
    text: {
      type: "plain_text",
      text: "NOK - Norwegian Krone",
    },
    value: "NOK",
  },
  {
    text: {
      type: "plain_text",
      text: "NZD - New Zealand Dollar",
    },
    value: "NZD",
  },
  {
    text: {
      type: "plain_text",
      text: "PHP - Philippine Peso",
    },
    value: "PHP",
  },
  {
    text: {
      type: "plain_text",
      text: "PLN - Polish Zloty",
    },
    value: "PLN",
  },
  {
    text: {
      type: "plain_text",
      text: "RON - Romanian Leu",
    },
    value: "RON",
  },
  {
    text: {
      type: "plain_text",
      text: "RUB - Russian Ruble",
    },
    value: "RUB",
  },
  {
    text: {
      type: "plain_text",
      text: "SEK - Swedish Krona",
    },
    value: "SEK",
  },
  {
    text: {
      type: "plain_text",
      text: "SGD - Singapore Dollar",
    },
    value: "SGD",
  },
  {
    text: {
      type: "plain_text",
      text: "THB - Thai Baht",
    },
    value: "THB",
  },
  {
    text: {
      type: "plain_text",
      text: "TRY - Turkish Lira",
    },
    value: "TRY",
  },
  {
    text: {
      type: "plain_text",
      text: "TWD - New Taiwan Dollar",
    },
    value: "TWD",
  },
  {
    text: {
      type: "plain_text",
      text: "USD - US Dollar",
    },
    value: "USD",
  },
  {
    text: {
      type: "plain_text",
      text: "XRP - Ripple",
    },
    value: "XRP",
  },
  {
    text: {
      type: "plain_text",
      text: "ZAR - South African Rand",
    },
    value: "ZAR",
  },
];

exports.GetExchangeRateCalcView = () => {
  const view = {
    type: "modal",
    callback_id: "vwExchangeRateCalc",
    title: {
      type: "plain_text",
      text: "Exchange Rate Calculator",
    },
    submit: {
      type: "plain_text",
      text: "Submit",
    },
    close: {
      type: "plain_text",
      text: "Cancel",
    },
    blocks: [
      {
        block_id: "selectChannel",
        type: "input",
        label: {
          type: "plain_text",
          text: "Where should the results be sent?",
        },
        element: {
          action_id: "selectedChannel",
          type: "conversations_select",
          response_url_enabled: true,
        },
      },
      {
        type: "input",
        block_id: "amount",
        element: {
          type: "plain_text_input",
          action_id: "amount_input_action",
          initial_value: "1",
        },
        label: {
          type: "plain_text",
          text: "Amount to Convert",
          emoji: true,
        },
      },
      {
        type: "input",
        block_id: "baseCur",
        element: {
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "Select an item",
          },
          options: currencyOptions,
          action_id: "static_select-action",
        },
        label: {
          type: "plain_text",
          text: "Base Currency",
        },
      },
      {
        type: "input",
        block_id: "targetCur",
        element: {
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "Select an item",
          },
          options: currencyOptions,
          action_id: "static_select-action",
        },
        label: {
          type: "plain_text",
          text: "Target Currency",
        },
      },
    ],
  };

  return view;
};

module.export = ModalViews;
