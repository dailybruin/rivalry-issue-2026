import React from 'react';
import styled from 'styled-components';
import { colors, fonts, mediaQueries } from '../../shared/config';
import placeholderFallback from '../../images/portrait-placeholder.png';

const Frame = styled.div`
  border: 6px solid ${colors.borderLight};
  background-color: ${props => props.bgColor || colors.cardBackgroundDefault};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  aspect-ratio: 326 / 395;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 0;
  box-shadow: none;

  ${mediaQueries.mobile} {
    border-width: 4px;
    max-width: 320px;
    margin: 0 auto;
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PixelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
`;

const CaptionBar = styled.div`
  position: absolute;
  bottom: 14px;
  left: 14px;
  right: 14px;
  z-index: 2;
  background-color: ${colors.panelBackground};
  color: ${colors.accentGold};
  font-family: ${fonts.pixel};
  font-size: 13px;
  line-height: 1.2;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  padding: 8px 10px;
  box-sizing: border-box;
  border-radius: 0;
  border: 1px solid ${colors.panelBackground};

  ${mediaQueries.mobile} {
    font-size: 11px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    padding: 6px 8px;
  }
`;

const resolvePortraitImage = (filename) => {
  if (!filename) return placeholderFallback;
  try {
    const asset = require(`../../images/${filename}`);
    return asset.default || asset;
  } catch (err) {
    return placeholderFallback;
  }
};

const PortraitCard = ({
  portraitImage,
  portraitAlt,
  portraitBackgroundColor,
  teamName
}) => {
  const imageSrc = resolvePortraitImage(portraitImage);

  return (
    <Frame bgColor={portraitBackgroundColor}>
      <ImageWrapper>
        <PixelImage src={imageSrc} alt={portraitAlt || 'Player portrait'} />
      </ImageWrapper>
      {teamName && <CaptionBar>{teamName}</CaptionBar>}
    </Frame>
  );
};

export default PortraitCard;
