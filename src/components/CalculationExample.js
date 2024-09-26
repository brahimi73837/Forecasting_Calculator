import React from 'react';
import styled from 'styled-components';
import Latex from 'react-latex-next';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css'; // import styles

const ExampleContainer = styled.div`
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 5px;
  padding: 20px;
  margin-top: 30px;
  color: #FFF
`;

const StepList = styled.ol`
  padding-left: 20px;
`;

const Step = styled.li`
  margin-bottom: 20px;
`;

const CalculationExample = ({ previousYears = [], previousValues = {} }) => {
  // Ensure that the inputs are valid
  if (previousYears.length === 0 || Object.keys(previousValues).length === 0) {
    return <ExampleContainer>No data provided.</ExampleContainer>;
  }

  const n = previousYears.length;
  const meanX = previousYears.reduce((acc, year) => acc + year, 0) / n;
  const meanY = previousYears.reduce(
    (acc, year) => acc + previousValues[year],
    0
  ) / n;

  const xDeviation = previousYears.map((year) => year - meanX);
  const yDeviation = previousYears.map(
    (year) => previousValues[year] - meanY
  );

  const sumOfProducts = xDeviation.reduce(
    (acc, dev, i) => acc + dev * yDeviation[i],
    0
  );
  const sumOfSquaresX = xDeviation.reduce(
    (acc, dev) => acc + dev * dev,
    0
  );

  return (
    <ExampleContainer>
      <h2>Calculation Example</h2>
      <StepList>
        <Step>
          Calculate the mean of the predictor variable (x):
          <Latex>{`$$\\bar{x} = \\frac{${previousYears.join(' + ')}}{${n}} = ${meanX.toFixed(2)}$$`}</Latex>
        </Step>
        <Step>
          Calculate the mean of the dependent variable (y):
          <Latex>{`$$\\bar{y} = \\frac{${previousYears.map(
            (year) => previousValues[year]
          ).join(' + ')}}{${n}} = ${meanY.toFixed(2)}$$`}</Latex>
        </Step>
        <Step>
          Subtract the mean of the predictor variable from each independent variable:
          <Latex>{`$$x_i - \\bar{x} = ${previousYears[0]} - ${meanX.toFixed(
            2
          )} = ${(previousYears[0] - meanX).toFixed(2)}$$`}</Latex>
        </Step>
        <Step>
          Subtract the mean of the dependent variable from each dependent variable:
          <Latex>{`$$y_i - \\bar{y} = ${previousValues[previousYears[0]]} - ${meanY.toFixed(
            2
          )} = ${(
            previousValues[previousYears[0]] - meanY
          ).toFixed(2)}$$`}</Latex>
        </Step>
        <Step>
          Calculate the sum of products (SP) of deviations of the predictor and dependent variable:
          <Latex>{`$$S_{xy} = \\sum_{i=1}^{n} (x_i - \\bar{x})(y_i - \\bar{y}) = ${sumOfProducts.toFixed(
            2
          )}$$`}</Latex>
        </Step>
        <Step>
          Calculate each independent variable's squared deviation from the mean:
          <Latex>{`$$(x_i - \\bar{x})^2 = (${previousYears[0]} - ${meanX.toFixed(
            2
          )})^2 = ${Math.pow(previousYears[0] - meanX, 2).toFixed(2)}$$`}</Latex>
        </Step>
        <Step>
          Calculate the sum of squares (SSx) of the independent variable:
          <Latex>{`$$SS_x = \\sum_{i=1}^{n} (x_i - \\bar{x})^2 = ${sumOfSquaresX.toFixed(
            2
          )}$$`}</Latex>
        </Step>
        <Step>
          Divide SP by SSx to obtain the slope of the regression line (b1):
          <Latex>{`$$b_1 = \\frac{S_{xy}}{SS_x} = \\frac{${sumOfProducts.toFixed(
            2
          )}}{${sumOfSquaresX.toFixed(2)}} = ${(sumOfProducts / sumOfSquaresX).toFixed(
            2
          )}$$`}</Latex>
        </Step>
        <Step>
          Calculate the y-intercept (b0) using the means and slope:
          <Latex>{`$$b_0 = \\bar{y} - b_1 \\cdot \\bar{x} = ${meanY.toFixed(
            2
          )} - ${(sumOfProducts / sumOfSquaresX).toFixed(2)} \\cdot ${meanX.toFixed(
            2
          )} = ${(
            meanY -
            (sumOfProducts / sumOfSquaresX) * meanX
          ).toFixed(2)}$$`}</Latex>
        </Step>
        <Step>
          Form the regression equation:
          <Latex>{`$$\\hat{y} = ${(meanY - (sumOfProducts / sumOfSquaresX) * meanX).toFixed(2)} + ${(sumOfProducts / sumOfSquaresX).toFixed(2)}x$$`}</Latex>
        </Step>
        <Step>Use the equation to predict future values.</Step>
      </StepList>
    </ExampleContainer>
  );
};

export default CalculationExample;