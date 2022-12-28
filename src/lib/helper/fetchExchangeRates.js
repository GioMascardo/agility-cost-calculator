const fetchExchangeRates = async () => {
  let apiResponse = await fetch(
    `https://api.freecurrencyapi.com/v1/latest?apikey=${
      import.meta.env.VITE_CURRENCY_API_KEY
    }&currencies=CAD%2CAUD%2CGBP%2CSGD%2CNZD`
  );
  let { data } = await apiResponse.json();
  let CADconversionRate = data.CAD;
  let AUDconversionRate = data.AUD;
  let GBPconversionRate = data.GBP;
  let SGDconversionRate = data.SGD;
  let NZDconversionRate = data.NZD;

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
