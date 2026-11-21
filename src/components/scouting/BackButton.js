import React from 'react';
import PixelButton from './PixelButton';

const LinkButton = PixelButton.withComponent('a');

const BackButton = ({ label, href, onClick }) => {
  const content = (
    <>
      <span aria-hidden="true">&#x25C0;</span>
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <LinkButton href={href} aria-label={label}>
        {content}
      </LinkButton>
    );
  }

  return (
    <PixelButton type="button" onClick={onClick} aria-label={label}>
      {content}
    </PixelButton>
  );
};

export default BackButton;
