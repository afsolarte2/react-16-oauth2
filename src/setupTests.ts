// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

global.sessionStorage = {
    length: 1,
    key: jest.fn().mockImplementation(() => null),
    getItem: jest.fn().mockImplementation(() => null),
    setItem: jest.fn().mockImplementation(() => null),
    removeItem: jest.fn().mockImplementation(() => null),
    clear: jest.fn().mockImplementation(() => null),
} as Storage;
