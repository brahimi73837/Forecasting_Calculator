import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

const YearRangeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.label`
  min-width: 120px;
`;

const Select = styled.select`
  padding: 5px;
  border-radius: 3px;
`;

const Input = styled.input`
  padding: 5px;
  border-radius: 3px;
  width: 100%;
`;

const ToggleButton = styled.button`
  padding: 5px 10px;
  background-color: ${props => props.theme.toggleBackground};
  color: ${props => props.theme.toggleText};
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const InputSection = ({
  previousYears,
  setPreviousYears,
  previousValues,
  setPreviousValues,
  futureYears,
  setFutureYears,
}) => {
  const [startYear, setStartYear] = useState(2019);
  const [endYear, setEndYear] = useState(2023);
  const [futureStartYear, setFutureStartYear] = useState(2024);
  const [futureEndYear, setFutureEndYear] = useState(2027);
  const [useMultipleFields, setUseMultipleFields] = useState(true);
  const [bulkInput, setBulkInput] = useState('');

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 31 }, (_, i) => currentYear - 15 + i);
  };

  const yearOptions = generateYearOptions();

  useEffect(() => {
    const newPreviousYears = Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    );
    setPreviousYears(newPreviousYears);
  }, [startYear, endYear, setPreviousYears]);

  useEffect(() => {
    const newFutureYears = Array.from(
      { length: futureEndYear - futureStartYear + 1 },
      (_, i) => futureStartYear + i
    );
    setFutureYears(newFutureYears);
  }, [futureStartYear, futureEndYear, setFutureYears]);

  const handleValueChange = (year, value) => {
    // Parse the value as a float and default to 0 if not a number
    const numericValue = parseFloat(value);
    setPreviousValues(prev => ({ ...prev, [year]: isNaN(numericValue) ? 0 : numericValue }));
  };
  
  const handleBulkInputChange = (e) => {
    setBulkInput(e.target.value);
    const values = e.target.value.split(/[,\s\n]+/).map(v => {
      const numericValue = parseFloat(v.trim());
      return isNaN(numericValue) ? 0 : numericValue;
    });
    const newPreviousValues = {};
    previousYears.forEach((year, index) => {
      newPreviousValues[year] = values[index] !== undefined ? values[index] : 0;
    });
    setPreviousValues(newPreviousValues);
  };

  const toggleInputMethod = () => {
    setUseMultipleFields(!useMultipleFields);
    if (useMultipleFields) {
      setBulkInput(Object.values(previousValues).join(', '));
    }
  };

  return (
    <InputContainer>
      <YearRangeSelector>
        <Label>Previous Years:</Label>
        <Select value={startYear} onChange={(e) => setStartYear(parseInt(e.target.value))}>
          {yearOptions.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </Select>
        <span>to</span>
        <Select value={endYear} onChange={(e) => setEndYear(parseInt(e.target.value))}>
          {yearOptions.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </Select>
      </YearRangeSelector>
      
      <ToggleButton onClick={toggleInputMethod}>
        {useMultipleFields ? 'Switch to Bulk Input' : 'Switch to Individual Fields'}
      </ToggleButton>

      {useMultipleFields ? (
        previousYears.map(year => (
          <YearRangeSelector key={year}>
            <Label>{year} Value:</Label>
            <Input
              type="number"
              value={previousValues[year] || ''}
              onChange={(e) => handleValueChange(year, e.target.value)}
              placeholder={`Enter value for ${year}`}
            />
          </YearRangeSelector>
        ))
      ) : (
        <YearRangeSelector>
          <Label>Previous Values:</Label>
          <Input
            type="text"
            value={bulkInput}
            onChange={handleBulkInputChange}
            placeholder="Enter values separated by comma, space, or new line"
          />
        </YearRangeSelector>
      )}

      <YearRangeSelector>
        <Label>Future Years:</Label>
        <Select value={futureStartYear} onChange={(e) => setFutureStartYear(parseInt(e.target.value))}>
          {yearOptions.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </Select>
        <span>to</span>
        <Select value={futureEndYear} onChange={(e) => setFutureEndYear(parseInt(e.target.value))}>
          {yearOptions.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </Select>
      </YearRangeSelector>
    </InputContainer>
  );
};

export default InputSection;