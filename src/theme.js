import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#fff',
  text: '#333',
  background: '#0D0740',
  inputBackground: '#fff',
  inputBorder: '#ccc',
  chartBackground: '#fff',
  toggleBackground: '#FF5100',
  toggleText: '#fff',
};

export const darkTheme = {
  body: '#333',
  text: '#fff',
  background: '#222',
  inputBackground: '#444',
  inputBorder: '#555',
  chartBackground: '#444',
  toggleBackground: '#9CF094',
  toggleText: '#333',
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text};
    font-family: 'Arial', sans-serif;
    transition: all 0.3s linear;
  }

  input, select {
    background-color: ${props => props.theme.inputBackground};
    color: ${props => props.theme.text};
    border: 1px solid ${props => props.theme.inputBorder};
  }
`;