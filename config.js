// Config values for the get request
const config = {
  BASE_URL:
    "https://markets-data-api-proxy.ft.com/research/webservices/securities/v1/quotes",
  params: ["FTSE:FSI", "INX:IOM", "EURUSD", "GBPUSD", "IB.1:IEU"],
  headers: {
    headers: {
      Accept: "text/html",
    },
  },
};

module.exports = config;
