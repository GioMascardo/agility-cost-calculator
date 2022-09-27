const fetchExchangeRates = async () => {
  let apiResponse = await fetch(
    "https://api.exchangerate.host/latest?base=USD"
  );
  let data = await apiResponse.json();
  let CADconversionRate = data.rates.CAD;
  let AUDconversionRate = data.rates.AUD;
  let GBPconversionRate = data.rates.GBP;
  let SGDconversionRate = data.rates.SGD;
  let NZDconversionRate = data.rates.NZD;

  return {
    usd: 1,
    cad: CADconversionRate,
    aud: AUDconversionRate,
    gbp: GBPconversionRate,
    sgd: SGDconversionRate,
    nzd: NZDconversionRate,
  };
};

let exchangeRates = await fetchExchangeRates();

export default exchangeRates;
