// pages/api/calculate.js

// Pricing information
const vendorPrices = {
  "Wuxi Full": { "HU": 8.99, "HT": 0.00, "HTCB": 9.03, "S22H": 14.07, "HK": 5.83 },
  "Hongxin": { "HU": 8.89, "HT": 8.58, "HTCB": 8.96, "22H": 12.44, "S22H": 13.43, "HK": 5.80 },
  "Lxhan": { "HU": 8.47, "HT": 7.86, "HTCB": 8.41, "HX": 12.45, "HK": 5.39, "HH": 4.26, "S22H": 12.45, "22H": 11.65 }
};

let quotes = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const input = req.body;
    const quote = calculateQuote(input, vendorPrices);
    quotes.push(quote);

    res.status(200).json(quote);
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

const calculateQuote = (input, vendorPrices) => {
  const tariff = 1.25;
  const overhead = 1.43;
  const { rep, vendor, alloy, weight, divider } = input;

  const pricePerLb = vendorPrices[vendor][alloy];

  const costAfterTariff = pricePerLb * weight * tariff;
  const pricePerPoundAfterTariff = costAfterTariff / weight;
  const costAfterOverhead = costAfterTariff * overhead;
  const pricePerPoundAfterOverhead = costAfterOverhead / weight;
  const costAfterDivider = costAfterOverhead / divider;
  const pricePerPoundAfterDivider = pricePerPoundAfterOverhead / divider;

  return {
    rep,
    product: `${alloy} ${weight}`,
    weight,
    divider,
    vendor,
    alloy,
    cost_after_tariff: costAfterTariff,
    price_per_pound_after_Tariff: pricePerPoundAfterTariff,
    cost_after_overhead: costAfterOverhead,
    price_per_pound_after_overhead: pricePerPoundAfterOverhead,
    cost_after_divider: costAfterDivider,
    price_per_pound_after_divider: pricePerPoundAfterDivider
  };
};
