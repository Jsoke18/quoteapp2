import { useState } from 'react';
import axios from 'axios';
import QuoteForm from './QuoteForm';

export default function Home() {
  const [quote, setQuote] = useState(null);

  const calculateQuote = async (input) => {
    const response = await axios.post('/api/calculate', input);
    setQuote(response.data);
  };

  return (
    <div>
      <QuoteForm onCalculate={calculateQuote} />
      {quote && (
        <div>
          <h2>Quote:</h2>
          <p>Rep: {quote.rep}</p>
          <p>Product: {quote.product}</p>
          <p>Weight: {quote.weight}</p>
          <p>Divider: {quote.divider}</p>
          <p>Vendor: {quote.vendor}</p>
          <p>Alloy: {quote.alloy}</p>
          <p>Cost After Tariff: {quote.cost_after_tariff}</p>
          <p>Price Per Pound After Tariff: {quote.price_per_pound_after_Tariff}</p>
          <p>Cost After Overhead: {quote.cost_after_overhead}</p>
          <p>Price Per Pound After Overhead: {quote.price_per_pound_after_overhead}</p>
          <p>Cost After Divider: {quote.cost_after_divider}</p>
          <p>Price Per Pound After Divider: {quote.price_per_pound_after_divider}</p>
        </div>
      )}
    </div>
  );
}
