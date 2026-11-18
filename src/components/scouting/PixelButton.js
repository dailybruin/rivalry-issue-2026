import styled from 'styled-components';
import { colors, fonts, mediaQueries } from '../../shared/config';

export const PixelButton = styled.button`
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
  text-decoration: none;
  transition: background-color 0.15s ease, border-color 0.15s ease;

  &:hover {
    background-color: ${colors.panelBackgroundHover};
  }

  &:active {
    background-color: ${colors.panelBackgroundActive};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${colors.accentGold};
    outline-offset: 2px;
  }

  ${mediaQueries.mobile} {
    font-size: 10px;
    padding: 10px 12px;
  }
`;

export default PixelButton;
