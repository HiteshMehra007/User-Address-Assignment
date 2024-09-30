import React, { useState } from 'react';

const AddressForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: ''
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('http://localhost:8000/address/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setFormData({ fullName: '', address: '' });
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
        console.error(error);
      setMessage({ type: 'error', text: 'Something went wrong!' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 max-w-md mx-auto p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Enter Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Your address"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {message && (
          <div
            className={`mt-4 text-sm font-medium ${
              message.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddressForm;
