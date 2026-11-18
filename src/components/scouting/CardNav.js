import React from 'react';
import styled from 'styled-components';
import { colors, fonts, mediaQueries } from '../../shared/config';

const NavButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: ${colors.panelBackground};
  color: ${colors.textLight};
  border: 2px solid ${colors.borderLight};
  font-family: ${fonts.pixel};
  font-size: 11px;
  line-height: 1;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 10px 16px;
  cursor: pointer;
  border-radius: 0;
  box-shadow: none;
  transition: background-color 0.15s ease, border-color 0.15s ease;

  &:hover {
    background-color: #1a2444;
  }

  &:focus {
    outline: 2px solid ${colors.accentGold};
    outline-offset: 2px;
  }

  &:active {
    background-color: #080c1e;
  }

  ${mediaQueries.mobile} {
    font-size: 10px;
    padding: 10px 12px;
    width: 100%;
  }
`;

const CardNav = ({ direction, playerName, onClick }) => {
  const isPrev = direction === 'prev';
  const label = isPrev
    ? `Previous card: ${playerName}`
    : `Next card: ${playerName}`;

  return (
    <NavButton
      type="button"
      onClick={onClick}
      aria-label={label}
    >
      {isPrev && <span aria-hidden="true">&#x25C0;</span>}
      <span>{playerName}</span>
      {!isPrev && <span aria-hidden="true">&#x25B6;</span>}
    </NavButton>
  );
};

export default CardNav;
