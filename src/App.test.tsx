import React from 'react';
import { render, fireEvent } from '@testing-library/react';

jest.mock('./services/Application.service', () => ({
  getAccessToken: jest.fn().mockResolvedValue('ACCESS_TOKEN'),
  hello: jest.fn().mockResolvedValue('HELLO')
}))

import App from './App';
import * as ApplicationService from './services/Application.service'

const helloSpy = jest.spyOn(ApplicationService, 'hello')

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Call Hello endpoint/i);

  expect(linkElement).toBeInTheDocument();
});

test('click to *Call Hello endpoint* link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Call Hello endpoint/i);

  fireEvent.click(linkElement)

  expect(helloSpy).toHaveBeenCalledTimes(1)
})

