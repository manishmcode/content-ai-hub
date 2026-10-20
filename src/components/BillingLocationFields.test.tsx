import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import BillingLocationFields from './BillingLocationFields';

function Form({ country = 'IN' }: { country?: string }) {
  const [location, setLocation] = useState({ country, state_region: '', city: '' });
  return <BillingLocationFields value={location} onChange={setLocation} />;
}

test('shows cities for the chosen state and resets dependent fields', () => {
  render(<Form />);
  const country = screen.getByLabelText(/COUNTRY/);
  const state = screen.getByLabelText(/STATE \/ REGION/);
  const city = screen.getByLabelText(/TOWN \/ CITY/);
  expect(city).toBeDisabled();
  fireEvent.change(state, { target: { value: 'Maharashtra' } });
  expect(city).toBeEnabled();
  fireEvent.change(city, { target: { value: 'Mumbai' } });
  expect(city).toHaveValue('Mumbai');
  fireEvent.change(state, { target: { value: 'Karnataka' } });
  expect(city).toHaveValue('');
  expect(screen.queryByRole('option', { name: 'Mumbai' })).not.toBeInTheDocument();
  fireEvent.change(country, { target: { value: 'US' } });
  expect(state).toHaveValue('');
  expect(city).toHaveValue('');
  expect(city).toBeDisabled();
  expect(screen.getByRole('option', { name: 'California' })).toBeInTheDocument();
});

test('allows address entry where the dataset has no states or cities', () => {
  render(<Form country="AQ" />);
  const state = screen.getByLabelText(/STATE \/ REGION/);
  const city = screen.getByLabelText(/TOWN \/ CITY/);
  expect(state).not.toBeRequired();
  expect(city).toBeRequired();
  fireEvent.change(city, { target: { value: 'McMurdo Station' } });
  expect(city).toHaveValue('McMurdo Station');
});
