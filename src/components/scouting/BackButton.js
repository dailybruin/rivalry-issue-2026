import React from 'react';
import styled from 'styled-components';
import { colors, fonts, mediaQueries } from '../../shared/config';

const ButtonElement = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: ${colors.panelBackground};
  color: ${colors.textLight};
  border: 2px solid ${colors.borderLight};
  font-family: ${fonts.pixel};
  font-size: 11px;
  line-height: 1;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 9px 14px;
  cursor: pointer;
  border-radius: 0;
  box-shadow: none;
  text-decoration: none;
  transition: background-color 0.15s ease, border-color 0.15s ease;

  &:hover {
    background-color: #1a2444;
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${colors.accentGold};
    outline-offset: 2px;
  }

  &:active {
    background-color: #080c1e;
  }

  ${mediaQueries.mobile} {
    font-size: 10px;
    padding: 8px 10px;
  }
`;

const LinkElement = ButtonElement.withComponent('a');

const BackButton = ({ label, href, onClick }) => {
  const content = (
    <>
      <span aria-hidden="true">&#x25C0;</span>
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <LinkElement href={href} aria-label={label}>
        {content}
      </LinkElement>
    );
  }

  return (
    <ButtonElement type="button" onClick={onClick} aria-label={label}>
      {content}
    </ButtonElement>
  );
};

export default BackButton;
