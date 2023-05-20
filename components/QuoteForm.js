import { useState } from 'react';

function QuoteForm({ onCalculate }) {
  const [input, setInput] = useState({
    rep: '',
    weight: '',
    vendor: '',
    alloy: '',
    divider: '',
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onCalculate(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rep:
        <input type="text" id="rep" value={input.rep} onChange={handleChange} required />
      </label>
      <label>
        Vendor:
        <input type="text" id="vendor" value={input.vendor} onChange={handleChange} required />
      </label>
      <label>
        Alloy:
        <input type="text" id="alloy" value={input.alloy} onChange={handleChange} required />
      </label>
      <label>
        Weight:
        <input type="number" id="weight" value={input.weight} onChange={handleChange} required />
      </label>
      <label>
        Divider:
        <input type="number" id="divider" value={input.divider} onChange={handleChange} required />
      </label>
      <button type="submit">Calculate Quote</button>
    </form>
  );
}

export default QuoteForm;
