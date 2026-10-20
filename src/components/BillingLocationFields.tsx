import React, { useMemo } from 'react';
import { Country, State, City } from 'country-state-city';

interface BillingLocation {
  country: string;
  state_region: string;
  city: string;
}

interface Props {
  value: BillingLocation;
  onChange: (location: BillingLocation) => void;
}

const countries = Country.getAllCountries();
const fieldClass = 'w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A] transition font-medium disabled:bg-slate-50 disabled:text-slate-400';
const labelClass = 'block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5';

export default function BillingLocationFields({ value, onChange }: Props) {
  const states = useMemo(() => State.getStatesOfCountry(value.country), [value.country]);
  const selectedState = states.find(state => state.name === value.state_region || state.isoCode === value.state_region);
  const cities = useMemo(() => {
    const matches = selectedState
      ? City.getCitiesOfState(value.country, selectedState.isoCode)
      : states.length === 0 ? City.getCitiesOfCountry(value.country) : [];
    return Array.from(new Set((matches || []).map(city => city.name))).sort((a, b) => a.localeCompare(b));
  }, [value.country, selectedState, states.length]);
  const waitingForState = states.length > 0 && !selectedState;

  return <>
    <div>
      <label htmlFor="billing-country" className={labelClass}>COUNTRY <span className="text-[#00B67A]">*</span></label>
      <select id="billing-country" name="country" autoComplete="country" required value={value.country}
        onChange={event => onChange({ country: event.target.value, state_region: '', city: '' })} className={fieldClass}>
        <option value="">Select a country</option>
        {countries.map(country => <option key={country.isoCode} value={country.isoCode}>{country.name}</option>)}
      </select>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label htmlFor="billing-state" className={labelClass}>STATE / REGION {states.length > 0 && <span className="text-[#00B67A]">*</span>}</label>
        {states.length > 0 ? <select id="billing-state" name="state_region" autoComplete="address-level1" required
          value={selectedState?.name || ''} className={fieldClass}
          onChange={event => onChange({ ...value, state_region: event.target.value, city: '' })}>
          <option value="">Select a state or region</option>
          {states.map(state => <option key={state.isoCode} value={state.name}>{state.name}</option>)}
        </select> : <input id="billing-state" name="state_region" autoComplete="address-level1" value={value.state_region}
          placeholder="State or region (optional)" className={fieldClass}
          onChange={event => onChange({ ...value, state_region: event.target.value, city: '' })} />}
      </div>
      <div>
        <label htmlFor="billing-city" className={labelClass}>TOWN / CITY <span className="text-[#00B67A]">*</span></label>
        {cities.length > 0 || waitingForState ? <select id="billing-city" name="city" autoComplete="address-level2" required
          disabled={waitingForState} value={value.city} className={fieldClass}
          onChange={event => onChange({ ...value, city: event.target.value })}>
          <option value="">{waitingForState ? 'Select a state or region first' : 'Select a city'}</option>
          {value.city && !cities.includes(value.city) && <option value={value.city}>{value.city}</option>}
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select> : <input id="billing-city" name="city" autoComplete="address-level2" required value={value.city}
          placeholder="Enter your city" className={fieldClass}
          onChange={event => onChange({ ...value, city: event.target.value })} />}
      </div>
    </div>
  </>;
}
