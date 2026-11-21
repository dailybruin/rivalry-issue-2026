import React from 'react';
import styled from 'styled-components';
import { colors, fonts, mediaQueries } from '../../shared/config';

const BoxContainer = styled.div`
  flex: 1 1 0;
  min-width: 0;
  background-color: ${colors.panelBackground};
  border: 2px solid ${colors.borderLight};
  padding: 10px 12px;
  box-sizing: border-box;
  border-radius: 0;
  box-shadow: none;

  ${mediaQueries.mobile} {
    flex: 1 1 calc(50% - 6px);
    padding: 8px 10px;
  }
`;

const StatLabel = styled.div`
  font-family: ${fonts.pixel};
  font-size: 9px;
  line-height: 1.2;
  color: ${colors.accentGold};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${mediaQueries.mobile} {
    font-size: 8px;
    margin-bottom: 6px;
  }
`;

const StatValue = styled.div`
  font-family: ${fonts.pixel};
  font-size: 13px;
  line-height: 1.25;
  color: ${colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  word-break: break-word;

  ${mediaQueries.mobile} {
    font-size: 11px;
  }
`;

const StatBox = ({ label, value }) => {
  return (
    <BoxContainer>
      <StatLabel>{label}</StatLabel>
      <StatValue>{value || '-'}</StatValue>
    </BoxContainer>
  );
};

export default StatBox;
