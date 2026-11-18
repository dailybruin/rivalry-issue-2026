import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { colors, fonts, mediaQueries } from '../../shared/config';
import defaultData from '../../data/scoutingReport.json';
import BackButton from './BackButton';
import PortraitCard from './PortraitCard';
import StatGrid from './StatGrid';
import ReportPanel from './ReportPanel';
import CardNav from './CardNav';

const PageWrapper = styled.div`
  background-color: ${colors.pageBackground};
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  padding: 32px 36px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mediaQueries.tablet} {
    padding: 24px 20px 32px;
  }

  ${mediaQueries.mobile} {
    padding: 16px 14px 24px;
  }
`;

const ContentContainer = styled.main`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${mediaQueries.mobile} {
    gap: 18px;
  }
`;

const TopBar = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  gap: 16px;

  ${mediaQueries.mobile} {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px;
  }
`;

const TopBarLeft = styled.div`
  justify-self: start;
`;

const TopBarCenter = styled.div`
  justify-self: center;
  text-align: center;

  ${mediaQueries.mobile} {
    order: 3;
    width: 100%;
    margin-top: 4px;
  }
`;

const TopBarRight = styled.div`
  justify-self: end;
`;

const PageTitle = styled.h1`
  font-family: ${fonts.pixel};
  font-size: 24px;
  line-height: 1.2;
  color: ${colors.textLight};
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;

  ${mediaQueries.tablet} {
    font-size: 18px;
  }

  ${mediaQueries.mobile} {
    font-size: 16px;
  }
`;

const CounterBadge = styled.div`
  display: inline-block;
  background-color: ${colors.panelBackground};
  color: ${colors.textLight};
  border: 2px solid ${colors.borderLight};
  font-family: ${fonts.pixel};
  font-size: 11px;
  line-height: 1;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 9px 14px;
  border-radius: 0;
  box-shadow: none;

  ${mediaQueries.mobile} {
    font-size: 10px;
    padding: 8px 10px;
  }
`;

const MainGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(300px, 380px) 1fr;
  gap: 32px;
  align-items: start;
  width: 100%;

  ${mediaQueries.tablet} {
    grid-template-columns: 320px 1fr;
    gap: 20px;
  }

  ${mediaQueries.mobile} {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
`;

const PlayerName = styled.h2`
  font-family: ${fonts.pixel};
  font-size: 32px;
  line-height: 1.15;
  color: ${colors.textLight};
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;

  ${mediaQueries.tablet} {
    font-size: 26px;
  }

  ${mediaQueries.mobile} {
    font-size: 20px;
  }
`;

const PlayerRole = styled.div`
  font-family: ${fonts.pixel};
  font-size: 14px;
  line-height: 1.2;
  color: ${colors.accentGold};
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: -2px;

  ${mediaQueries.mobile} {
    font-size: 12px;
  }
`;

const BottomNav = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 16px;
  margin-top: 6px;

  ${mediaQueries.mobile} {
    flex-direction: column;
    gap: 10px;
  }
`;

const ScoutingReportPage = ({
  data = defaultData,
  initialCardIndex
}) => {
  const {
    headerTitle = 'Scouting Report',
    reportLabel = 'The Report',
    backButtonLabel = 'Back to Draft',
    backButtonHref = null,
    cardCounterFormat = 'Card {current}/{total}',
    cards = []
  } = data || {};

  // Find index of sample card or default to 0
  const findInitialIndex = () => {
    if (typeof initialCardIndex === 'number' && initialCardIndex >= 0 && initialCardIndex < cards.length) {
      return initialCardIndex;
    }
    const sampleIdx = cards.findIndex(c => c.id === 'lincoln-riley-sample');
    return sampleIdx !== -1 ? sampleIdx : 0;
  };

  const [currentIndex, setCurrentIndex] = useState(findInitialIndex);

  const total = cards.length;
  const currentCard = total > 0 ? cards[currentIndex] : null;

  // Derive previous and next from array order with wrap-around
  const prevIndex = total > 0 ? (currentIndex - 1 + total) % total : 0;
  const nextIndex = total > 0 ? (currentIndex + 1) % total : 0;
  const prevCard = total > 0 ? cards[prevIndex] : null;
  const nextCard = total > 0 ? cards[nextIndex] : null;

  const handlePrevCard = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex(idx => (idx - 1 + total) % total);
  }, [total]);

  const handleNextCard = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex(idx => (idx + 1) % total);
  }, [total]);

  // Keyboard navigation: left and right arrows
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        handlePrevCard();
      } else if (e.key === 'ArrowRight') {
        handleNextCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevCard, handleNextCard]);

  if (!currentCard) {
    return (
      <PageWrapper>
        <ContentContainer>
          <PageTitle>No cards available</PageTitle>
        </ContentContainer>
      </PageWrapper>
    );
  }

  const counterText = cardCounterFormat
    .replace('{current}', currentIndex + 1)
    .replace('{total}', total);

  return (
    <PageWrapper>
      <ContentContainer>
        <TopBar>
          <TopBarLeft>
            <BackButton
              label={backButtonLabel}
              href={backButtonHref}
            />
          </TopBarLeft>
          <TopBarCenter>
            <PageTitle>{headerTitle}</PageTitle>
          </TopBarCenter>
          <TopBarRight>
            <CounterBadge aria-label={`Card ${currentIndex + 1} of ${total}`}>
              {counterText}
            </CounterBadge>
          </TopBarRight>
        </TopBar>

        <MainGrid>
          <PortraitCard
            portraitImage={currentCard.portraitImage}
            portraitAlt={currentCard.portraitAlt}
            portraitBackgroundColor={currentCard.portraitBackgroundColor}
            teamName={currentCard.teamName}
          />

          <RightColumn>
            <PlayerName>{currentCard.name}</PlayerName>
            {currentCard.role && <PlayerRole>{currentCard.role}</PlayerRole>}
            <StatGrid stats={currentCard.stats} />
            <ReportPanel
              label={reportLabel}
              paragraphs={currentCard.report}
            />
          </RightColumn>
        </MainGrid>

        {total > 1 && (
          <BottomNav aria-label="Card navigation">
            <CardNav
              direction="prev"
              playerName={prevCard.name}
              onClick={handlePrevCard}
            />
            <CardNav
              direction="next"
              playerName={nextCard.name}
              onClick={handleNextCard}
            />
          </BottomNav>
        )}
      </ContentContainer>
    </PageWrapper>
  );
};

export default ScoutingReportPage;
