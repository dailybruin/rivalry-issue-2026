import React from 'react';
import styled from 'styled-components';
import PixelButton from './PixelButton';
import { mediaQueries } from '../../shared/config';

const NavButton = styled(PixelButton)`
  ${mediaQueries.mobile} {
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
