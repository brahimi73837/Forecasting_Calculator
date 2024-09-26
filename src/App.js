import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './theme';
import InputSection from './components/InputSection';
import SummaryBox from './components/SummaryBox';
import Chart from './components/Chart';
import CalculationExample from './components/CalculationExample';
import logo from './Logo_Innova.png';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

const ThemeToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px;
  background-color: ${props => props.theme.toggleBackground};
  color: ${props => props.theme.toggleText};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 20px;
`;

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [previousYears, setPreviousYears] = useState([2019, 2020, 2021, 2022, 2023]);
  const [previousValues, setPreviousValues] = useState({});
  const [futureYears, setFutureYears] = useState([2024, 2025, 2026, 2027]);
  const [regressionEquation, setRegressionEquation] = useState('');
  const [previousCAGR, setPreviousCAGR] = useState(0);
  const [futureCAGR, setFutureCAGR] = useState(0);
  const [predictedValues, setPredictedValues] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (Object.keys(previousValues).length === previousYears.length && 
        Object.values(previousValues).every(value => value !== null && !isNaN(value))) {
      calculateRegression();
    }
  }, [previousValues, previousYears, futureYears]);

  const calculateRegression = () => {
    try {
      const x = previousYears;
      const y = x.map(year => previousValues[year]);

      if (y.some(value => value === undefined || isNaN(value))) {
        throw new Error('Please enter valid values for all previous years.');
      }
  

      const n = x.length;
      const sumX = x.reduce((a, b) => a + b, 0);
      const sumY = y.reduce((a, b) => a + b, 0);
      const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
      const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

      const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;

      setRegressionEquation(`y = ${intercept.toFixed(2)} + ${slope.toFixed(2)}x`);

      const predictFuture = (year) => intercept + slope * year;
      const newPredictedValues = {};
      futureYears.forEach(year => {
        newPredictedValues[year] = predictFuture(year);
      });
      setPredictedValues(newPredictedValues);

      // Calculate CAGR for previous years
      const firstYear = Math.min(...x);
      const lastYear = Math.max(...x);
      const firstValue = previousValues[firstYear];
      const lastValue = previousValues[lastYear];
      const previousCAGRValue = Math.pow(lastValue / firstValue, 1 / (lastYear - firstYear)) - 1;
      setPreviousCAGR(previousCAGRValue * 100);

      // Calculate CAGR for future years
      const futureFirstYear = Math.min(...futureYears);
      const futureLastYear = Math.max(...futureYears);
      const futureFirstValue = newPredictedValues[futureFirstYear];
      const futureLastValue = newPredictedValues[futureLastYear];
      const futureCAGRValue = Math.pow(futureLastValue / futureFirstValue, 1 / (futureLastYear - futureFirstYear)) - 1;
      setFutureCAGR(futureCAGRValue * 100);

      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyles />
      <div className="App">
        <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px'}}>
          <img src={logo} alt="Company Logo" style={{ width: 200, marginBottom: -10 }} />
        </header>
        </div>
      <AppContainer>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
        </ThemeToggle>
        <Title>Forecasting Calculator</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <InputSection
          previousYears={previousYears}
          setPreviousYears={setPreviousYears}
          previousValues={previousValues}
          setPreviousValues={setPreviousValues}
          futureYears={futureYears}
          setFutureYears={setFutureYears}
        />
        <SummaryBox
          regressionEquation={regressionEquation}
          previousCAGR={previousCAGR}
          futureCAGR={futureCAGR}
          predictedValues={predictedValues} // Pass predicted values here
        />
        <Chart
          previousYears={previousYears}
          previousValues={previousValues}
          futureYears={futureYears}
          predictedValues={predictedValues}
        />
        {/* Pass previousYears and previousValues to CalculationExample */}
        <CalculationExample 
          previousYears={previousYears} 
          previousValues={previousValues} 
        />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;