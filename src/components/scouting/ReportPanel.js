import React from 'react';
import styled from 'styled-components';
import { colors, fonts, mediaQueries } from '../../shared/config';

const PanelOuter = styled.section`
  background-color: ${colors.reportBackground};
  padding: 6px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 0;
  box-shadow: none;
`;

const PanelInner = styled.div`
  border: 1px solid ${colors.panelBackground};
  padding: 18px 22px;
  box-sizing: border-box;

  ${mediaQueries.mobile} {
    padding: 14px 16px;
  }
`;

const ReportHeading = styled.h3`
  font-family: ${fonts.pixel};
  font-size: 11px;
  line-height: 1.3;
  color: ${colors.reportLabel};
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0 0 14px 0;

  ${mediaQueries.mobile} {
    font-size: 10px;
    margin-bottom: 10px;
  }
`;

const ReportParagraph = styled.p`
  font-family: ${fonts.body};
  font-size: 13px;
  line-height: 1.62;
  color: ${colors.reportText};
  margin: 0 0 12px 0;
  text-align: left;

  &:last-child {
    margin-bottom: 0;
  }

  ${mediaQueries.mobile} {
    font-size: 12px;
    line-height: 1.55;
    margin-bottom: 10px;
  }
`;

const ReportPanel = ({ label = 'The Report', paragraphs = [] }) => {
  if (!paragraphs || paragraphs.length === 0) {
    return null;
  }

  return (
    <PanelOuter aria-labelledby="scouting-report-heading">
      <PanelInner>
        <ReportHeading id="scouting-report-heading">{label}</ReportHeading>
        {paragraphs.map((para, index) => (
          <ReportParagraph key={index}>{para}</ReportParagraph>
        ))}
      </PanelInner>
    </PanelOuter>
  );
};

export default ReportPanel;
