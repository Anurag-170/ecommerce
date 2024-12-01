import React, { useState } from 'react';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (!cardNumber || !expiryDate || !cvv || !amount) {
      setError('Please fill in all fields');
      return;
    }

    // Further validation logic (e.g., card number format, expiry date format, etc.) can be added here

    // If all validation passes, you can proceed with payment processing
    console.log('Processing payment...');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card Number:
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
        />
      </label>
      <label>
        Expiry Date:
        <input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="MM/YY"
        />
      </label>
      <label>
        CVV:
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          placeholder="123"
        />
      </label>
      <label>
        Amount:
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in USD"
        />
      </label>
      <button type="submit">Pay Now</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

export default PaymentForm;
