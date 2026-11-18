import React from 'react';
import styled from 'styled-components';
import { colors, fonts, mediaQueries } from '../../shared/config';
import lincolnRileyFallback from '../../images/lincoln-riley.png';

const Frame = styled.div`
  border: 6px solid ${colors.borderLight};
  background-color: ${props => props.bgColor || colors.cardBackgroundDefault};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  aspect-ratio: 336 / 420;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 0;
  box-shadow: none;

  ${mediaQueries.mobile} {
    border-width: 4px;
    max-width: 340px;
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
  position: relative;
  z-index: 2;
  width: calc(100% - 32px);
  margin-bottom: 16px;
  background-color: ${colors.panelBackground};
  color: ${colors.accentGold};
  font-family: ${fonts.pixel};
  font-size: 13px;
  line-height: 1.2;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  padding: 8px 12px;
  box-sizing: border-box;
  border-radius: 0;
  border: 1px solid ${colors.panelBackground};

  ${mediaQueries.mobile} {
    font-size: 11px;
    width: calc(100% - 20px);
    margin-bottom: 10px;
    padding: 6px 10px;
  }
`;

const resolvePortraitImage = (filename) => {
  if (!filename) return lincolnRileyFallback;
  try {
    const asset = require(`../../images/${filename}`);
    return asset.default || asset;
  } catch (err) {
    return lincolnRileyFallback;
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
