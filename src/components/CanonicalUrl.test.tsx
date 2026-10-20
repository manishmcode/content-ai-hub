import React from 'react';
import { render, screen } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import { CanonicalUrl } from './CanonicalUrl';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  Navigate: ({ to }: { to: string }) => <span data-testid="destination">{to}</span>,
}));
const mockLocation = useLocation as jest.Mock;

afterEach(() => {
  document.querySelectorAll('link[rel="canonical"]').forEach(link => link.remove());
});

test('normalizes navigation while retaining query strings and hashes', () => {
  mockLocation.mockReturnValue({ pathname: '/pricing', search: '?plan=2', hash: '#plans' });
  render(<CanonicalUrl />);
  expect(screen.getByTestId('destination')).toHaveTextContent('/pricing/?plan=2#plans');
  expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://contentaihub.net/pricing/');
});

test('removes a stale canonical when rendering an unknown URL', () => {
  const link = document.createElement('link');
  link.rel = 'canonical';
  link.href = 'https://contentaihub.net/';
  document.head.appendChild(link);
  mockLocation.mockReturnValue({ pathname: '/missing/', search: '', hash: '' });
  render(<CanonicalUrl />);
  expect(document.querySelector('link[rel="canonical"]')).toBeNull();
});

test('updates the existing canonical after client navigation without duplicating it', () => {
  mockLocation.mockReturnValue({ pathname: '/', search: '', hash: '' });
  const { rerender } = render(<CanonicalUrl />);
  mockLocation.mockReturnValue({ pathname: '/pricing/', search: '?plan=2', hash: '#plans' });
  rerender(<CanonicalUrl />);
  expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
  expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://contentaihub.net/pricing/');
});
