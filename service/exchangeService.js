const axios = require("axios");
const redis = require("redis");
require("dotenv").config();

class ExchangeService {}

//Gets the exchange rate for two currencies from Abstract API (https://www.abstractapi.com/exchange-rate-api)
exports.getExchangeRateAsync = async (baseCurrency, targetCurrency) => {
  //Use Redis to cache exchange rates for quicker response and less calls to the Abstract api
  const redisClient = redis.createClient({ url: process.env.REDIS_URL });
  await redisClient.connect();
  const cacheKey = `ex_rate_${baseCurrency}${targetCurrency}`;
  let exchangeRate = await redisClient.get(cacheKey);
  //If the exchange rate is cached return it
  if (exchangeRate) {
    redisClient.quit();
    return exchangeRate;
  } else {
    //Get the exchange rate from the Abstract api
    var abstractApiExchangeRateUrl = `https://exchange-rates.abstractapi.com/v1/live/?api_key=${process.env.ABSTRACT_API_KEY}&base=${baseCurrency}&target=${targetCurrency}`;
    const response = await axios.get(abstractApiExchangeRateUrl);
    exchangeRate = Object.values(response.data.exchange_rates);
    //Cached the exchange rate for an configured time
    await redisClient.set(cacheKey, exchangeRate);
    await redisClient.expire(cacheKey, process.env.REDIS_KEY_EXPIRE_SECONDS);
    redisClient.quit();
    return exchangeRate;
  }
};

//Get a collection of supported currency types
exports.GetSupportedTypes = () => {
  return {
    currencies: [
      {
        code: "ARS",
        name: "Argentine Peso",
      },
      {
        code: "AUD",
        name: "Australian Dollar",
      },
      {
        code: "BCH",
        name: "Bitcoin Cash",
      },
      {
        code: "BGN",
        name: "Bulgarian Lev",
      },
      {
        code: "BNB",
        name: "Binance Coin",
      },
      {
        code: "BRL",
        name: "Brazilian Real",
      },
      {
        code: "BTC",
        name: "Bitcoin",
      },
      {
        code: "CAD",
        name: "Canadian Dollar",
      },
      {
        code: "CHF",
        name: "Swiss Franc",
      },
      {
        code: "CNY",
        name: "Chinese Yuan",
      },
      {
        code: "CZK",
        name: "Czech Republic Koruna",
      },
      {
        code: "DKK",
        name: "Danish Krone",
      },
      {
        code: "DOGE",
        name: "Dogecoin",
      },
      {
        code: "DZD",
        name: "Algerian Dinar",
      },
      {
        code: "ETH",
        name: "Ethereum",
      },
      {
        code: "EUR",
        name: "Euro",
      },
      {
        code: "GBP",
        name: "British Pound Sterling",
      },
      {
        code: "HKD",
        name: "Hong Kong Dollar",
      },
      {
        code: "HRK",
        name: "Croatian Kuna",
      },
      {
        code: "HUF",
        name: "Hungarian Forint",
      },
      {
        code: "IDR",
        name: "Indonesian Rupiah",
      },
      {
        code: "ILS",
        name: "Israeli New Sheqel",
      },
      {
        code: "INR",
        name: "Indian Rupee",
      },
      {
        code: "ISK",
        name: "Icelandic Króna",
      },
      {
        code: "JPY",
        name: "Japanese Yen",
      },
      {
        code: "KRW",
        name: "South Korean Won",
      },
      {
        code: "LTC",
        name: "Litecoin",
      },
      {
        code: "MAD",
        name: "Moroccan Dirham",
      },
      {
        code: "MXN",
        name: "Mexican Peso",
      },
      {
        code: "MYR",
        name: "Malaysian Ringgit",
      },
      {
        code: "NOK",
        name: "Norwegian Krone",
      },
      {
        code: "NZD",
        name: "New Zealand Dollar",
      },
      {
        code: "PHP",
        name: "Philippine Peso",
      },
      {
        code: "PLN",
        name: "Polish Zloty",
      },
      {
        code: "RON",
        name: "Romanian Leu",
      },
      {
        code: "RUB",
        name: "Russian Ruble",
      },
      {
        code: "SEK",
        name: "Swedish Krona",
      },
      {
        code: "SGD",
        name: "Singapore Dollar",
      },
      {
        code: "THB",
        name: "Thai Baht",
      },
      {
        code: "TRY",
        name: "Turkish Lira",
      },
      {
        code: "TWD",
        name: "New Taiwan Dollar",
      },
      {
        code: "USD",
        name: "US Dollar",
      },
      {
        code: "XRP",
        name: "Ripple",
      },
      {
        code: "ZAR",
        name: "South African Rand",
      },
    ],
  };
};

module.export = ExchangeService;
