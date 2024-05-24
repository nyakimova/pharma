import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import About from './pages/about/about';

expect.extend({ toBeInTheDocument }); // Extend expect with toBeInTheDocument matcher

describe('About Component', () => {
  test('renders About component without crashing', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
  });

  test('renders correct title', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    const titleElement = screen.getByText(/Про нас/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders warning message', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    const warningElement = screen.getByText(/Самолікування може бути шкідливим/i);
    expect(warningElement).toBeInTheDocument();
  });
});
