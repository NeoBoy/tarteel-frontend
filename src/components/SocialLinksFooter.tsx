import React from 'react';
import styled from 'styled-components';

export default function SocialLinksFooter() {
  return (
    <SocialLinksContainer>
      <a href="https://www.facebook.com/tarteel.io/" target="_blank">
        Facebook
      </a>
      {' '}·{' '}
      <a href="https://twitter.com/Tarteel_io" target="_blank">
        Twitter
      </a>
      {' '}·{' '}<a href="https://www.instagram.com/tarteel.io/" target="_blank">Instagram</a>
    </SocialLinksContainer>
  );
}

const SocialLinksContainer = styled.div`
  color: #c7c7c7;
  font-size: 14px;
  width: 100%;
  text-align: center;
  z-index: 100;
  
  > a {
    text-decoration: none;
    color: #c7c7c7 !important;
  }

  @media screen and (min-width: ${props => props.theme.breakpoints.md}px) {
    text-align: right;
    margin-top: -28px;
  }
`;
