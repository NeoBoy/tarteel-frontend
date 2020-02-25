import React from 'react';
import { MobileView, isMobileOnly } from 'react-device-detect';
import { Icon } from 'react-icons-kit';
import { close as closeIcon } from 'react-icons-kit/ionicons/close';
import styled from 'styled-components';
import classNames from 'classnames';
import config from '../../config';
import { withCookies } from 'react-cookie';
import KEYS from '../locale/keys';
import T from './T';
import { render } from 'enzyme';

interface IProps {
  onClose(): void;
  message?: string;
}

class MobileAppPrompt extends React.Component<IProps, IState> {
    constructor(props){
        super(props);
        this.state = {
            open: true
        }
    }
  render() {
    if (!isMobileOnly || !this.state.open) {
      return <></>;
    }
    return (
      <Container>
        <MobileView>
          <div className="close" onClick={() => {this.setState({open: false})}}>
            <Icon icon={closeIcon} />
          </div>
          <p className="error-message">
            <T id={KEYS.MOBILE_DOWNLOAD_MESSAGE} />
          </p>
          <a className="app-link" href={config('androidAppLink')}>
            Android
          </a>
          <a className="app-link" href={config('IOSAppLink')}>
            iOS
          </a>
        </MobileView>
      </Container>
    );
  }
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 1em 0;
  color: #fff;
  margin: 10px 10px 20px 10px;
  background: #5ec49e;
  border-radius: 15px;
  z-index: 5;

  .close {
    position: absolute;
    right: 12px;
    top: 7px;
  }
  .error-message {
    margin: 1em 2%;

    &.rtl {
      direction: rtl;
    }
  }

  div > .app-link {
    color: #fff;
    text-decoration: none;
    border: 1px solid #fff;
    border-radius: 3px;
    padding: 7px 10px;
    display: inline-block;
    margin: 0 5px;
  }
`;

export default withCookies(MobileAppPrompt);
