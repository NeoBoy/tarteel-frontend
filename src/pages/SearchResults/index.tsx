import React from 'react';
import styled from 'styled-components';
import pluralize from 'pluralize';
import { androidAdd } from 'react-icons-kit/ionicons/androidAdd';
import { injectIntl, InjectedIntl } from 'react-intl';

import Navbar from '../../components/Navbar';
import { connect } from 'react-redux';
import ReduxState, { IRecognition } from '../../types/GlobalState';
import { Link } from 'react-router-dom';
import Icon from 'react-icons-kit';
import KEYS from '../../locale/keys';
import T from '../../components/T';
import { fetchIqraRecogniton } from '../../api/iqra';
import SearchResult from './SearchResult';

import Modal from 'react-modal';
import ReactPlayer from 'react-player';
import Cookies from 'js-cookie';

interface IRecognitionAyah {
  arabicAyah: string;
  arabicSurahName: string;
  surahNum: number;
  ayahNum: number;
  translationAyah: string;
  translationSurahName: string;
}

interface IStateProps {
  recognition: IRecognition;
}

interface IOwnProps {
  intl: InjectedIntl;
}

type IProps = IStateProps & IOwnProps & IOwnProps;

class SearchResults extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {
      queryText: props.match.params.query,
      matches: [],
      resultsNumberText: <T id={KEYS.SEARCHING} />,
      isVideoModalOpen: false,
    };
  }

  openVideoModal = () => {
    this.setState({ isVideoModalOpen: true });
  };

  closeVideoModal = () => {
    this.setState({ isVideoModalOpen: false });
  };

  componentDidMount() {
    this.socket = window.socket;
    this.getSearchResults();
  }
  getSearchResults = () => {
    fetchIqraRecogniton({
      arabicText: this.state.queryText,
      translation: 'en-hilali',
      // limit: 1,
    }).then(res => {
      this.setState({
        matches: res.result.matches,
        resultsNumberText: pluralize(
          this.props.intl.formatMessage({
            id: KEYS.AYAH_RECOGNITION_RESULTS,
          }),
          res.result.matches.length,
          true
        ),
      });
    });
  };
  handleAyahClick = (ayah: IRecognitionAyah) => {
    this.socket.emit('upload', {
      ayahNum: ayah.ayahNum,
      surahNum: ayah.surahNum,
      queryText: this.props.recognition.queryText,
    });
  };

  getVideoModal = () => {
    const locale = Cookies.get('currentLocale') || 'en';

    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.isVideoModalOpen}
          onRequestClose={this.closeVideoModal}
          shouldcloseOnEsc={true}
          contentLabel="Tarteel video"
          style={videoModalStyles}
          ariaHideApp={false}
        >
          <ReactPlayer
            className="react-player"
            url={
              locale === 'ar'
                ? 'https://vimeo.com/370590893'
                : 'https://vimeo.com/370577872'
            }
            width="100%"
            height="100%"
            wrapper={VideoWrapper}
          />
        </Modal>
        <a onClick={this.openVideoModal} className="demo-video-link">
          <T id={KEYS.VIDEO} />
        </a>
      </React.Fragment>
    );
  };
  render() {
    return (
      <Container>
        <Navbar />
        <div className="content">
          <div className="transcription-search-note">
            <T id={KEYS.TRANSCRIBE_SEARCH_NOTE} /> {this.getVideoModal()}.
          </div>
          <h1 className={'query'}>{this.state.queryText}</h1>
          <h3 className="count">{this.state.resultsNumberText}</h3>
          <div>
            {this.state.matches.map((ayah: IRecognitionAyah, i: number) => {
              return <SearchResult ayah={ayah} key={i} />;
            })}
          </div>
          <New to={'/'}>
            <Icon icon={androidAdd} size={25} />
            <p>
              <T id={KEYS.AYAH_RECOGNITION_NEW_SEARCH} />
            </p>
          </New>
        </div>
      </Container>
    );
  }
}

const New = styled(Link)`
  height: 50px;
  padding: 0 1em;
  color: ${props => props.theme.colors.brandPrimary};
  border-radius: 23px;
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.25);
  position: fixed;
  right: 15em;
  bottom: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  background: #fff;

  @media screen and (max-width: ${props => props.theme.breakpoints.md}px) {
    right: 1em;
  }
`;

const Ayah = styled(Link)`
  background-color: ${props => props.theme.colors.linkColor};
  border-radius: 5px;
  color: #fff;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  margin: 1em;
  width: 230px;
  box-shadow: 0 4px 15px 0 #ccc;
  position: relative;
  box-sizing: border-box;
  padding: 10px 1em;

  p {
    text-align: left;

    &:nth-child(1) {
      margin-bottom: 10px;
    }
  }

  .surah-index {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

const Container = styled.div`
  padding: 1em;
  display: flex;
  flex-flow: column;
  height: 100%;
  box-sizing: border-box;

  .count {
    margin-bottom: 30px;
  }
  .content {
    padding: 1em;
    padding-top: 2em;
    flex: 1;
    display: flex;
    flex-flow: column;
    position: relative;
    box-sizing: border-box;

    .query {
      color: ${props => props.theme.colors.brandPrimary};
      text-align: center;
      margin-top: 30px;
    }
    h3 {
      color: gray;
      text-align: center;
      margin-top: 10px;
    }
    .list {
      margin-top: 2em;
      display: flex;
      flex-wrap: wrap;
    }
  }

  .transcription-search-note {
    margin-left: 40px;
    margin-right: 40px;
    text-align: center;
  }

  .demo-video-link {
    text-decoration: underline;
    cursor: pointer;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.md}px) {
    .content {
      .list {
        justify-content: center;
      }
    }
    .transcription-search-note {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
`;

const videoModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    border: 'none',
    background: 'none',
    position: 'relative',
    padding: 0,
    borderRadius: 0,
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    width: '80vw',
    height: 'auto',
    overflow: 'hidden',
    maxHeight: 476,
    maxWidth: 824,
  },
};

const VideoWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
  > div {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    recognition: state.recognition,
  };
};

export default injectIntl(connect(mapStateToProps)(SearchResults));
