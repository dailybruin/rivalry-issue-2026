import React from 'react';
import styled from 'styled-components';
import StatBox from './StatBox';
import { mediaQueries } from '../../shared/config';

const GridContainer = styled.section`
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;

  ${mediaQueries.mobile} {
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const StatGrid = ({ stats = [] }) => {
  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <GridContainer aria-label="Player statistics">
      {stats.map((stat, index) => (
        <StatBox
          key={stat.label || index}
          label={stat.label}
          value={stat.value}
        />
      ))}
    </GridContainer>
  );
};

export default StatGrid;
