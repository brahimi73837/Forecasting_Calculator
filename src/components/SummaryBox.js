import React from 'react';
import styled from 'styled-components';

const SummaryContainer = styled.div`
  background-color: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.inputBorder};
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 30px;
`;

const SummaryItem = styled.p`
  margin: 10px 0;
`;

const SummaryBox = ({ regressionEquation, previousCAGR, futureCAGR, predictedValues }) => {
  return (
    <SummaryContainer>
      <h2>Summary</h2>
      <SummaryItem>Regression Equation: {regressionEquation}</SummaryItem>
      <SummaryItem>Previous Years CAGR: {previousCAGR.toFixed(2)}%</SummaryItem>
      <SummaryItem>Future Years CAGR: {futureCAGR.toFixed(2)}%</SummaryItem>
      <h3>Predicted Values:</h3>
      {Object.entries(predictedValues).map(([year, value]) => (
        <SummaryItem key={year}>{year}: {value.toFixed(2)}</SummaryItem>
      ))}
    </SummaryContainer>
  );
};

export default SummaryBox;